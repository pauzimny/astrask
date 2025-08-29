import { useState } from "react";
import { TQuizQuestion } from "../types/quiz-question.ts";
import { fetchQuiz } from "../services/quiz.ts";

export interface QuizProps {}

const Quiz = () => {
  const [questions, setQuestions] = useState<TQuizQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleStartQuiz = async () => {
    try {
      setLoading(true);
      const questions = await fetchQuiz();
      setQuestions(questions);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button
        onClick={handleStartQuiz}
        className="mt-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded relative w-full font-bold"
        disabled={loading}
      >
        {loading ? "Ładowanie..." : "Rozpocznij quiz"}
      </button>
      {questions.length > 0 && (
        <div className="mt-6 p-6 border-2 border-purple-400 rounded-2xl bg-violet-900 text-white">
          {questions.map((question, index) => (
            <>
              <p key={index}>{question.question}</p>
              <ul>
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex}>{option}</li>
                ))}
              </ul>
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default Quiz;
