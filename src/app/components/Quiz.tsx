import { useState } from "react";
import { TQuizQuestion } from "../types/quiz-question.ts";
import { fetchQuiz } from "../services/quiz.ts";
import { QuizQuestions } from "./QuizQuestions.tsx";
import { mockedQuestions } from "../mocks/questions.ts";

export interface QuizProps {}

const Quiz = () => {
  const [questions, setQuestions] = useState<TQuizQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleStartQuiz = async () => {
    try {
      setLoading(true);
      // const questions = await fetchQuiz();
      // setQuestions(questions);
      setQuestions(mockedQuestions);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {(questions.length === 0 || loading) && (
        <button
          onClick={handleStartQuiz}
          className="mt-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded relative w-full font-bold"
          disabled={loading}
        >
          {loading ? "Ładowanie..." : "Rozpocznij quiz"}
        </button>
      )}
      {questions.length > 0 && <QuizQuestions questions={questions} />}
    </>
  );
};

export default Quiz;
