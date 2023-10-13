import { useEffect, useState, useRef } from "react"


function QuizTimer({duration, handleTimeUp }){ 

    const [counter, setCounter] = useState(0)
    const [progress, setprogress] = useState(0)
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

            setTimeout(() => { 
                handleTimeUp()
            }, 1000)
        }

    }, [counter])
    
    return ( 
        <div>
            <div style={{
                width: `${progress}%`,
                backgroundColor: `${ 
                    progress < 40 
                    ? "lightgreen"
                    : progress > 70
                    ? "orange"
                    : "red"
                }`
            }}> 

            </div>
        </div>
    )
}

export default QuizTimer