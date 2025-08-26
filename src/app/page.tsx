"use client";
import { useState } from "react";
import { askAstro } from "./services/ask.ts";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [mode, setMode] = useState<"ask" | "quiz">("ask");
  const [loading, setLoading] = useState(false);

  async function handleAsk() {
    if (!question) return;
    setLoading(true);
    setAnswer("");

    try {
      const answer = await askAstro(question);
      setAnswer(answer);
    } catch (err) {
      console.error(err);
      setAnswer("Ups, coś poszło nie tak. Spróbuj jeszcze raz. 🚀");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen py-10 px-20 mx-auto text-center overflow-hidden ">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-900 via-purple-700 to-black z-0"></div>
      <div className="absolute inset-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-70 animate-pulse"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>
      <div className="relative max-w-[1200px] mx-auto">
        <h1
          className="relative text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-white 
               animate-pulse-shadow"
        >
          Astrask 🚀
        </h1>

        <div className="relative flex gap-2 justify-center mb-4">
          <button
            onClick={() => setMode("ask")}
            className={`px-4 py-2 rounded min-w-[50%] font-bold ${
              mode === "ask" ? "bg-violet-500 text-white" : "bg-gray-200"
            }`}
          >
            Zadaj pytanie
          </button>
          <button
            onClick={() => setMode("quiz")}
            className={`px-4 py-2 rounded min-w-[50%] font-bold ${
              mode === "quiz" ? "bg-violet-500 text-white" : "bg-gray-200"
            }`}
          >
            Quiz
          </button>
        </div>

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
          <div className="mt-6 p-6 border-2 border-purple-400 rounded-2xl bg-violet-900 text-white">
            <p className="text-lg">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}
