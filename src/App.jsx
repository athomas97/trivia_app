import './App.css'
import { useState } from 'react'
import { easeIn, easeInOut, motion } from "motion/react";

import questions from './assets/questions.json'

import Timer from './components/Timer'
import Question from './components/Question'
import QuizTopicBtn from './components/QuizTopicBtn'
import LightBorder from './components/LightBorder'

function App() {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [quizSelected, setQuizSelected] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)

  let question_set = []

  function handleAnswer(answer) {
    const userAnswer = answer[0]
    const realAnswer = answer[1]
    setUserAnswer(userAnswer)
    setIsCorrect(userAnswer === realAnswer)
  }

  function handleNext() {
    // Update the score
    if (isCorrect) {
      setScore((currentScore) => currentScore + 1)
    }
    // Move to next question or end game
    if (index + 1 >= question_set.length) {
      setIsGameOver(true)
    } else {
      setIndex((currentIndex) => currentIndex + 1)
      setUserAnswer('')
      setIsCorrect(false)
    }
  }

  function startNewGame() {
    setQuizSelected('')
    setIndex(0)
    setScore(0)
    setUserAnswer('')
    setIsCorrect(false)
    setIsGameOver(false)
  }

  if (isGameOver) {
    // Load Questions
    question_set =
    questions.find((quiz) => quiz.quiz_name === quizSelected)?.content ?? []
    // Render page
    return (
      <section id="center">
        <h1 data-text={`Game Over!`}>Game Over!</h1>
        <p>Your final score is: {score} out of {question_set.length}</p>
        <button
            type="button"
            className="next_btn"
            onClick={startNewGame}
          >
            Play Another Quiz
          </button>
          <div
            className="gradient-bubble top-left" 
            style={{opacity: `0.5`}}
          ></div>
          <div
            className="gradient-bubble bottom-right"
            style={{opacity: `0.7`,}}
          ></div>
      </section>
    )

  } else if (quizSelected) {
    // Load Questions
    question_set =
    questions.find((quiz) => quiz.quiz_name === quizSelected)?.content ?? []
    // Render page
    return (
      <section id="center">
        <h1 data-text={`${quizSelected}!`}> {quizSelected}! </h1>
        <motion.div className="game-container">
          <Question
            key={index}
            index={index}
            questions={question_set}
            onAnswer={handleAnswer}
          />
          <button
            type="button"
            className={userAnswer ? 'next_btn' : 'next_btn disabled'}
            disabled={!userAnswer}
            onClick={handleNext}
          >
            Next
          </button>
        </motion.div>
        <Timer key={index} onTimeUp={handleNext} />
        <p> Score: {score} </p>
        <div
          className="gradient-bubble top-left" 
          style={{opacity: `0.5`}}
        ></div>
        <div
          className="gradient-bubble bottom-right"
          style={{opacity: `0.7`,}}
        ></div>
      </section>
    )

  } else if (!quizSelected) {
    // Get quiz names
    const quizFileNames = questions.map((quiz) => quiz.quiz_name)
    // Render page
    return (
      // <div id="quiz-select-pg">
        // <LightBorder />
        <section id="center">
          <motion.h1
            data-text={`Select a quiz!`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            Select a quiz!
          </motion.h1>
          <div
            className="quiz-topics-container"
          >
            {quizFileNames.map((fileName) => (
              <QuizTopicBtn
                key={fileName}
                name={fileName}
                onClick={() => setQuizSelected(fileName)}
              />
            ))}
          </div>
          <div
            className="gradient-bubble top-left" 
            style={{opacity: `0.5`}}
          ></div>
          <div
            className="gradient-bubble bottom-right"
            style={{opacity: `0.7`,}}
          ></div>
        </section>
        // <LightBorder />
      // </div>
    )
  }
}

export default App
