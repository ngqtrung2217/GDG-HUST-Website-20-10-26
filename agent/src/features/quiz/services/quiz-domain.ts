import type { GradeResult, OptionKey, Question, RetryPolicy } from "@/features/quiz/types";

export const RETRY_POLICY: RetryPolicy = "reveal-and-continue";
export const MAX_WRONG = 2;

/**
 * Local quiz grader. The UI calls this instead of comparing keys inline.
 * A backend endpoint will return the same GradeResult shape and evaluate answers securely.
 */
export function gradeAnswer(
  question: Question,
  selected: OptionKey,
  previousWrong: number,
  policy: RetryPolicy = RETRY_POLICY,
): GradeResult {
  const correct = selected === question.correctKey;
  if (correct) {
    return { correct: true, attempts: previousWrong, reveal: false, finishedAttempt: true };
  }
  const attempts = previousWrong + 1;
  const reveal = policy === "reveal-and-continue" && attempts >= MAX_WRONG;
  return { correct: false, attempts, reveal, finishedAttempt: reveal };
}
