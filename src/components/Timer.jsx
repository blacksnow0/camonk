import { useState, useEffect } from "react";
import React from "react";

function Timer({ startTimer, nextQuestion, resetSignal }) {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    setSeconds(60); // reset when resetSignal changes
  }, [resetSignal]);

  useEffect(() => {
    let interval = null;

    if (startTimer) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 55) {
            clearInterval(interval);
            nextQuestion(); // go to next question
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [startTimer, nextQuestion]);

  return <div className="p-4 text-md font-semibold">Timer: {seconds}s</div>;
}

export default Timer;
