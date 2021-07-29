import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { TextField, MenuItem } from "@material-ui/core";
import Categories from "../Data/Categories";
import ErrorIcon from "../images/error-icon.png";
import styled, { css } from "styled-components";

const Home = props => {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);

  const Button = styled.button`
    border: 0;
    padding: 10px;
    font-size: medium;
    background-color: #fdfa72;
    border-radius: 10px;
    width: 100px;
    font-weight: 500;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
  `;

  const Title = styled.h1`
    font-size: xx-large;
    font-weight: 700;
    text-align: center;
    text-decoration: underline;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    align-items: center;

    ${props =>
      props.errorMsg &&
      css`
        opacity: 0.5;
        color: transparent;
        text-shadow: 0 0 6px #000;
      `}
  `;

  const history = useHistory();

  const checkInputUser = () => {
    if (!category || !difficulty) {
      setErrorMsg(true);
      return;
    } else {
      setErrorMsg(false);
      history.push("/quiz");
      props.setStartQuiz(true);
      props.setData(category, difficulty);
    }
  };

  return (
    <div className="start-quiz">
      <header>
        <Title errorMsg={errorMsg} className="p-10">
          Quiz Apps
        </Title>
      </header>

      {errorMsg && (
        <div>
          <img
            className="error-icon animate__animated animate__zoomIn"
            src={ErrorIcon}
            alt="error"
          />
          <p className="error-massage animate__animated animate__slideInUp">
            Please fill all the fields
          </p>
        </div>
      )}
      <div className="setting-select">
        <TextField
          select
          label="Select Categories"
          varient="outlined"
          onChange={e => {
            setCategory(e.target.value);
          }}
          value={category}
        >
          {Categories.map(cat => (
            <MenuItem key={cat.category} value={cat.value}>
              {cat.category}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Select Difficulty"
          varient="outlined"
          style={{ marginTop: 30 }}
          onChange={e => {
            setDifficulty(e.target.value);
          }}
          value={difficulty}
        >
          <MenuItem key="Easy" value="easy">
            Easy
          </MenuItem>
          <MenuItem key="Medium" value="medium">
            Medium
          </MenuItem>
          <MenuItem key="Hard" value="hard">
            Hard
          </MenuItem>
        </TextField>
      </div>

      <Button onClick={checkInputUser}>Start</Button>
    </div>
  );
};

export default Home;
