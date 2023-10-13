import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
// import QuestionList from "./QuestionList";
// import AnswerList from "./AnswerList";
// import ScoreList from "./ScoreList";
// import Signup from "./Signup";
// import Timer from "./Timer";
// import EndPage from "./EndPage";

import { Outlet } from "react-router-dom";
import Header from "./Header"

function App() {
  return ( 
    <div>
      <Header/>
      {/* <QuestionList/>
      <AnswerList/>
      <ScoreList/>
      <Signup/>
      <Timer/>
      <EndPage/> */}
      <Outlet/>
    </div>
  )
}

export default App;
