import { useState, useEffect } from "react";
import React from "react";

function Timer({ startTimer, nextQuestion, resetSignal, questionId }) {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    setSeconds(60);
  }, [resetSignal]);

  useEffect(() => {
    let interval = null;

    if (startTimer) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 50) {
            clearInterval(interval);
            const response = {
              questionId: questionId.questionId,
              answers: [],
            };
            nextQuestion(response);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [startTimer, nextQuestion, questionId]);

  return <div className="p-4 text-md font-semibold">Timer: {seconds}s</div>;
}

export default Timer;
