import QuizCard from "./QuizCard"
import { useLoaderData, useNavigate } from "react-router-dom"
import QuizTimer from "./QuizTimer"
import { useState, useEffect } from "react"
import { filter, shuffle } from "underscore"
import Category from "./Category"
import { Navigate } from "react-router-dom"

// TODO: Rename and rescope from `QuizList` that displays all fetchable quizzes
//       to `CurrentQuiz` that displays (for now) random quiz. 
function QuizList() { 

    const navigate = useNavigate()

    const [filterCategory, setFilterCategory] = useState("")

    const {allQuestions} = useLoaderData() || {}

    const filteredArray = allQuestions.filter(filterQuestion => {return filterQuestion.category.includes(filterCategory)})

    const shuffledArray = filteredArray.sort(() => 0.5 - Math.random());

    let numQuizChoices = 5;
    const shuffledQuizChoices = shuffledArray.slice(0, numQuizChoices);
    
    const mappedQuestions = shuffledQuizChoices.map(mainQuestion => <QuizCard 
        key={mainQuestion.id} 
        questionObj={mainQuestion}
        
        />)



    return ( 
        <div>
            
            {mappedQuestions}
            <button className='finish' onClick={() => navigate('/score')}>Finish</button>

            {/* <Category setFilterCategory={setFilterCategory}/> */}
        </div>
    )
}

export default QuizList

