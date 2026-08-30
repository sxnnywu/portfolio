import { NextResponse } from "next/server";
import { LIKES_KEY, likesStore } from "@/lib/likes";

export const dynamic = "force-dynamic";

/** Seconds a single address must wait between likes. */
const COOLDOWN = 3;

function clientKey(request: Request, action: string) {
  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  // Like and unlike cool down separately, so undoing a like is never blocked.
  return `likes:cooldown:${action}:${forwarded.split(",")[0].trim() || "unknown"}`;
}

export async function GET() {
  const redis = likesStore();
  if (!redis) return NextResponse.json({ count: null });
  try {
    const count = await redis.get<number>(LIKES_KEY);
    return NextResponse.json({ count: Number(count ?? 0) });
  } catch {
    // A store outage hides the button rather than surfacing an error to readers.
    return NextResponse.json({ count: null });
  }
}

export async function POST(request: Request) {
  const redis = likesStore();
  if (!redis) return NextResponse.json({ count: null }, { status: 503 });

  try {
    // The old endpoint incremented unconditionally, which is how it reached 1.2M.
    const fresh = await redis.set(clientKey(request, "like"), 1, { nx: true, ex: COOLDOWN });
    if (fresh === null) {
      const count = await redis.get<number>(LIKES_KEY);
      return NextResponse.json({ count: Number(count ?? 0), throttled: true }, { status: 429 });
    }

    const count = await redis.incr(LIKES_KEY);
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: null }, { status: 503 });
  }
}

/** Undoes a like. The count is a vanity figure, so the client is trusted here
    exactly as much as it is on the way up. */
export async function DELETE(request: Request) {
  const redis = likesStore();
  if (!redis) return NextResponse.json({ count: null }, { status: 503 });

  try {
    const fresh = await redis.set(clientKey(request, "unlike"), 1, { nx: true, ex: COOLDOWN });
    if (fresh === null) {
      const count = await redis.get<number>(LIKES_KEY);
      return NextResponse.json({ count: Number(count ?? 0), throttled: true }, { status: 429 });
    }

    const count = await redis.decr(LIKES_KEY);
    if (count < 0) {
      await redis.set(LIKES_KEY, 0);
      return NextResponse.json({ count: 0 });
    }
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: null }, { status: 503 });
  }
}
