import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { BoyWishPage } from "@/features/wish-garden/components/BoyWishPage";

const searchSchema = z.object({
  token: z.string().catch("").default(""),
  group: z.string().catch("").default(""),
  view: z.string().catch("").default(""),
});

export const Route = createFileRoute("/boy")({
  validateSearch: searchSchema,
  component: BoyPage,
});

function BoyPage() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden relative">
      <BoyWishPage />
    </main>
  );
}
