import { useLoaderData } from "react-router-dom"
import ScoreCard from "./ScoreCard"

function ScoreList(){ 

    const { allScores } = useLoaderData()
    return ( 
        <div>
            {allScores.map( scores =>  <ScoreCard key={scores.id} scoresobj={scores}/>)}
        </div>
    )
}

export default ScoreList
