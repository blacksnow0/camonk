import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Timer from "./components/Timer";
import QuestionFill from "./components/QuestionFill";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function App() {
  const [startTimer, setStartTimer] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [resetSignal, setResetSignal] = useState(0);
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch questions from backend
  useEffect(() => {
    axios
      .get("http://localhost:8000/data")
      .then((res) => {
        setQuestions(res.data.questions);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        console.error("Failed to fetch questions", err);
        setLoading(false); // Set loading to false even if error occurs
      });
  }, []);

  const handleTimer = () => {
    console.log(questions);
    setStartTimer(true);
  };

  const nextQuestion = (answers) => {
    console.log(answers);
    setResetSignal((prev) => prev + 1);
    setCurrentIndex((prevIndex) =>
      prevIndex < questions.length - 1 ? prevIndex + 1 : 0
    );
  };

  // Quit button functionality
  const handleQuit = () => {
    // You can replace this with the desired route or reset logic
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="shadow-md">
        <Navbar />
      </nav>

      <main className="flex justify-center items-center py-16">
        <section className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-8">
          <div className="mb-6 flex justify-between">
            <Timer
              startTimer={startTimer}
              nextQuestion={nextQuestion}
              resetSignal={resetSignal}
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

export default App;
