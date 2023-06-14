import React, { useEffect, useState } from 'react'
import axios from 'axios';
import he from 'he';

export default function Quiz(props) {

    const [quizData, setQuizData] = useState();
    const [formData, setFormData] = useState({
        0: "",
        1: "",
        2: "",
        3: "",
        4: ""
    });
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState(0);


    console.log(formData)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple');
                setQuizData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData()

    }, [])

    function randomiseArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
        //HOW TO CHECK FOR CORRECT ANSWER OR NOT
        let count = 0;
        for (let i = 0; i < 5; i++) {
            if (quizData.results[i].correct_answer === formData[i]) {
                count++;
            }
                
            console.log(quizData.results[i].correct_answer, "CORRECT ANSWER")
            console.log(formData[i], "PLAYER ANSWER")
        }
        console.log(count)
        setCorrectAnswers(count)
        console.log(correctAnswers, "correctAnswers")


    }

    const stateObjectLength = Object.keys(quizQuestions).length;

    if (quizData && stateObjectLength < 5) {

        quizData.results.map((question, questionIndex) => {

            const title = question.question

            let answersArray = []

            for (let i = 0; i < 3; i++) {
                const answer = he.decode(question.incorrect_answers[i])
                answersArray.push(answer)
            }

            answersArray.push(he.decode(question.correct_answer))

            let randomisedArray = randomiseArray(answersArray)

            setQuizQuestions((prev) => {
                return [
                    ...prev,
                    { title: title, answers: randomisedArray }
                ]
            })
        })

    }


    const questionsFormatted = quizQuestions.map((question, questionIndex) => {
        return (
            <>
                <h2>{he.decode(question.title)}</h2>

                {question.answers.map((answer) => {
                    return (
                        <>
                            <input
                                type="radio"
                                id={answer}
                                name={questionIndex}
                                value={answer}
                                checked={formData[questionIndex] === { answer }}
                                onChange={handleChange}
                            />
                            <label htmlFor={answer}>{answer}</label>
                        </>
                    )
                })}

            </>
        )
    })

    function handleCheckAnswers(e) {
        e.preventDefault()


    }


    return (
        <>
            <form>
                {questionsFormatted}
                <button type="submit" onClick={(e) => handleCheckAnswers(e)}>Check Answers</button>
            </form >
            <div>You have {correctAnswers}/5 correct!</div>
            <button onClick={props.toggleQuiz}>Go Back</button>



        </>
    )

}



// TO DO 
//- Style the quiz
//- When answer is selected, style the button as selected
//- When the 'check answers' button is selected, style buttons accordingly
//- Learn about React Testing