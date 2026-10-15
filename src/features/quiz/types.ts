export type OptionKey = "a" | "b" | "c" | "d";

export interface QuestionOption {
  key: OptionKey;
  label: string;
}

export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
  /** Demo-only. Production grading must happen on the server. */
  correctKey: OptionKey;
  image?: string;
  clue?: string;
  order: number;
}

export interface StoredAnswer {
  questionId: string;
  key: OptionKey;
  correct: boolean;
}

export interface QuizProgress {
  token: string;
  index: number;
  wrongAttempts: Record<string, number>;
  completed: boolean;
  answers: StoredAnswer[];
}

/** What happens after the second wrong attempt. */
export type RetryPolicy = "reveal-and-continue";

export interface GradeResult {
  correct: boolean;
  attempts: number;
  reveal: boolean;
  finishedAttempt: boolean;
}
