import QuizCard from "./QuizCard"
import { useLoaderData } from "react-router-dom"
import QuizTimer from "./QuizTimer"
import { useState, useEffect } from "react"
import { filter } from "underscore"



function QuizList() { 

    const [filterCategory, setFilterCategory] = useState("")

    const {allQuestions  } = useLoaderData() || {}

    const filteredArray = allQuestions.filter(filterQuestion => {return filterQuestion.category.includes(filterCategory)})
    
    const mappedQuestions = filteredArray.map(mainQuestion => <QuizCard key={mainQuestion.id} questionObj={mainQuestion}/>)
    console.log(filteredArray)


    

    return ( 
        <div>
            
            {mappedQuestions}
            
            
            
        </div>
    )
}

export default QuizList

