import { useLocation } from "react-router-dom";

const Feedback = () => {
  const { state } = useLocation();
  const { responses, questions } = state || {};

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Feedback Summary</h1>
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md space-y-4">
        {questions.map((q, idx) => {
          const userAnswer = responses[idx]?.answers || [];
          const correctAnswer = q.correctAnswer;

          const isCorrect =
            JSON.stringify(userAnswer) === JSON.stringify(correctAnswer);

          return (
            <div key={q.questionId} className="border-b pb-4">
              <p className="font-semibold mb-2">{q.question}</p>
              <p>
                <span className="font-medium">Your Answer:</span>{" "}
                {userAnswer.join(", ")}
              </p>
              <p>
                <span className="font-medium">Correct Answer:</span>{" "}
                {correctAnswer.join(", ")}
              </p>
              <p
                className={`font-bold ${
                  isCorrect ? "text-green-600" : "text-red-600"
                }`}
              >
                {isCorrect ? "Correct" : "Incorrect"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Feedback;
