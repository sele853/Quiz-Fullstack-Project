import React, { useEffect, useState } from "react";
import quizData from "./assets/quizData";
import "./index.css";
import Question from "./Question";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft > 0 && !showScore && !selectedOptions[currentQuestion]) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !selectedOptions[currentQuestion]) {
      handleNextQuestion();
    }
  }, [timeLeft, currentQuestion, showScore, selectedOptions]);

  const handleAnswerClick = (option) => {
    setSelectedOptions({ ...selectedOptions, [currentQuestion]: option });
  };

  const handleNextQuestion = () => {
    if (selectedOptions[currentQuestion] === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
      setTimeLeft(60);
    } else {
      setShowScore(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setTimeLeft(60);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOptions({});
    setTimeLeft(60);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {showScore ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              You scored {score} out of {quizData.length}!
            </h2>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={restartQuiz}
            >
              Restart Quiz
            </button>
          </div>
        ) : (
           <Question
            question={quizData[currentQuestion]}
            currentQuestionIndex={currentQuestion}
            totalQuestions={quizData.length}
            timeLeft={timeLeft}
            selectedOption={selectedOptions[currentQuestion]}
            handleAnswerClick={handleAnswerClick}
            handlePreviousQuestion={handlePreviousQuestion}
            handleNextQuestion={handleNextQuestion}
            score={score}
          />
        )}
      </div>
    </div>
  );
}

export default App;
