import assert from "node:assert/strict";
import test from "node:test";
import { gradeAnswer } from "./quiz-domain.ts";
import type { Question } from "../types.ts";

const q: Question = {
  id: "q",
  order: 1,
  text: "t",
  correctKey: "b",
  options: [
    { key: "a", label: "a" },
    { key: "b", label: "b" },
    { key: "c", label: "c" },
    { key: "d", label: "d" },
  ],
};

test("first wrong attempt does not reveal", () => {
  const result = gradeAnswer(q, "a", 0);
  assert.equal(result.correct, false);
  assert.equal(result.attempts, 1);
  assert.equal(result.reveal, false);
  assert.equal(result.finishedAttempt, false);
});

test("second wrong attempt reveals and finishes", () => {
  const result = gradeAnswer(q, "c", 1);
  assert.equal(result.reveal, true);
  assert.equal(result.finishedAttempt, true);
});

test("correct answer finishes immediately", () => {
  const result = gradeAnswer(q, "b", 1);
  assert.equal(result.correct, true);
  assert.equal(result.finishedAttempt, true);
});
