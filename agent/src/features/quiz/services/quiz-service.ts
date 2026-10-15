import { mockGirls } from "@/data/mockParticipants";
import { mockQuestions } from "@/data/mockQuestions";
import type { OptionKey, Question, QuizProgress } from "@/features/quiz/types";
import { gradeAnswer } from "@/features/quiz/services/quiz-domain";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

export interface QuizService {
  /** Needs backend: reject unknown or expired invitation tokens. */
  validateToken(token: string): Promise<{ ok: boolean; name: string }>;
  /** Needs backend: return the next unanswered question for this token. */
  fetchQuestions(): Promise<Question[]>;
  /** Needs backend: persist the grade. Do not trust a client-sent correct flag. */
  submitAnswer(
    progress: QuizProgress,
    question: Question,
    key: OptionKey,
  ): Promise<{ progress: QuizProgress; reveal: boolean; correct: boolean }>;
}

function storageKey(token: string) {
  return `bloom-quiz:${token}`;
}

export function emptyProgress(token: string): QuizProgress {
  return { token, index: 0, wrongAttempts: {}, completed: false, answers: [] };
}

export function readProgress(token: string): QuizProgress {
  if (typeof localStorage === "undefined") return emptyProgress(token);
  try {
    const raw = localStorage.getItem(storageKey(token));
    if (!raw) return emptyProgress(token);
    const parsed = JSON.parse(raw) as QuizProgress;
    if (parsed.token !== token) return emptyProgress(token);
    return parsed;
  } catch {
    return emptyProgress(token);
  }
}

export function writeProgress(progress: QuizProgress) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(storageKey(progress.token), JSON.stringify(progress));
}

export const mockQuizService: QuizService = {
  async validateToken(token) {
    const girl = mockGirls.find((g) => g.token === token);
    if (!girl) return { ok: false, name: "" };
    return { ok: true, name: girl.name };
  },
  async fetchQuestions() {
    return [...mockQuestions].sort((a, b) => a.order - b.order);
  },
  async submitAnswer(progress, question, key) {
    const previous = progress.wrongAttempts[question.id] ?? 0;
    const grade = gradeAnswer(question, key, previous);
    const wrongAttempts = { ...progress.wrongAttempts, [question.id]: grade.attempts };
    let next = { ...progress, wrongAttempts };
    if (grade.finishedAttempt) {
      const answers = [
        ...progress.answers.filter((a) => a.questionId !== question.id),
        { questionId: question.id, key, correct: grade.correct },
      ];
      const index = progress.index + 1;
      next = {
        ...next,
        answers,
        index,
        completed: index >= mockQuestions.length,
      };
    }
    writeProgress(next);
    return { progress: next, reveal: grade.reveal, correct: grade.correct };
  },
};

/** Swap this export when a backend exists. API_BASE is unused by the mock. */
export const quizService: QuizService = mockQuizService;
void API_BASE;
