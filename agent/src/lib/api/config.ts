/** Point this at the real API when the backend exists. Mocks ignore it. */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

/**
 * Service methods that still need a backend:
 * - QuizService.validateToken
 * - QuizService.fetchQuestions (without correctKey)
 * - QuizService.submitAnswer
 * - WishService.listWishes
 * - WishService.verifyCode
 * - AdminService.* (all mutations and stats)
 *
 * localStorage in this demo is not server persistence and is not security.
 */
export const BACKEND_TODO = [
  "validate invitation tokens",
  "grade quiz answers",
  "store completion",
  "verify secret codes",
  "store unlocked wishes",
  "admin CRUD and email delivery",
] as const;
