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


    console.log(quizData)
    console.log(formData)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://opentdb.com/api.php?amount=5&type=multiple');
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

    //SELECTING AN ANSWER
    function handleChange(event) {
        const { name, value } = event.target

        //UNSTYLING OLD ANSWER
        if (formData[name] != "") {
            document.getElementById(formData[name].split(" ").join("") + 'Label').className = 'quizAnswerLabel'
        }

        //STYLING NEW ANSWER AS SELECTED
        document.getElementById(value.split(" ").join("") + 'Label').className = 'quizAnswerLabelSelected'

        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
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
                <h2 id={he.decode(question.title.split(" ").join(""))}>{he.decode(question.title)}</h2>

                {question.answers.map((answer) => {
                    return (
                        <>
                            <input
                                type="radio"
                                id={answer}
                                className='quizAnswer'
                                name={questionIndex}
                                value={answer}
                                checked={formData[questionIndex] === { answer }}
                                onChange={handleChange}
                            />
                            <label
                                id={he.decode(answer.split(" ").join("")) + 'Label'}
                                htmlFor={answer}
                                className='quizAnswerLabel'>
                                {answer}
                            </label>
                        </>
                    )
                })}

            </>
        )
    })

    function handleCheckAnswers(e) {
        e.preventDefault()

        //CHECKING QUESTIONS AND ANSWERS
        let count = 0;
        for (let i = 0; i < 5; i++) {
            if (formData[i] != "") {
                document.getElementById(he.decode(quizQuestions[i].title.split(" ").join(""))).style.color = '#293264'
                if (he.decode(quizData.results[i].correct_answer) === formData[i]) {

                    document.getElementById(formData[i].split(" ").join("") + 'Label').className = 'quizAnswerLabelCorrect'
                    count++;

                } else if (he.decode(quizData.results[i].correct_answer) !== formData[i]) {

                    document.getElementById(he.decode(quizData.results[i].correct_answer).split(" ").join("") + 'Label').className = 'quizAnswerLabelCorrect'
                    document.getElementById(formData[i].split(" ").join("") + 'Label').className = 'quizAnswerLabelIncorrect'
                }

            } else {

                document.getElementById(he.decode(quizQuestions[i].title.split(" ").join(""))).style.color = 'red'

            }

        }

        setCorrectAnswers(count)

    }


    return (
        <>
            <form>
                {questionsFormatted}
                <div id='formButtonAndResultsContainer'>
                    <button className='quizCheckAnswersButton' type="submit" onClick={(e) => handleCheckAnswers(e)}>Check Answers</button>
                    <div id='quizResults'>You have {correctAnswers}/5 correct!</div>
                    <button className='quizGoBackButton' onClick={props.toggleQuiz}>Go Back</button>
                </div>
            </form >




        </>
    )

}


// TO DO
//- Style the quiz
//- When the 'check answers' button is selected, style buttons accordingly and make them unselectable
//- Learn about React Testing