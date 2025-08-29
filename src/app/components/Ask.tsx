"use client";
import { useState } from "react";
import { askAstro } from "../services/ask.ts";

export default function Ask() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAsk() {
    if (!question) return;
    setLoading(true);
    setAnswer("");

    try {
      const result = await askAstro(question);
      setAnswer(result);
    } catch (err) {
      console.error(err);
      setAnswer("Ups, coś poszło nie tak. Spróbuj jeszcze raz. 🚀");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <textarea
        placeholder="Zadaj pytanie o kosmos..."
        value={question}
        rows={5}
        onChange={(e) => setQuestion(e.target.value)}
        className="relative border p-2 rounded w-full text-white border-white"
      />
      <button
        onClick={handleAsk}
        className="mt-4 px-4 py-2 bg-white text-black rounded relative w-full font-bold"
        disabled={loading}
      >
        {loading ? "Ładowanie..." : "Zapytaj o kosmos!"}
      </button>

      {answer && (
        <div className="mt-6 p-4 border rounded bg-indigo-50 relative shadow-lg shadow-indigo-500/50">
          <p className="text-lg text-indigo-900">{answer}</p>
        </div>
      )}
    </div>
  );
}
