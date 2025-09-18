import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  RotateCcw,
  Lightbulb,
} from "lucide-react";
import grammarData from "../data/grammar.json";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface Lesson {
  id: number;
  title: string;
  explanation: string;
  examples: string[];
  rules: string[];
  questions: Question[];
}

const Grammar: React.FC = () => {
  const [lessons] = useState<Lesson[]>(grammarData.lessons);
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [showResults, setShowResults] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleLesson = (lessonId: number) => {
    setExpandedLesson(expandedLesson === lessonId ? null : lessonId);
  };

  const handleAnswerSelect = (
    lessonId: number,
    questionId: number,
    answerIndex: number
  ) => {
    const key = `${lessonId}-${questionId}`;
    setAnswers((prev) => ({ ...prev, [key]: answerIndex }));
  };

  const submitAnswer = (lessonId: number, questionId: number) => {
    const key = `${lessonId}-${questionId}`;
    setShowResults((prev) => ({ ...prev, [key]: true }));
  };

  const resetQuestion = (lessonId: number, questionId: number) => {
    const key = `${lessonId}-${questionId}`;
    setAnswers((prev) => {
      const newAnswers = { ...prev };
      delete newAnswers[key];
      return newAnswers;
    });
    setShowResults((prev) => {
      const newResults = { ...prev };
      delete newResults[key];
      return newResults;
    });
  };

  const isAnswerCorrect = (
    lessonId: number,
    questionId: number,
    answerIndex: number
  ) => {
    const lesson = lessons.find((l) => l.id === lessonId);
    const question = lesson?.questions.find((q) => q.id === questionId);
    return question ? question.correct === answerIndex : false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Grammar Lessons
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Master grammar with WordBridge: comprehensive lessons, clear
            explanations, and interactive practice questions.
          </p>
        </div>

        <div className="space-y-6">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg border border-gray-700 overflow-hidden hover:border-blue-500/50 transition-all duration-200"
            >
              <div
                className="p-6 cursor-pointer hover:bg-gray-700/50 transition-colors duration-200"
                onClick={() => toggleLesson(lesson.id)}
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">
                    {lesson.title}
                  </h2>
                  {expandedLesson === lesson.id ? (
                    <ChevronUp className="h-6 w-6 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-gray-400" />
                  )}
                </div>
              </div>

              {expandedLesson === lesson.id && (
                <div className="px-6 pb-6 border-t border-gray-700">
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                      <Lightbulb className="h-5 w-5 text-yellow-400" />
                      <span>Explanation</span>
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {lesson.explanation}
                    </p>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Examples
                    </h3>
                    <div className="space-y-3">
                      {lesson.examples.map((example, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border-l-4 border-blue-400 p-4 rounded-r-lg"
                        >
                          <p className="text-blue-100 italic">"{example}"</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Key Rules
                    </h3>
                    <ul className="space-y-2">
                      {lesson.rules.map((rule, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-6">
                      Practice Questions
                    </h3>
                    <div className="space-y-8">
                      {lesson.questions.map((question) => {
                        const answerKey = `${lesson.id}-${question.id}`;
                        const userAnswer = answers[answerKey];
                        const showResult = showResults[answerKey];
                        const isCorrect =
                          userAnswer !== undefined &&
                          isAnswerCorrect(lesson.id, question.id, userAnswer);

                        return (
                          <div
                            key={question.id}
                            className="bg-gray-700/50 rounded-lg p-6 border border-gray-600"
                          >
                            <h4 className="text-lg font-medium text-white mb-4">
                              {question.question}
                            </h4>

                            <div className="space-y-3 mb-6">
                              {question.options.map((option, index) => (
                                <label
                                  key={index}
                                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                                    userAnswer === index
                                      ? showResult
                                        ? isCorrect &&
                                          index === question.correct
                                          ? "bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border-emerald-400 text-emerald-100"
                                          : !isCorrect && index === userAnswer
                                          ? "bg-gradient-to-r from-red-900/50 to-pink-900/50 border-red-400 text-red-100"
                                          : index === question.correct
                                          ? "bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border-emerald-400 text-emerald-100"
                                          : "bg-gray-600 border-gray-500 text-gray-200"
                                        : "bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border-blue-400 text-blue-100"
                                      : showResult && index === question.correct
                                      ? "bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border-emerald-400 text-emerald-100"
                                      : "bg-gray-600 border-gray-500 text-gray-200 hover:bg-gray-500"
                                  } border-2`}
                                >
                                  <input
                                    type="radio"
                                    name={`question-${lesson.id}-${question.id}`}
                                    value={index}
                                    checked={userAnswer === index}
                                    onChange={() =>
                                      handleAnswerSelect(
                                        lesson.id,
                                        question.id,
                                        index
                                      )
                                    }
                                    disabled={showResult}
                                    className="sr-only"
                                  />
                                  <span className="flex-1">{option}</span>
                                  {showResult && index === question.correct && (
                                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                                  )}
                                  {showResult &&
                                    userAnswer === index &&
                                    index !== question.correct && (
                                      <XCircle className="h-5 w-5 text-red-400" />
                                    )}
                                </label>
                              ))}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="space-x-3">
                                {!showResult ? (
                                  <button
                                    onClick={() =>
                                      submitAnswer(lesson.id, question.id)
                                    }
                                    disabled={userAnswer === undefined}
                                    className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
                                  >
                                    Submit Answer
                                  </button>
                                ) : (
                                  <button
                                    onClick={() =>
                                      resetQuestion(lesson.id, question.id)
                                    }
                                    className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-2 rounded-lg font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-200 flex items-center space-x-2 shadow-lg"
                                  >
                                    <RotateCcw className="h-4 w-4" />
                                    <span>Try Again</span>
                                  </button>
                                )}
                              </div>

                              {showResult && (
                                <div
                                  className={`flex items-center space-x-2 ${
                                    isCorrect
                                      ? "text-emerald-400"
                                      : "text-red-400"
                                  }`}
                                >
                                  {isCorrect ? (
                                    <CheckCircle className="h-5 w-5" />
                                  ) : (
                                    <XCircle className="h-5 w-5" />
                                  )}
                                  <span className="font-medium">
                                    {isCorrect ? "Correct!" : "Incorrect"}
                                  </span>
                                </div>
                              )}
                            </div>

                            {showResult && (
                              <div className="mt-4 p-4 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg border-l-4 border-blue-400">
                                <p className="text-blue-100">
                                  <span className="font-medium">
                                    Explanation:{" "}
                                  </span>
                                  {question.explanation}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Grammar;
