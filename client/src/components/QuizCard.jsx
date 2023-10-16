import React, { useState } from 'react';
import _unescape from "underscore/modules/unescape.js"
import parse from "html-react-parser"

function QuizCard({ questionObj }) {
    const [isCorrect, setIsCorrect] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    

    
    const question = _unescape(questionObj.question )
    const decodedQuestion = () =>{ 
        const p = document.createElement('p')
        p.innerHTML = questionObj.question
        return p 
    }
    
    const mappedAnswers = questionObj.answer.map((answer) => (
        
        <ul key={answer.id} onClick={handleCorrectAnswer} >
            <li >{answer.answer1}</li>
            <li>{answer.answer2}</li>
            <li>{answer.answer3}</li>
            <li>{answer.answer4}</li>
        </ul>
    ))

    function handleCorrectAnswer(answer) {
        if (!selectedAnswer) {
        setSelectedAnswer(isCorrect);

        if (isCorrect === answer.correct) {
            setIsCorrect(true);
            console.log("I am Correct!");
        } else {
            setIsCorrect(false);
            console.log("I am not correct!");
        }
        }
    }
        

    return (
        <div>
        <h5>Difficulty: {questionObj.difficulty}</h5>
        <h3>{parse(questionObj.question)}</h3>
        
        {mappedAnswers}
        </div>
    );
}

export default QuizCard;



// import { useState } from "react"


// function QuizCard({questionObj}){

//     const [isCorrect, setIsCorrect] = useState(false)
//     const [correctAnswer, setCorrectAnswer] = useState(false)
//     const [selectedAnswer, setSelectedAnswer] = useState(null)

//     function handleCorrectanswer(e){ 

//         if (!correctAnswer) { 
//             const selectedText = e.target.textContent
//             setSelectedAnswer(selectedAnswer)

//             if(questionObj.correct === selectedText){ 
//                 setCorrectAnswer(true)
//                 setIsCorrect(true)
//                 console.log("I am Correct!")
//             } else { 
//                 setCorrectAnswer(true)
//                 setIsCorrect(false)
//                 console.log("I am not correct!")
//             }
//         }
        
//     }
    
//     return (
//     <div>
//         <h5>Difficulty: {questionObj.difficulty}</h5>
//         <h3>{questionObj.question}</h3>
//         <li onClick={handleCorrectanswer}>
//         <button >answer1{questionObj.answer1}</button>
//         <button >answer2{questionObj.answer2}</button>
//         <button >answer3{questionObj.answer3}</button>
//         <button >correct{questionObj.correct}</button>
//         </li>
//     </div>
//     )
    
// }

// export default QuizCard









