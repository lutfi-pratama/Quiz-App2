import React, { useState, useEffect, useRef } from "react";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Answear from "./components/Answear";
import "./App.css";
import "./Responsive.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Background from "./images/Taieri.png";

const fetchData = async (category, difficulty) => {
  const res = await fetch(
    `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
  );
  const response = await res.json();
  const value = response.results.map(question => {
    return {
      quest: question.question,
      correct_ans: question.correct_answer,
      choice: [...question.incorrect_answers, question.correct_answer],
    };
  });

  return value;
};

const App = () => {
  const nHint = useRef(2);
  const score = useRef(0);
  const countTimeIdx = useRef(5); // todo: set timer
  const counterTime = useRef();

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [question, setQuestion] = useState([]); // set to next/prev quiz
  const [showAnswear, setShowAnswear] = useState(false);
  const [showHintAndNext, setShowHintAndNext] = useState(true);
  const [countingTimer, setCountingTimer] = useState(5); // todo: set timer
  const [startQuiz, setStartQuiz] = useState(false); // to start timer

  const startTimer = () => {
    counterTime.current = setInterval(timer, 1000);
    function timer() {
      countTimeIdx.current -= 1;
      setCountingTimer(countTimeIdx.current);
      if (countTimeIdx.current === 0) {
        clearInterval(counterTime.current);
        setShowAnswear(true);
        setShowHintAndNext(false);
      }
    }
  };

  useEffect(() => {
    if (startQuiz) startTimer();

    setCurrentQuestionIdx(0);
    nHint.current = 2;
    setShowAnswear(false);
    setCountingTimer(5);
    countTimeIdx.current = 5;
  }, [startQuiz]);

  const setData = async (category, difficulty) => {
    const question = await fetchData(category, difficulty);
    setQuestion(question);
  };

  useEffect(() => {
    const tempQuestion = [...question];
    if (tempQuestion[currentQuestionIdx]) {
      tempQuestion[currentQuestionIdx].choice = tempQuestion[
        currentQuestionIdx
      ]?.choice?.sort(() => Math.random() - 0.5);
      setQuestion(tempQuestion);
    }
  }, [currentQuestionIdx]);

  const nextQuestion = () => {
    if (currentQuestionIdx !== question.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
      setShowAnswear(false);
      setShowHintAndNext(true);
      // setTimer
      countTimeIdx.current = 5; // todo: set timer
      setCountingTimer(countTimeIdx.current);
      startTimer();
    }
  };

  const handlerHint = () => {
    if (nHint.current !== 0 && showHintAndNext) {
      nHint.current--;
      setShowAnswear(true);
      setShowHintAndNext(false);
      score.current += (1 / 10) * 100;
      clearInterval(counterTime.current);
    }
  };

  const handleAnswear = answear => {
    if (!showAnswear) {
      if (answear === question[currentQuestionIdx].correct_ans) {
        score.current += (1 / 10) * 100;
      }
      setShowHintAndNext(false);
    }
    clearInterval(counterTime.current);
    setShowAnswear(true);
  };

  return (
    <Router>
      <Switch>
        <div className="h-screen App bg-indigo-50">
          <Route exact path="/">
            <img
              className="App-background-pattern animate__animated animate__fadeInUpBig"
              src={Background}
              alt="background-pattern"
            />
            <Home
              setStartQuiz={setStartQuiz}
              startQuiz={startQuiz}
              setData={setData}
            />
          </Route>

          <Route
            path="/quiz"
            render={props => (
              <Quiz
                {...props} //? perlu atau tidak
                currentQuestionIdx={currentQuestionIdx}
                question={question[currentQuestionIdx]}
                questionLength={question.length}
                handlerHint={handlerHint}
                nHint={nHint.current}
                countingTimer={countingTimer}
              />
            )}
          />

          <Route
            path="/quiz"
            render={props => (
              <Answear
                currentQuestionIdx={currentQuestionIdx}
                handleAnswear={handleAnswear}
                showAnswear={showAnswear}
                question={question[currentQuestionIdx]}
                questionLength={question.length}
                nextQuestion={nextQuestion}
                showHintAndNext={showHintAndNext}
                score={score}
                setStartQuiz={setStartQuiz}
              />
            )}
          />
        </div>
      </Switch>
    </Router>
  );
};

export default App;
