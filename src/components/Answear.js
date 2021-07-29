import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import { IconButton } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";

const Answear = props => {
  const history = useHistory();
  const [showScore, setShowScore] = useState(false);

  const Score = styled.div`
    display: none;

    ${props =>
      props.showScore &&
      css`
        display: block;
      `}
  `;

  const displayScore = e => {
    e.preventDefault();
    setShowScore(true);
  };

  const backToHome = () => {
    history.push("/");
    props.score.current = 0;
    props.setStartQuiz(false);
  };

  return (
    <div className="ans-container">
      <div className="ans-list">
        {props.question?.choice.map(answear => {
          const bgColor = props.showAnswear
            ? answear === props.question.correct_ans
              ? "correct_ans"
              : "incorrect_ans"
            : "";

          return (
            <button
              className={`${bgColor} ans-item`}
              onClick={() => props.handleAnswear(answear)}
              dangerouslySetInnerHTML={{ __html: answear }}
            />
          );
        })}
      </div>

      {props.showAnswear &&
        props.currentQuestionIdx !== props.questionLength - 1 &&
        !props.showHintAndNext && (
          <button
            onClick={props.nextQuestion}
            className="next-question animate__animated animate__zoomIn"
          >
            Next
          </button>
        )}

      {props.showAnswear &&
        props.currentQuestionIdx >= props.questionLength - 1 && (
          <div>
            <button
              onClick={displayScore}
              className="show-score animate__animated animate__zoomIn"
            >
              Show Score
            </button>
          </div>
        )}

      <Score showScore={showScore}>
        <div className="scoreShowed animate__animated animate__zoomIn">
          <h1 className="animate__animated animate__heartBeat">
            {props.score.current}
          </h1>
          <button className="backToHome" onClick={backToHome}>
            <HomeIcon className="backToHome-icon" />
          </button>

          {/* <IconButton
            color="primary"
            aria-label="Home"
            onClick={backToHome}
            className="backToHome"
          >
          </IconButton> */}
        </div>
      </Score>
    </div>
  );
};

export default Answear;
