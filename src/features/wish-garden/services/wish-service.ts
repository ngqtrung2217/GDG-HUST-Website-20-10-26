import { mockWishes } from "@/data/mockWishes";
import type { Wish } from "@/features/wish-garden/types";
import { findWishByCode } from "@/features/wish-garden/services/wish-domain";

const UNLOCK_KEY = "bloom-unlocked";
const CUSTOM_WISHES_KEY = "bloom-custom-wishes";

export interface WishService {
  /** Needs backend: wishes assigned to the invitation, without secret codes. */
  listWishes(): Promise<Omit<Wish, "code">[]>;
  getAllWishes(): Wish[];
  addWish(wish: Omit<Wish, "id"> & { id?: string }): Wish;
  /** Needs backend: constant-time code check, rate limit, persist unlock. */
  verifyCode(code: string): Promise<{ ok: true; wishId: string } | { ok: false }>;
  unlockWish(id: string): void;
  readUnlocked(): string[];
  writeUnlocked(ids: string[]): void;
}

function strip(wish: Wish): Omit<Wish, "code"> {
  const { code: _code, ...rest } = wish;
  return rest;
}

function readCustomWishes(): Wish[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(CUSTOM_WISHES_KEY);
    const parsed = raw ? (JSON.parse(raw) as Wish[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeCustomWishes(wishes: Wish[]): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(CUSTOM_WISHES_KEY, JSON.stringify(wishes));
}

export const mockWishService: WishService = {
  getAllWishes() {
    const customs = readCustomWishes();
    return [...mockWishes, ...customs];
  },
  addWish(newWish) {
    const customs = readCustomWishes();
    const wish: Wish = {
      ...newWish,
      id: newWish.id || `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: newWish.createdAt || new Date().toISOString(),
    };
    customs.push(wish);
    writeCustomWishes(customs);
    return wish;
  },
  async listWishes() {
    return this.getAllWishes().map(strip);
  },
  async verifyCode(code) {
    const all = this.getAllWishes();
    const wish = findWishByCode(all, code);
    if (!wish) return { ok: false };
    const ids = new Set(this.readUnlocked());
    ids.add(wish.id);
    this.writeUnlocked([...ids]);
    return { ok: true, wishId: wish.id };
  },
  unlockWish(id: string) {
    const ids = new Set(this.readUnlocked());
    ids.add(id);
    this.writeUnlocked([...ids]);
  },
  readUnlocked() {
    if (typeof localStorage === "undefined") return [];
    try {
      const raw = localStorage.getItem(UNLOCK_KEY);
      const parsed = raw ? (JSON.parse(raw) as string[]) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  },
  writeUnlocked(ids) {
    if (typeof localStorage === "undefined") return;
    localStorage.setItem(UNLOCK_KEY, JSON.stringify(ids));
  },
};

export const wishService: WishService = mockWishService;

export function wishById(id: string): Wish | undefined {
  return wishService.getAllWishes().find((wish) => wish.id === id);
}
