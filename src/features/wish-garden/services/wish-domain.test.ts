import assert from "node:assert/strict";
import test from "node:test";
import { findWishByCode, normalizeCode } from "./wish-domain.ts";
import type { Wish } from "../types.ts";

const wishes: Wish[] = [
  {
    id: "w",
    boyId: "b",
    boyName: "A",
    code: "SEN",
    flower: "lotus",
    message: "hi",
  },
];

test("normalizes codes", () => {
  assert.equal(normalizeCode("  sen "), "SEN");
});

test("matches code and rejects unknown codes", () => {
  assert.equal(findWishByCode(wishes, "sen")?.id, "w");
  assert.equal(findWishByCode(wishes, "NOPE"), undefined);
});
