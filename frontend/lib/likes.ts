import { Redis } from "@upstash/redis";

export const LIKES_KEY = "likes:total";

/**
 * The marketplace integration names its variables KV_* or UPSTASH_*, depending
 * on which version provisioned the store, so accept either pair.
 */
function credentials() {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

/** Null when the store is not configured yet, so the UI can degrade instead of erroring. */
export function likesStore() {
  const creds = credentials();
  return creds ? new Redis(creds) : null;
}
