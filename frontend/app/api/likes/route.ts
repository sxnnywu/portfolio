import { NextResponse } from "next/server";
import { LIKES_KEY, likesStore } from "@/lib/likes";

export const dynamic = "force-dynamic";

/** Generous enough that no human clicking fast is ever refused, low enough
    that a script cannot run the counter up unattended. */
const MAX_PER_MINUTE = 120;

function rateKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  return `likes:rate:${forwarded.split(",")[0].trim() || "unknown"}`;
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
    const key = rateKey(request);
    const used = await redis.incr(key);
    if (used === 1) await redis.expire(key, 60);
    if (used > MAX_PER_MINUTE) {
      const count = await redis.get<number>(LIKES_KEY);
      return NextResponse.json({ count: Number(count ?? 0), throttled: true }, { status: 429 });
    }

    const count = await redis.incr(LIKES_KEY);
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: null }, { status: 503 });
  }
}
