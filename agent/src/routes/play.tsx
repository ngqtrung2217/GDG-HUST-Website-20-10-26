import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { QuizPlay } from "@/features/quiz/components/QuizPlay";

const searchSchema = z.object({
  token: z.string().catch("").default(""),
});

export const Route = createFileRoute("/play")({
  validateSearch: searchSchema,
  component: PlayPage,
});

function PlayPage() {
  const { token } = Route.useSearch();
  return (
    <main>
      <QuizPlay token={token || ""} />
    </main>
  );
}
