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
    <div className='homeContentContainer'>
      {showQuiz
      ? <Quiz toggleQuiz={toggleQuiz} showQuiz={showQuiz} />
      : <Home toggleQuiz={toggleQuiz} />}
      <img src='https://images.pexels.com/photos/7130546/pexels-photo-7130546.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' />
    </div>
  );
}

export default App;
