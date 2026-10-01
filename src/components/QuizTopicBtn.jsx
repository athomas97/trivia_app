import { motion } from "motion/react";
import animationImage from "../assets/icons/animation.png";
import awardShowsImage from "../assets/icons/award_shows.png";
import guessThePriceImage from "../assets/icons/guess_the_price.png";
import historyImage from "../assets/icons/history.png";
import mathImage from "../assets/icons/math.png";
import oceanImage from "../assets/icons/ocean.png";

const topicImages = {
  animation: animationImage,
  award_shows: awardShowsImage,
  guess_the_price: guessThePriceImage,
  history: historyImage,
  math: mathImage,
  ocean: oceanImage,
};

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
          src={topicImages[path]}
          alt={`${name} quiz`}
        ></img>
        <h2> {name} </h2>
      </motion.button>
    );
}

export default QuizTopicBtn;
