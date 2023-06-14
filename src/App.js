import './App.css';
import Home from './components/Home'
import Quiz from './components/Quiz'
import { useState } from 'react';

function App() {

  //Determines whether to show the Home page or the Quiz
  const [showQuiz, setShowQuiz] = useState(false)

  function toggleQuiz() {
    setShowQuiz((prevState) => !prevState)
  }


  return (

    //If showQuiz is set to true, the Quiz component is displayed
    showQuiz 
    ? <Quiz toggleQuiz={toggleQuiz} showQuiz={showQuiz} /> 
    : <Home toggleQuiz={toggleQuiz} />
  );
}

export default App;
