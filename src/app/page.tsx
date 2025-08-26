"use client";
import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [mode, setMode] = useState<"ask" | "quiz">("ask");

  async function handleAsk() {
    setAnswer("Mocked Odpowiedź");
  }

  return (
    <div className="p-10 max-w-xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">🌌 Astrask 🚀</h1>

      <div className="flex gap-2 justify-center mb-4">
        <button
          onClick={() => setMode("ask")}
          className={`px-4 py-2 rounded ${
            mode === "ask" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Tryb pytania
        </button>
        <button
          onClick={() => setMode("quiz")}
          className={`px-4 py-2 rounded ${
            mode === "quiz" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
        >
          Tryb quizu
        </button>
      </div>

      <input
        type="text"
        placeholder="Zadaj pytanie o kosmos..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <button
        onClick={handleAsk}
        className="mt-4 px-4 py-2 bg-purple-500 text-white rounded"
      >
        Start
      </button>

      {answer && (
        <div className="mt-6 p-4 border rounded bg-indigo-50">
          <p className="text-lg">{answer}</p>
        </div>
      )}
    </div>
  );
}
