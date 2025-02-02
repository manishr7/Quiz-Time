import React, { useState } from "react";
import { fetchQuizData } from "../api/index";
import Question from "./Question";
import Result from "./Result";
import ProgressBar from "./ProgressBar";
import Loader from "../loader/Loader.gif";


const Quiz = () => {
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);

  const startQuiz = async () => {
    setQuizStarted(true);
    setLoading(true);
    setError(null);

    try {
      const data = await fetchQuizData();
      if (data) {
        setQuizData(data);
      } else {
        setError("No quiz data found.");
      }
    } catch (err) {
      setError("Error loading quiz data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (isCorrect, chosenOption, questionIndex) => {
    setScore((prevScore) => (isCorrect ? prevScore + 4 : prevScore - 1));
    setUserAnswers((prev) => [
      ...prev,
      { chosenOption, isCorrect, questionIndex },
    ]);
    if (
      quizData &&
      quizData.questions &&
      currentQuestionIndex < quizData.questions.length - 1
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  if (!quizStarted) {
    return (
      <div className="flex flex-col justify-start py-8 md:py-20 items-center h-screen">
        <h1 class="mb-20 sm:mb-12 md:mb-20  font-extrabold leading-none tracking-tight text-gray-900 text-2xl sm:text-3xl md:text-5xl lg:text-6xl dark:text-white">
          Welcome to the{" "}
          <span class="text-blue-600 dark:text-blue-500">testline quiz !</span>
        </h1>
        <button
          onClick={startQuiz}
          className="px-4 py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 bg-indigo-600 text-white text-xl md:text-lg  font-semibold rounded-lg shadow-md transition transform hover:scale-110 hover:bg-indigo-700"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={Loader} alt="Loading..." className="w-36 h-36" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-lg font-semibold text-red-600">
        Error: {error}
      </div>
    );
  }

  if (!quizData || !quizData.questions || quizData.questions.length === 0) {
    return (
      <div className="text-center text-lg font-semibold">
        No quiz data available.
      </div>
    );
  }

  if (showResult) {
    return (
      <Result
        score={score}
        total={quizData.questions.length * 4}
        quizData={quizData}
        userAnswers={userAnswers}
      />
    );
  }

  return (
    <div className="w-[50rem] min-h-screen h-fit rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 mx-auto my-auto p-10 shadow-xl border-4 border-indigo-700">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-extrabold text-white leading-tight">
          The Molecular Basis of Inheritance
        </h1>
        <div className="mt-4 text-lg text-white font-medium">
          <p className="mb-1">Correct Answer: +4 marks</p>
          <p className="mb-1">Incorrect Answer: -1 mark</p>
          <p>Total Questions: {quizData.questions.length}</p>
        </div>
      </div>

      <ProgressBar
        current={currentQuestionIndex}
        total={quizData.questions.length}
      />
      <div className="mt-6">
        <Question
          data={quizData.questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
          index={currentQuestionIndex}
        />
      </div>
    </div>
  );
};

export default Quiz;
