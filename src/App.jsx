import React, { useEffect, useState } from "react";
import { questions } from "./constant/questions";
import "./App.css";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState({});
  const [score, setScore] = useState(null);
  const [quizStart, setQuizStart] = useState(false);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    let interval;
    if (quizStart && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            if (currentQuestion === questions.length - 1) {
              handleSubmit();
            } else {
              handleNext();
            }
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizStart, timer]);

  const handleOptions = (index) => {
    setSelectedOption((prevSelectedOption) => ({
      ...prevSelectedOption,
      [currentQuestion]: index,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimer(30);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestion((prev) => prev - 1);
    setTimer(30);
  };

  const handleSubmit = () => {
    let finalScore = 0;
    questions.forEach((question, index) => {
      if (selectedOption[index] === question.correctIndex) {
        finalScore++;
      }
    });
    setScore(finalScore);
  };

  const startQuiz = () => {
    setQuizStart(!quizStart);
  };

  return (
    <div className="container">
      {!quizStart ? (
        <div className="home">
          <h1>Welcome to the Quiz!</h1>
          <button className="start-button" onClick={startQuiz}>
            Start Quiz
          </button>
        </div>
      ) : score === null ? (
        <div className="quiz-box">
          <h2>
            Question {currentQuestion + 1} of {questions.length}
          </h2>
          <h2>{questions[currentQuestion].question}</h2>
          <h3>
            Time left: <span className="timer">{timer} seconds</span>
          </h3>
          <div>
            {questions[currentQuestion].options.map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={`quiz-${index}`}
                  name="question"
                  value={index}
                  checked={selectedOption[currentQuestion] === index}
                  onChange={() => handleOptions(index)}
                />
                <label htmlFor={`quiz-${index}`}>{option}</label>
              </div>
            ))}
          </div>

          <div>
            {currentQuestion > 0 && (
              <button className="navigation-button" onClick={handlePrevious}>
                Previous
              </button>
            )}
            {currentQuestion === questions.length - 1 ? (
              <button className="submit-button" onClick={handleSubmit}>
                Submit Quiz
              </button>
            ) : (
              <button className="navigation-button" onClick={handleNext}>
                Next
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="result">
          <h2>
            Your Score: {score} out of {questions.length}
          </h2>
        </div>
      )}
    </div>
  );
};

export default Quiz;
