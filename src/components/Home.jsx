import React from 'react'


export default function Home(props) {

    
    return (
        <>
            <h1 className='homeTitle'>Quizzical</h1>
            <p className='homeDescription'>General knowledge quiz</p>
            <button className='homeStartQuizButton' onClick={props.toggleQuiz}>Start Quiz</button>
        </>
    )
}