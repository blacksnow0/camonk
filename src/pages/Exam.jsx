import { useState, useEffect } from "react";
import Timer from "../components/Timer";
import QuestionFill from "../components/QuestionFill";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Exam() {
  const [startTimer, setStartTimer] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [resetSignal, setResetSignal] = useState(0);
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch questions from backend
  useEffect(() => {
    axios
      .get("http://localhost:8000/data")
      .then((res) => {
        setQuestions(res.data.questions);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch questions", err);
        setLoading(false);
      });
  }, []);

  const handleTimer = () => {
    console.log(questions);
    setStartTimer(true);
  };

  const nextQuestion = (answer) => {
    console.log(answer);
    setAnswers((prev) => [...prev, answer]);
    setResetSignal((prev) => prev + 1);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      navigate("/feedback", {
        state: { responses: [...answers, answer], questions },
      });
    }
  };

  const handleQuit = () => {
    const remainingAnswers = questions.slice(currentIndex).map((q) => ({
      questionId: q.questionId,
      answers: [],
    }));

    const finalAnswers = [...answers, ...remainingAnswers];

    navigate("/feedback", {
      state: { responses: finalAnswers, questions },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="flex justify-center items-center py-16">
        <section className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-8">
          <div className="mb-6 flex justify-between">
            <Timer
              startTimer={startTimer}
              nextQuestion={nextQuestion}
              resetSignal={resetSignal}
              questionId={questions[currentIndex]}
            />
            <button className="cursor-pointer border px-4" onClick={handleQuit}>
              Quit
            </button>
          </div>

          {/* Show loading screen while data is being fetched */}
          {loading ? (
            <div className="text-center text-xl font-semibold">Loading...</div>
          ) : (
            <QuestionFill
              question={questions[currentIndex]}
              handleTimer={handleTimer}
              nextQuestion={nextQuestion}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default Exam;
