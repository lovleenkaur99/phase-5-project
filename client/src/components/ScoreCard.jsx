import { Navigate, useNavigate } from "react-router-dom"

function ScoreCard({scoreObj}){ 

    const navigate = useNavigate()
    return ( 
        <div className="score-display">
            <button className="quit" onClick={() => navigate("/")}> Quit </button>
            <button className="start-over" onClick={() => navigate("/getQuiz")}> Start Over </button>
        </div>
    )
}

export default ScoreCard