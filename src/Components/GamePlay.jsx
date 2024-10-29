import React, { useState } from "react";
import styled from "styled-components";
import TotalScore from "./TotalScore";
import NumberSelector from "./NumberSelector";
import RoleDice from "./RoleDice";
import Rules from "./Rules"


function GamePlay() {
  const [score, setScore] = useState(0);
  const [selectednumber, setSelectednumber] = useState();
  const [currentDice, setCurrentDice] = useState(1);
  const [err, setErr] = useState("");
  const [showRules, setShowRules]  = useState(false)

  const generateNUmber = (min, max) => {
    // console.log(Math.floor(Math.random() * (max - min) + min));
    return Math.floor(Math.random() * (max - min) + min);
  };

  const roleDice = () => {
    if (!selectednumber) {
      setErr("you hve not selected any number");
      return;
    }
    setErr("")
    const randomNumber = generateNUmber(1, 7);
    setCurrentDice((prev) => randomNumber);

    if (selectednumber === randomNumber) {
      setScore((prev) => prev + randomNumber);
    } else {
      setScore((prev) => prev - 2);
    }

    setSelectednumber(undefined);
  };

  const resetScore =() => {
    setScore(0)
  }

  return (
    <MainContainer>
      <div className="top_section">
        <TotalScore score={score} />
        <NumberSelector
          err={err}
          selectednumber={selectednumber}
          setSelectednumber={setSelectednumber}
        />
      </div>
      <RoleDice setErr={setErr} currentDice={currentDice} roleDice={roleDice} />

      <div className="btns">
        <Button onClick= {resetScore} >Reset</Button>
        <Button
        onClick = {() => setShowRules((prev) => !prev)}>
        {showRules ? "Hide " : "Show "}
         Rules </Button>
      </div>

      {showRules &&  <Rules />}
    </MainContainer>
  );
}

export default GamePlay;

const MainContainer = styled.main`
  .top_section {
    display: flex;
    justify-content: space-around;
    align-items: end;
  }

  .btns{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  }
`;

const Button = styled.button`
  color: white;
  padding: 10px 18px;
  background: #000000;
  border-radius: 5px;
  min-width: 220px;
  border: none;
  font-size: 16px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: 0.4s background ease-in;
  &:hover {
    background-color: white;
    border: 1px solid black;
    color: black;
    transition: 0.3s background ease-in;
  }
`;

