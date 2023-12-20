import { useEffect, useState, useRef } from "react"


function QuizTimer({duration, handleTimeUp }){ 

    const [counter, setCounter] = useState(0)
    const [progress, setprogress] = useState(0)
    const [gameover, setGameOver] = useState(false)
    const counterRef = useRef()

    useEffect(() => { 
        counterRef.current = setInterval(() => { 
            setCounter((cur) => cur + 1 )
        }, 1000)

        return (() => clearInterval(counterRef.current))
    }, [])
    
    useEffect(() => { 
        setprogress(100 * (counter / duration))

        if (counter === duration) { 
            clearInterval(counterRef.current)
            setGameOver(true)

            setTimeout(() => { 
                handleTimeUp()
            }, 1000)
        }

    }, [counter])
    
    return ( 
        <div className="timer-display">
            <div className="progess" style={{
                width: `${progress}%`,
                backgroundColor: `${ 
                    progress < 40 
                    ? "green"
                    : progress > 70
                    ? "red"
                    : "orange"
                }`
            }}> 

            </div>
        </div>
    )
}

export default QuizTimer