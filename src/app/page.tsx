"use client";
import { useState } from "react";

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
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, mode }),
      });
      const data = await res.json();
      setAnswer(data.answer);
    } catch (err) {
      console.error(err);
      setAnswer("Ups, coś poszło nie tak. Spróbuj jeszcze raz. 🚀");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen p-10 max-w-xl mx-auto text-center overflow-hidden bg-black">
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

      <h1 className="relative text-3xl font-bold mb-4 text-white">
        🌌 Astrask 🚀
      </h1>

      <div className="relative flex gap-2 justify-center mb-4">
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
        className="relative border p-2 rounded w-full text-white border-white"
      />
      <button
        onClick={handleAsk}
        className="mt-4 px-4 py-2 bg-purple-500 text-white rounded relative"
        disabled={loading}
      >
        {loading ? "Ładowanie..." : "Start"}
      </button>

      {answer && (
        <div className="mt-6 p-4 border rounded bg-indigo-50 relative">
          <p className="text-lg">{answer}</p>
        </div>
      )}
    </div>
  );
}
