import { easeIn, easeInOut, motion } from "motion/react";

function QuizTopicBtn({ name, onClick }) {
    const path = name.toLowerCase().replaceAll(" ", "_")

    return (
      <motion.button
        type="button"
        className="quiz-topic-card"
        onClick={onClick}
        whileHover={{ scale: 1.07 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        <img
          className="quiz-topic-img"
          src={`/src/assets/icons/${path}.png`}
          alt={`${path}.png`}
        ></img>
        <h2> {name} </h2>
      </motion.button>
    );
}

export default QuizTopicBtn;
