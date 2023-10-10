export async function getQuestions() {
    const questionsResponse = await fetch('http://localhost:5555/questions')
    const allQuestions = await questionsResponse.json()

    return { allQuestions }
}



