import { useState } from 'react'
import { easeIn, easeInOut, motion } from "motion/react";

function Question({ index, questions, onAnswer }) {
  const question = questions[index]
  const [userAnswer, setUserAnswer] = useState('')

  function handleAnswer(answer) {
    setUserAnswer(answer)
    let isCorrect =  false
    if (answer == question.answer) {
      isCorrect = true
    }
    onAnswer([ answer, question.answer ])
  }

  if (question.type == "multiple_choice") {
    return (
      <div>
        <h2 className="question"> {index + 1}. {question.question} </h2>
        <div className="question-choices-container">
          {question.options.map((option) => (
            <motion.button
              key={option}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.97, y: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              type="button"
              className= { userAnswer == option ? "selected" : "unselected"}
              onClick={() => handleAnswer(option)}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </div>
    );
  } else if (question.type == "true_false") {
    return (
      <div>
        <h2 className="question"> {index + 1}. {question.question} </h2>
        <div className="question-choices-container">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.97, y: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className={ userAnswer == "True" ? "selected" : "unselected"}
            onClick={() => handleAnswer("True")}
          >
            True
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.97, y: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className={ userAnswer == "False" ? "selected" : "unselected"}
            onClick={() => handleAnswer("False")}
          >
            False
          </motion.button>
        </div>
      </div>
    );
  } else if (question.type == "input") {
    return (
      <div>
        <h2 className="question"> {index + 1}. {question.question} </h2>
          <input
            type="text"
            value={userAnswer}
            onChange={(event) => handleAnswer(event.target.value)}
          />
      </div>
    );
  } else {
    return (
      <div>
        <h2 className="question"> {index + 1}. {question.question} </h2>
      </div>
    );
  }
}

export default Question;
