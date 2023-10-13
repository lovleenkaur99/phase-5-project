export async function getQuiz() {
    const questionsResponse = await fetch('http://localhost:5555/api/v1/questions')
    const allQuestions = await questionsResponse.json()

    const answerResponse = await fetch('http://localhost:5555/api/v1/answers')
    const allAnswers = await answerResponse.json()
    


    return { allQuestions, allAnswers }
}


// export async function getAnswers() { 

//     console.log(allAnswers)

//     return {allAnswers}
// }

// export async function getQuiz(){

//     const allAnswers = await getAnswers()
//     const allQuestions = await getQuestions()

//     return {allAnswers, allQuestions}

// }

export async function getPlayers() { 
    const answerResponse = await fetch('http://localhost:5555/api/v1/players')
    const allplayers = await answerResponse.json()

    return {allplayers}
}

