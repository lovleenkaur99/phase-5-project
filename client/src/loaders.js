export async function getQuiz({params}) {
    const questionsResponse = await fetch(`http://localhost:5555/api/v1/questions${params.id}`)
    const allQuestions = await questionsResponse.json()

    const answerResponse = await fetch(`http://localhost:5555/api/v1/answers${params.id}`)
    const allAnswers = await answerResponse.json()
    
    return { allQuestions, allAnswers }
}

export async function getPlayers() { 
    const answerResponse = await fetch('http://localhost:5555/api/v1/players')
    const allplayers = await answerResponse.json()

    return {allplayers}
} 

export async function getScores() { 
    const answerResponse = await fetch('http://localhost:5555/api/v1/scores')
    const allScores = await answerResponse.json()

    return {allScores}
} 




