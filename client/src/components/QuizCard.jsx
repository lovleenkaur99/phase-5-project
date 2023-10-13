import { useState } from "react"


function QuizCard({questionObj}){


    const [correctAnswer, setCorrectAnswer] = useState(false)


    
    return (
    <div>
        <h5>Difficulty: {questionObj.difficulty}</h5>
        <h3>{questionObj.question}</h3>

        <button >{questionObj.answer.answer1}</button>
        <button >{questionObj.answer.answer2}</button>
        <button >{questionObj.answer.answer3}</button>
        <button >{questionObj.answer.correct}</button>
    </div>
    )
    
}

export default QuizCard


// import React, { useState, useEffect } from 'react';

// function QuizCard({ questionObj, answerObj }) {
//     const [shuffledAnswers, setShuffledAnswers] = useState([]);
//     const [selectedAnswer, setSelectedAnswer] = useState(null);
//     const [isCorrect, setIsCorrect] = useState(null);

//   // Shuffle the answer choices when questionObj or answerObj changes
//     useEffect(() => {
//     const answers = [answerObj.answer1, answerObj.answer2, answerObj.answer3, answerObj.correct];
//     const shuffled = shuffleArray(answers);
//     setShuffledAnswers(shuffled);
//     }, [questionObj, answerObj]);

//     const shuffleArray = (array) => {
//         const shuffled = [...array];
//         for (let i = shuffled.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//     }
//     return shuffled;
//     };

//     const handleAnswerClick = (selected) => {
//     setSelectedAnswer(selected);
//     setIsCorrect(selected === answerObj.correct);
//     };
    
//     return (
//         <div>
//             <h5>Difficulty: {questionObj.difficulty}</h5>

//             <h3>{questionObj.question}</h3>
//             <ul>
//             {shuffledAnswers.map((answer, index) => (
//             <li key={index}>
//                 <button
//                 onClick={() => handleAnswerClick(answer)}
//                 style={{
//                     backgroundColor:
//                     selectedAnswer === answer
//                         ? isCorrect
//                         ? 'green'
//                         : 'red'
//                         : 'white',
//                 }}
//                 disabled={selectedAnswer !== null}
//                 >
//                 {answer}
//                 </button>
//             </li>
//             ))}
//             </ul>
//             {selectedAnswer !== null && (
//             <p>
//             {isCorrect ? 'Correct!' : 'Incorrect!'} The correct answer is{' '}
//             {answerObj.correct}.
//             </p>
//         )}
//         </div>
//     );
//     }

// export default QuizCard;




