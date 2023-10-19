import React, { useState } from 'react';
import _unescape from "underscore/modules/unescape.js";
import parse from "html-react-parser";
import QuizTimer from './QuizTimer';
import { Navigate, useNavigate } from 'react-router-dom';

function QuizCard({ questionObj }) {
    const navigate = useNavigate();

    const [isCorrect, setIsCorrect] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [result, setResult] = useState({ 
        score: 0, 
        correctAnswers: 0,
        wrongAnswers: 0,
    });
    const [shuffledAnswers, setShuffledAnswers] = useState(shuffleArray(questionObj.answer))
    console.log(shuffledAnswers)
    const questionData = _unescape(questionObj.question);

    function shuffleArray(array) {
        console.log(array)
        const shuffledArray = Object.values(array[0]).slice(0, 4); // Create a copy of the array
        for (let i = shuffledArray.length - 1; i >= 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));
            
            const iVal = shuffledArray[i]
            
            const jVal = shuffledArray[j]
            
            shuffledArray[i] = jVal
            shuffledArray[j] = iVal
            
        }
        console.log(shuffledArray)
        return shuffledArray;
    }


    // Make sure the correct answer is not always the last one
    // const correctAnswer = questionObj.answer[0].correct
    // if (correctAnswer) {
    //     const correctAnswerIndex = shuffledAnswers.indexOf(correctAnswer);

        // if (correctAnswerIndex !== shuffledAnswers.length - 1) {
        //     [shuffledAnswers[correctAnswerIndex], shuffledAnswers[shuffledAnswers.length - 1]] = [shuffledAnswers[shuffledAnswers.length - 1], shuffledAnswers[correctAnswerIndex]];
        // }
    // }

    const mappedAnswers = shuffledAnswers.map((answer) => (
        
            <li
                disabled={selectedAnswer !== null} // Disable if an answer is selected
                style={{
                    backgroundColor: selectedAnswer === answer ? (isCorrect ? 'green' : 'red') : ''
                }}
                onClick={() => handleCorrectAnswer(answer)}
            >
                {answer}
            </li>
            

    ));

    function handleCorrectAnswer(chosenAnswer) {
        if (selectedAnswer !== null) {
            return; // Don't do anything if an answer has already been selected
        }
        
        if (questionObj.answer.find((answer) => answer.correct === chosenAnswer)) {
            setIsCorrect(true);
            console.log("I am correct!");
        } else {
            setIsCorrect(false);
            console.log("I am wrong!");
        }
        setSelectedAnswer(chosenAnswer);
    }

    const handleTimeUp = () => {
        // Handle the case when the time is up
    }

    return (
        <div>
            <div className='questions-display'>
                <QuizTimer duration={45} handleTimeUp={handleTimeUp} />
                <h5>Difficulty: {questionObj.difficulty}</h5> <br/>
                <h3>{parse(questionData)}</h3> <br/>
                <ul className='answers-display'>
                {mappedAnswers}
                </ul>
            </div>
        </div>
    );
}

export default QuizCard;



// import React, { useState } from 'react';
// import _unescape from "underscore/modules/unescape.js";
// import parse from "html-react-parser";
// import QuizTimer from './QuizTimer';
// import { Navigate, useNavigate } from 'react-router-dom';

// function QuizCard({ questionObj }) {
//     const navigate = useNavigate();

//     const [isCorrect, setIsCorrect] = useState(false);
//     const [selectedAnswer, setSelectedAnswer] = useState(null);
//     const [result, setResult] = useState({ 
//         score: 0, 
//         correctAnswers: 0,
//         wrongAnswers: 0,
//     });

//     const questionData = _unescape(questionObj.question);

//     function shuffleArray(array) {
//         const shuffledArray = [...array]; // Create a copy of the array
//         for (let i = shuffledArray.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
//         }
//         return shuffledArray;
//     }

//     const shuffledAnswers = shuffleArray(questionObj.answer);

//     const mappedAnswers = shuffledAnswers.map((answer) => (
//         <ul className='answers-display' key={answer.id}>
//             <li
//                 disabled={selectedAnswer !== null} // Disable if an answer is selected
//                 style={{
//                     backgroundColor: selectedAnswer === answer.answer1 ? (isCorrect ? 'green' : 'red') : ''
//                 }}
//                 onClick={() => handleCorrectAnswer(answer.answer1)}
//             >
//                 {answer.answer1}
//             </li>
//             <li
//                 disabled={selectedAnswer !== null} // Disable if an answer is selected
//                 style={{
//                     backgroundColor: selectedAnswer === answer.answer2 ? (isCorrect ? 'green' : 'red') : ''
//                 }}
//                 onClick={() => handleCorrectAnswer(answer.answer2)}
//             >
//                 {answer.answer2}
//             </li>
//             <li
//                 disabled={selectedAnswer !== null} // Disable if an answer is selected
//                 style={{
//                     backgroundColor: selectedAnswer === answer.answer3 ? (isCorrect ? 'green' : 'red') : ''
//                 }}
//                 onClick={() => handleCorrectAnswer(answer.answer3)}
//             >
//                 {answer.answer3}
//             </li>
//             <li
//                 disabled={selectedAnswer !== null} // Disable if an answer is selected
//                 style={{
//                     backgroundColor: selectedAnswer === answer.answer4 ? (isCorrect ? 'green' : 'red') : ''
//                 }}
//                 onClick={() => handleCorrectAnswer(answer.answer4)}
//             >
//                 {answer.answer4}
//             </li>
//         </ul>
//     ));

//     function handleCorrectAnswer(chosenAnswer) {
//         if (selectedAnswer !== null) {
//             return; // Don't do anything if an answer has already been selected
//         }
        
//         if (questionObj.answer.find((answer) => answer.correct === chosenAnswer)) {
//             setIsCorrect(true);
//             console.log("I am correct!");
//         } else {
//             setIsCorrect(false);
//             console.log("I am wrong!");
//         }
//         setSelectedAnswer(chosenAnswer);
//     }

//     const handleTimeUp = () => {
//         // Handle the case when the time is up
//     }

//     return (
//         <div>
//             <div className='questions-display'>
//                 <QuizTimer duration={45} handleTimeUp={handleTimeUp} />
//                 <h5>Difficulty: {questionObj.difficulty}</h5> <br/>
//                 <h3>{parse(questionData)}</h3> <br/>
//                 {mappedAnswers}
//             </div>
//         </div>
//     );
// }

// export default QuizCard;

