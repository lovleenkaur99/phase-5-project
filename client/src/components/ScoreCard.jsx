import { Navigate, useNavigate } from "react-router-dom"

function ScoreCard({scoreObj, handleScore}){ 

    const navigate = useNavigate()
    return ( 
        <div className="score-display">
            {/* When the timer ends the page will display the score andf being able to either quit or play again */}
            {/* display scores for the right answers prority number two  */}
            
            <button className="quit" onClick={() => navigate("/")}> Quit </button>
            <button className="start-over" onClick={() => navigate("/getQuiz")}> Start Over </button>
        </div>
    )
}

export default ScoreCard