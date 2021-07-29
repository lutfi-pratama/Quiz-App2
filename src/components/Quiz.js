import React from "react";

const fillQuestion = [
  {
    id: Math.random() * 100,
    quest: "bla bla",
    incorrect_ans: ["ali", "ale", "alo"],
    correct_ans: "ala",
  },
  {
    id: Math.random() * 100,
    quest: "bli bli",
    incorrect_ans: ["bla", "ble", "blo"],
    correct_ans: "bli",
  },
  {
    id: Math.random() * 100,
    quest: "blo blo",
    incorrect_ans: ["cla", "cli", "clo"],
    correct_ans: "cle",
  },
  {
    id: Math.random() * 100,
    quest: "ble ble",
    incorrect_ans: ["dla", "dli", "dle"],
    correct_ans: "dlo",
  },
]; // ! Data base

const Quiz = ({
  question,
  questionLength,
  handlerHint,
  currentQuestionIdx,
  nHint,
  countingTimer,
}) => {
  return (
    <div className="quiz-container bg-purple-600 rounded-lg items-center px-5 py-12 w-4/6">
      <div className="timer">
        <div className="timer-text">Time Left : </div>
        <div className="timer-count">{countingTimer}</div>
      </div>
      <h2 className="quiz-title">
        {currentQuestionIdx + 1} / {questionLength}
      </h2>
      <p className="quiz-content">
        {question
          ? question.quest
              .replace(/&quot;/g, '"')
              .replace(/&#039;/g, "'")
              .replace(/&eacute;/g, "É")
              .replace(/&amp;/g, "&")
              .replace(/&&micro;/g, "µ")
          : ""}
      </p>

      <button onClick={handlerHint} className="quiz-hint rounded-full">
        Hint {nHint}/2
      </button>
    </div>
  );
};

export default Quiz;
export { fillQuestion };
