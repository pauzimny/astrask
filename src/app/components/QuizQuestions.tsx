import { useState } from "react";
import { TQuizQuestion } from "../types/quiz-question.ts";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button.tsx";

interface QuizQuestionsProps {
  questions: TQuizQuestion[];
}

export const QuizQuestions = ({ questions }: QuizQuestionsProps) => {
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (qIndex: number, optionIndex: number) => {
    const updated = [...answers];
    updated[qIndex] = optionIndex;
    setAnswers(updated);
  };

  const handleSubmit = () => setSubmitted(true);

  if (submitted) {
    const correctCount = questions.filter(
      (q, i) => answers[i] === q.correct
    ).length;

    return (
      <Card className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">🎉 Podsumowanie quizu</h2>
        <p className="text-lg">
          Poprawne odpowiedzi: <span className="font-bold">{correctCount}</span>{" "}
          / {questions.length}
        </p>
        <p className="mt-2">
          {correctCount === questions.length
            ? "🌟 Brawo! Wszystkie poprawne!"
            : "💪 Dobra robota, spróbuj jeszcze raz!"}
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {questions.map((q: TQuizQuestion, qIndex: number) => (
        <Card key={qIndex} className="p-4 bg-transparent">
          <h3 className="font-semibold text-white">{q.question}</h3>
          <CardContent>
            <RadioGroup
              onValueChange={(val) => handleAnswer(qIndex, parseInt(val))}
              className="flex flex-col space-y-2"
            >
              {q.options.map((opt, oIndex) => (
                <div key={oIndex} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={oIndex.toString()}
                    id={`q${qIndex}-o${oIndex}`}
                    className="h-4 w-4 border border-gray-300 rounded-full"
                  />

                  <Label
                    htmlFor={`q${qIndex}-o${oIndex}`}
                    className="text-white"
                  >
                    {opt}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      ))}

      <Button
        className="w-full mt-4"
        onClick={handleSubmit}
        disabled={answers.length < questions.length}
      >
        Zakończ quiz ✅
      </Button>
    </div>
  );
};
