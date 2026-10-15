import type { Wish } from "@/features/wish-garden/types";

export function normalizeCode(code: string) {
  return code.trim().toUpperCase();
}

/** Demo matcher. Production must verify codes server-side and return the wish id. */
export function findWishByCode(wishes: Wish[], code: string): Wish | undefined {
  const normalized = normalizeCode(code);
  if (!normalized) return undefined;
  return wishes.find((wish) => wish.code.toUpperCase() === normalized);
}
