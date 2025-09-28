import React from 'react';

function Question({ question, currentQuestionIndex, totalQuestions, timeLeft, selectedOption, handleAnswerClick, handlePreviousQuestion, handleNextQuestion,score }) {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-4">
          Question <span className='text-blue-500'>{currentQuestionIndex + 1}/{totalQuestions}</span>
        </h2>
        <span className="text-xl font-semibold mb-4">
          Time: <span className='text-red-500'>{timeLeft}</span>
        </span>
         <span className="text-lg font-semibold mb-4">
          Score: <span className='text-green-500'>{score}/{totalQuestions}</span>
        </span>
      </div>
      <p className="text-lg mb-6">{question.question}</p>
      <div className="grid gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`p-3 rounded text-left transition-transform duration-200 ease-in-out transform hover:scale-105 ${
              selectedOption
                ? option === question.answer
                  ? 'bg-green-500 text-white'
                  : selectedOption === option
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => handleAnswerClick(option)}
            disabled={selectedOption !== undefined}
          >
            {option}
          </button>
        ))}
      </div>
      <div
        className={`mt-4 ${
          currentQuestionIndex > 0 ? 'flex justify-between' : 'flex justify-end'
        }`}
      >
        {currentQuestionIndex > 0 && (
          <button
            onClick={handlePreviousQuestion}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-transform duration-200 ease-in-out transform hover:scale-105"
          >
            Previous
          </button>
        )}
        {selectedOption && (
          <button
            onClick={handleNextQuestion}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-transform duration-200 ease-in-out transform hover:scale-105"
          >
            Next
          </button>
        )}
      </div>
    </>
  );
}

export default Question;