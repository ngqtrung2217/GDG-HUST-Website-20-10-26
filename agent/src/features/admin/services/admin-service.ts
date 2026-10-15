import { mockBoys, mockGirls } from "@/data/mockParticipants";
import { mockQuestions } from "@/data/mockQuestions";
import { mockWishes } from "@/data/mockWishes";
import type { Question } from "@/features/quiz/types";
import type { Boy, Girl, Wish } from "@/features/wish-garden/types";

const KEY = "bloom-admin-store";

export interface AdminState {
  girls: Girl[];
  boys: Boy[];
  questions: Question[];
  wishes: Wish[];
}

export interface AdminService {
  load(): AdminState;
  save(state: AdminState): void;
  reset(): AdminState;
}

function seed(): AdminState {
  return {
    girls: structuredClone(mockGirls),
    boys: structuredClone(mockBoys),
    questions: structuredClone(mockQuestions),
    wishes: structuredClone(mockWishes),
  };
}

export const adminService: AdminService = {
  load() {
    if (typeof localStorage === "undefined") return seed();
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return seed();
      return JSON.parse(raw) as AdminState;
    } catch {
      return seed();
    }
  },
  save(state) {
    if (typeof localStorage === "undefined") return;
    localStorage.setItem(KEY, JSON.stringify(state));
  },
  reset() {
    const next = seed();
    this.save(next);
    return next;
  },
};

export function statsOf(state: AdminState) {
  const assigned = state.girls.reduce((sum, girl) => sum + girl.boyIds.length, 0);
  return {
    girls: state.girls.length,
    boys: state.boys.length,
    questions: state.questions.length,
    quizDone: state.girls.filter((girl) => girl.quizDone).length,
    assignments: assigned,
  };
}
