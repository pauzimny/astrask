"use client";
import { useState } from "react";
import Quiz from "./components/Quiz.tsx";
import Ask from "./components/Ask.tsx";

export default function Home() {
  const [answer, setAnswer] = useState("");
  const [mode, setMode] = useState<"ask" | "quiz">("ask");

  function handleQuizStart() {
    setAnswer(
      "🚀 Quiz jeszcze nie został zaimplementowany, ale tutaj się zacznie!"
    );
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
        <h1 className="relative text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-white animate-pulse-shadow">
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

        {mode === "ask" && <Ask />}

        {mode === "quiz" && (
          <Quiz onQuizStart={handleQuizStart} answer={answer} />
        )}
      </div>
    </div>
  );
}
