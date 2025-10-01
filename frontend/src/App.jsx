import React, { useEffect, useState } from "react";
import axios from 'axios'
import "./index.css";
import Question from "./Question";
import Auth from "./components/Auth";

function App() {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timeLeft, setTimeLeft] = useState(60);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:5000/api/quizzes', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => setQuizzes(res.data[0]?.questions || []))
        .catch(err => console.error('Error fetching quizzes:', err));
    }
  }, [token]);

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
    if (selectedOptions[currentQuestion] === quizzes[currentQuestion]?.answer) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizzes.length) {
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

  const handleSkipQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizzes.length) {
      setCurrentQuestion(nextQuestion);
      setTimeLeft(60);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOptions({});
    setTimeLeft(60);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setQuizzes([]);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {!token ? (
        <Auth setToken={(token) => {
          localStorage.setItem('token', token);
          setToken(token);
        }} />
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="flex justify-end mb-4">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
          {quizzes.length === 0 ? (
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">Loading quizzes...</h2>
            </div>
          ) : showScore ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">
                You scored {score} out of {quizzes.length}!
              </h2>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-transform duration-200 ease-in-out transform hover:scale-105"
                onClick={restartQuiz}
              >
                Restart Quiz
              </button>
            </div>
          ) : (
            <Question
              question={quizzes[currentQuestion]}
              currentQuestionIndex={currentQuestion}
              totalQuestions={quizzes.length}
              timeLeft={timeLeft}
              selectedOption={selectedOptions[currentQuestion]}
              handleAnswerClick={handleAnswerClick}
              handlePreviousQuestion={handlePreviousQuestion}
              handleNextQuestion={handleNextQuestion}
              handleSkipQuestion={handleSkipQuestion}
              score={score}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;