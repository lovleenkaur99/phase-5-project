import React, { useState } from 'react';
import _unescape from "underscore/modules/unescape.js"
import parse from "html-react-parser"
import QuizTimer from './QuizTimer';

function QuizCard({ questionObj }) {
    const [isCorrect, setIsCorrect] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [result, setResult] = useState({ 
        score: 0, 
        correctAnswers: 0,
        wrongAnswers: 0,
    })
    
    const questionData = _unescape(questionObj.question )
    const decodedQuestion = () =>{ 
        const p = document.createElement('p')
        p.innerHTML = questionObj.question
        return p 
    }
    
    const onClickNext = () => { 
        setCurrentQuestion((prev) => prev + 1)
        setResult((prev) => 
        setResult ? { 
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
        }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
        
    )}
    
    const mappedAnswers = questionObj.answer.map((answer) => (
        
        <ul className='answers-display' key={answer.id} onClick={handleCorrectAnswer} >
            <li >{answer.answer1}</li>
            <li >{answer.answer2}</li>
            <li >{answer.answer3}</li>
            <li >{answer.answer4}</li>
        </ul>
    ))

    function handleCorrectAnswer(e, answer) {
        
        if (answer.correct === e.target.textContent) { 
            isCorrect(true)
            selectedAnswer(true)
            console.log("I am correct!!")
        } else { 
            isCorrect(false)
            selectedAnswer(true)
            console.log("I am not correct!")
        }
    }
    
    const handleTimeUp = () => { 

    }
    
    const {question, difficulty} = questionObj
    

    return (
        <div className='questions-display'>
            <QuizTimer duration={10} handleTimeUp={handleTimeUp} />
            
            <h5>Difficulty: {difficulty}</h5> <br/>
            <h3>{parse(question)}</h3> <br/>
        
            {mappedAnswers}
        </div>
    );
}

export default QuizCard;

