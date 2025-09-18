import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  RotateCcw,
  Trophy,
  Target,
  Star,
} from "lucide-react";
import quizData from "../data/quiz.json";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface Quiz {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

const QuizComponent: React.FC = () => {
  const [quizzes] = useState<Quiz[]>(quizData.quizzes);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const BATCH_SIZE = 10;
  const TOTAL_QUESTIONS = quizzes[0]?.questions.length || 0;
  const TOTAL_BATCHES = Math.ceil(TOTAL_QUESTIONS / BATCH_SIZE);

  const getBatchIndex = () => {
    const stored = localStorage.getItem("quizBatchIndex");
    return stored ? parseInt(stored, 10) : 0;
  };
  const [batchIndex, setBatchIndex] = useState(getBatchIndex());
  React.useEffect(() => {
    localStorage.setItem("quizBatchIndex", batchIndex.toString());
  }, [batchIndex]);

  const startQuiz = (quiz: Quiz) => {
    const startIdx = batchIndex * BATCH_SIZE;
    const endIdx = Math.min(startIdx + BATCH_SIZE, quiz.questions.length);
    const batchQuestions = quiz.questions.slice(startIdx, endIdx);

    const shuffled = [...batchQuestions].sort(() => Math.random() - 0.5);
    setActiveQuiz(quiz);
    setShuffledQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowResult(false);
    setQuizCompleted(false);
    setSelectedAnswer(null);
  };

  const selectAnswer = (answerIndex: number) => {
    if (!showResult) {
      setSelectedAnswer(answerIndex);
    }
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;

    setShowResult(true);
    const newAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestionIndex < shuffledQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
      }
    }, 3000);
  };

  const restartQuiz = () => {
    if (activeQuiz) {
      let nextBatch = batchIndex + 1;
      if (nextBatch >= TOTAL_BATCHES) nextBatch = 0;
      setBatchIndex(nextBatch);
      startQuiz(activeQuiz);
    }
  };

  const goBackToQuizzes = () => {
    setActiveQuiz(null);
    setQuizCompleted(false);

    let nextBatch = batchIndex + 1;
    if (nextBatch >= TOTAL_BATCHES) nextBatch = 0;
    setBatchIndex(nextBatch);
  };

  const calculateScore = () => {
    return userAnswers.reduce((score, answer, index) => {
      return score + (answer === shuffledQuestions[index]?.correct ? 1 : 0);
    }, 0);
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return "Excellent! You have mastered this material.";
    if (percentage >= 80) return "Great job! You have a strong understanding.";
    if (percentage >= 70)
      return "Good work! Keep practicing to improve further.";
    if (percentage >= 60) return "Not bad! Review the material and try again.";
    return "Keep studying! Practice makes perfect.";
  };

  if (quizCompleted && activeQuiz) {
    const score = calculateScore();
    const percentage = Math.round((score / shuffledQuestions.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-8 text-center border border-gray-700">
            <div className="mb-8">
              <Trophy
                className={`h-16 w-16 mx-auto mb-4 ${getScoreColor(
                  percentage
                )}`}
              />
              <h1 className="text-3xl font-bold text-white mb-2">
                Quiz Completed!
              </h1>
              <h2 className="text-xl text-gray-300 mb-6">{activeQuiz.title}</h2>
            </div>

            <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-8 mb-8 border border-gray-600">
              <div className="text-5xl font-bold text-white mb-2">
                {score}/{shuffledQuestions.length}
              </div>
              <div
                className={`text-2xl font-semibold mb-4 ${getScoreColor(
                  percentage
                )}`}
              >
                {percentage}%
              </div>
              <p className="text-gray-300 text-lg">
                {getScoreMessage(percentage)}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                Review Your Answers
              </h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {shuffledQuestions.map((question, index) => {
                  const userAnswer = userAnswers[index];
                  const isCorrect = userAnswer === question.correct;

                  return (
                    <div
                      key={question.id}
                      className={`p-4 rounded-lg border-2 text-left ${
                        isCorrect
                          ? "bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border-emerald-400"
                          : "bg-gradient-to-r from-red-900/30 to-pink-900/30 border-red-400"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-emerald-400 mt-1 flex-shrink-0" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-white mb-2">
                            {index + 1}. {question.question}
                          </p>
                          <p className="text-sm text-gray-300 mb-1">
                            Your answer: {question.options[userAnswer]}
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-emerald-400 mb-2">
                              Correct answer:{" "}
                              {question.options[question.correct]}
                            </p>
                          )}
                          <p className="text-sm text-gray-300 italic">
                            {question.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={restartQuiz}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
              >
                <RotateCcw className="h-5 w-5" />
                <span>Try Again</span>
              </button>
              <button
                onClick={goBackToQuizzes}
                className="border-2 border-gray-600 text-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200"
              >
                Back to Quizzes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeQuiz) {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const progress =
      ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-700">
            <div className="bg-gray-700 h-2">
              <div
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {activeQuiz.title}
                  </h1>
                  <p className="text-gray-300">
                    Question {currentQuestionIndex + 1} of{" "}
                    {shuffledQuestions.length}
                  </p>
                </div>
                <button
                  onClick={goBackToQuizzes}
                  className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
                >
                  Exit Quiz
                </button>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-medium text-white mb-6">
                  {currentQuestion.question}
                </h2>

                <div className="space-y-4">
                  {currentQuestion.options.map((option, index) => (
                    <label
                      key={index}
                      className={`block p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        selectedAnswer === index
                          ? showResult
                            ? index === currentQuestion.correct
                              ? "bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border-emerald-400 text-emerald-100"
                              : "bg-gradient-to-r from-red-900/50 to-pink-900/50 border-red-400 text-red-100"
                            : "bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-400 text-purple-100"
                          : showResult && index === currentQuestion.correct
                          ? "bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border-emerald-400 text-emerald-100"
                          : "bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
                      }`}
                    >
                      <input
                        type="radio"
                        name="answer"
                        value={index}
                        checked={selectedAnswer === index}
                        onChange={() => selectAnswer(index)}
                        disabled={showResult}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-lg">{option}</span>
                        {showResult && (
                          <div>
                            {index === currentQuestion.correct && (
                              <CheckCircle className="h-6 w-6 text-emerald-400" />
                            )}
                            {selectedAnswer === index &&
                              index !== currentQuestion.correct && (
                                <XCircle className="h-6 w-6 text-red-400" />
                              )}
                          </div>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {!showResult ? (
                <button
                  onClick={submitAnswer}
                  disabled={selectedAnswer === null}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-8 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
                >
                  Submit Answer
                </button>
              ) : (
                <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
                  <div
                    className={`flex items-center space-x-2 mb-4 ${
                      selectedAnswer === currentQuestion.correct
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {selectedAnswer === currentQuestion.correct ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <XCircle className="h-6 w-6" />
                    )}
                    <span className="text-xl font-semibold">
                      {selectedAnswer === currentQuestion.correct
                        ? "Correct!"
                        : "Incorrect"}
                    </span>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            WordBridge Quizzes
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Test your language knowledge with WordBridge interactive quizzes.
            Get immediate feedback and detailed explanations to help you learn
            from your mistakes.
          </p>
        </div>

        <div className="grid gap-8">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-8 border border-gray-700 hover:shadow-2xl hover:border-purple-500/50 transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-3">
                    {quiz.title}
                  </h2>
                  <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                    {quiz.description}
                  </p>

                  <div className="flex items-center space-x-6 mb-6">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Target className="h-5 w-5" />
                      <span>{quiz.questions.length} questions</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Star className="h-5 w-5" />
                      <span>Multiple choice</span>
                    </div>
                  </div>

                  <button
                    onClick={() => startQuiz(quiz)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
                  >
                    <span>Start Quiz</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;
