export interface QuizProps {
  onQuizStart: () => void;
  loading: boolean;
  answer?: string;
}

const Quiz = ({ onQuizStart, loading, answer }: QuizProps) => {
  return (
    <>
      <button
        onClick={onQuizStart}
        className="mt-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded relative w-full font-bold"
        disabled={loading}
      >
        Rozpocznij quiz
      </button>
      {answer && (
        <div className="mt-6 p-6 border-2 border-purple-400 rounded-2xl bg-violet-900 text-white">
          <p className="text-lg">{answer}</p>
        </div>
      )}
    </>
  );
};

export default Quiz;
