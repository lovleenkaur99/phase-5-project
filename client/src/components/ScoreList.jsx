import { useLoaderData } from "react-router-dom"
import ScoreCard from "./ScoreCard"

function ScoreList(){ 

    const {} = useLoaderData()
    return ( 
        <div>
            <ScoreCard/>
        </div>
    )
}

export default ScoreList
