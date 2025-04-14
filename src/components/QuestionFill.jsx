import React, { useState, useEffect } from "react";

function QuestionFill({ question, nextQuestion, handleTimer }) {
  const [parts, setParts] = useState([]);
  const [filled, setFilled] = useState([]);
  const [usedOptions, setUsedOptions] = useState([]);

  useEffect(() => {
    if (question?.question) {
      const splitParts = question.question
        .split("_____________")
        .map((p) => p.trim());
      setParts(splitParts);
      setFilled(Array(question.options.length).fill(null));
      setUsedOptions([]);
    }
  }, [question]);

  const handleOptionClick = (option) => {
    const filledIndex = filled.findIndex((f) => f === option);

    if (filledIndex !== -1) {
      const updated = [...filled];
      updated[filledIndex] = null;
      setFilled(updated);
      setUsedOptions((prev) => prev.filter((o) => o !== option));
    } else {
      const nextBlank = filled.findIndex((f) => f === null);
      if (nextBlank !== -1) {
        const updated = [...filled];
        updated[nextBlank] = option;
        setFilled(updated);
        setUsedOptions((prev) => [...prev, option]);
      }
    }
  };

  const handleReset = () => {
    setFilled(Array(question.options.length).fill(null));
    setUsedOptions([]);
  };

  const handleSubmit = () => {
    const response = {
      questionId: question.questionId, // handle both _id or id
      answers: [...usedOptions],
    };
    nextQuestion(response);
    handleTimer();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h3 className="text-md font-semibold text-center text-neutral-600 mb-8">
        Select the missing word in the correct order.
      </h3>

      <section className="space-y-6">
        <div className="w-full px-4">
          <p className="text-xl font-medium text-center mb-6 text-neutral-700 leading-relaxed flex flex-wrap justify-center gap-2">
            {parts.map((part, idx) => (
              <React.Fragment key={idx}>
                <span>{part}</span>
                {idx < filled.length && (
                  <span className="inline-block border-b-2 border-neutral-400 min-w-[100px] px-2 text-black font-semibold text-center cursor-pointer">
                    {filled[idx] || "\u00A0"}
                  </span>
                )}
              </React.Fragment>
            ))}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className={`px-6 py-3 border rounded-md shadow-sm text-sm font-semibold transition ${
                  usedOptions.includes(option)
                    ? "bg-neutral-300 text-neutral-600"
                    : "bg-white hover:bg-neutral-100"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handleReset}
              className="text-neutral-800 cursor-pointer hover:underline text-sm"
            >
              Reset
            </button>
            <button
              onClick={() => handleSubmit()}
              disabled={usedOptions.length < 4}
              className={`px-3 py-1   border text-2xl text-neutral-800  ${
                usedOptions.length < 4
                  ? "bg-neutral-300 text-neutral-600 cursor-not-allowed"
                  : "bg-white hover:bg-neutral-100 cursor-pointer"
              }`}
            >
              {"->"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default QuestionFill;
