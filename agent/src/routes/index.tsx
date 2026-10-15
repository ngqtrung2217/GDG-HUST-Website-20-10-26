import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { QuizPlay } from "@/features/quiz/components/QuizPlay";

const searchSchema = z.object({
  token: z.string().catch("").default(""),
});

export const Route = createFileRoute("/")({
  validateSearch: searchSchema,
  component: HomePage,
});

function HomePage() {
  const { token } = Route.useSearch();
  return (
    <main className="w-full min-h-screen overflow-x-hidden relative">
      <QuizPlay token={token || ""} />
    </main>
  );
}
