import React, { useState, useEffect } from 'react';
import _unescape from "underscore/modules/unescape.js";
import parse from "html-react-parser";
import QuizTimer from './QuizTimer';
import { useNavigate } from 'react-router-dom';

function QuizCard({ questionObj }) {
    const navigate = useNavigate();

    const [isCorrect, setIsCorrect] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [result, setResult] = useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
    });
    const [shuffledAnswers, setShuffledAnswers] = useState(shuffleArray(questionObj.answer));
    const [gameOver, setGameOver] = useState(false);
    const questionData = _unescape(questionObj.question);

    function shuffleArray(array) {
        const shuffledArray = Object.values(array[0]).slice(0, 4);
        for (let i = shuffledArray.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const iVal = shuffledArray[i];
            const jVal = shuffledArray[j];
            shuffledArray[i] = jVal;
            shuffledArray[j] = iVal;
        }
        return shuffledArray;
    }

    const mappedAnswers = shuffledAnswers.map((answer) => (
        <li
            key={answer}
            disabled={selectedAnswer !== null}
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
            return;
        }

        const isAnswerCorrect = questionObj.answer.find((answer) => answer.correct === chosenAnswer);

        if (isAnswerCorrect) {
            setIsCorrect(true);
            setResult((prevResult) => ({
                ...prevResult,
                score: Math.min(prevResult.score + 5, 25),
                correctAnswers: prevResult.correctAnswers + 1,
            }));
            console.log("I am correct!");
        } else {
            setIsCorrect(false);
            setResult((prevResult) => ({
                ...prevResult,
                wrongAnswers: prevResult.wrongAnswers + 1,
            }));
            console.log("I am wrong!");
        }

        setSelectedAnswer(chosenAnswer);
    }

    const handleTimeUp = () => {
        setGameOver(true);
    }

    useEffect(() => {
        if (gameOver) {
            // Navigate to the next page or do any other cleanup actions
            navigate('/score', { state: { result } });
        }
    }, [gameOver, navigate, result]);

    return (
        <div>
            <div className='questions-display'>
                <QuizTimer duration={30} handleTimeUp={handleTimeUp} />
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




// import React, { useState, useEffect } from 'react';
// import _unescape from "underscore/modules/unescape.js";
// import parse from "html-react-parser";
// import QuizTimer from './QuizTimer';
// import { useNavigate } from 'react-router-dom';

// function QuizCard({ questionObj }) {
//     const navigate = useNavigate();

//     const [isCorrect, setIsCorrect] = useState(false);
//     const [selectedAnswer, setSelectedAnswer] = useState(null);
//     const [result, setResult] = useState({
//         score: 0,
//         correctAnswers: 0,
//         wrongAnswers: 0,
//     });
//     const [shuffledAnswers, setShuffledAnswers] = useState(shuffleArray(questionObj.answer));
//     const [gameOver, setGameOver] = useState(false);
//     const questionData = _unescape(questionObj.question);

//     function shuffleArray(array) {
//         const shuffledArray = Object.values(array[0]).slice(0, 4);
//         for (let i = shuffledArray.length - 1; i >= 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             const iVal = shuffledArray[i];
//             const jVal = shuffledArray[j];
//             shuffledArray[i] = jVal;
//             shuffledArray[j] = iVal;
//         }
//         return shuffledArray;
//     }

//     const mappedAnswers = shuffledAnswers.map((answer) => (
//         <li
//             key={answer}
//             disabled={selectedAnswer !== null}
//             style={{
//                 backgroundColor: selectedAnswer === answer ? (isCorrect ? 'green' : 'red') : ''
//             }}
//             onClick={() => handleCorrectAnswer(answer)}
//         >
//             {answer}
//         </li>
//     ));

//     function handleCorrectAnswer(chosenAnswer) {
//         if (selectedAnswer !== null) {
//             return;
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
//         setGameOver(true);
//     }

//     useEffect(() => {
//         if (gameOver) {
//             // Navigate to the next page or do any other cleanup actions
//             navigate('/next-page');
//         }
//     }, [gameOver, navigate]);

//     return (
//         <div>
//             <div className='questions-display'>
//                 <QuizTimer duration={35} handleTimeUp={handleTimeUp} />
//                 <h5>Difficulty: {questionObj.difficulty}</h5> <br/>
//                 <h3>{parse(questionData)}</h3> <br/>
//                 <ul className='answers-display'>
//                     {mappedAnswers}
//                 </ul>
//             </div>
//         </div>
//     );
// }

// export default QuizCard;









