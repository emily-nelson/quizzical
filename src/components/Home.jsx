import React from 'react'


export default function Home(props) {

    
    return (
        <>
            <h1>Quizzical</h1>
            <p>General knowledge quiz</p>
            <button onClick={props.toggleQuiz}>Start Quiz</button>
        </>
    )
}