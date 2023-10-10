import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import QuestionList from "./QuestionList";
import AnswerList from "./AnswerList";
import ScoreList from "./ScoreList";
import Signup from "./Signup";
import Timer from "./Timer";
import EndPage from "./EndPage";

function App() {
  return ( 
    <div>
      <QuestionList/>
      <AnswerList/>
      <ScoreList/>
      <Signup/>
      <Timer/>
      <EndPage/>
    </div>
  )
}

export default App;
