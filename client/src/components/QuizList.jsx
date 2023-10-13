import QuizCard from "./QuizCard"
import { useLoaderData } from "react-router-dom"
import Category from "./Category"
import QuizTimer from "./QuizTimer"
import { useState, useEffect } from "react"






function QuizList() { 

    const [filterCategory, setFilterCategory] = useState("")

    const {allAnswers, allQuestions} = useLoaderData() || {}

    

    const filteredArray = allQuestions.filter(filterQuestion => {return filterQuestion.category.includes(filterCategory)})
    console.log(allQuestions)
    const mappedQuestions = filteredArray.map(mainQuestion => <QuizCard key={mainQuestion.id} questionObj={mainQuestion}/>)
    console.log(filteredArray)


    const handleTimeUp = () => { 

    }

    return ( 
        <div>
            <QuizTimer duration={10} handleTimeUp={handleTimeUp}/>
            {mappedQuestions}
            
            
            {/* <Category setFilterCategory={setFilterCategory}/> */}
        </div>
    )
}

export default QuizList

