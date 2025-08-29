import { TQuizQuestion } from "../types/quiz-question.ts";

export async function fetchQuiz(): Promise<TQuizQuestion[]> {
  const res = await fetch("/api/quiz", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mode: "quiz" }),
  });

  if (!res.ok) {
    throw new Error("Błąd podczas pobierania quizu");
  }

  return res.json() as Promise<TQuizQuestion[]>;
}
