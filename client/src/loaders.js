export async function getQuiz() {
    const questionsResponse = await fetch('http://localhost:5555/api/v1/questions')
    const allQuestions = await questionsResponse.json()

    const answerResponse = await fetch('http://localhost:5555/api/v1/answers')
    const allAnswers = await answerResponse.json()
    


    return { allQuestions, allAnswers }
}

// export async function getTrivia() { 
//     const answerResponse = await fetch('http://localhost:4000/trivia')
//     const allTrivia = await answerResponse.json()

//     return {allTrivia}
// } 
// export async function getTrivia() { 
//     const answerResponse = await fetch('https://opentdb.com/api.php?amount=10&category=31&type=multiple')
//     const allTrivia = await answerResponse.json()

//     return {allTrivia}
// } 




export async function getPlayers() { 
    const answerResponse = await fetch('http://localhost:5555/api/v1/players')
    const allplayers = await answerResponse.json()

    return {allplayers}
} 



