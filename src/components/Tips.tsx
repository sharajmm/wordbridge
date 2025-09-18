import React from "react";

const Tips: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-8">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
          Tips
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Helpful advice and strategies for mastering vocabulary with
          WordBridge, grammar, and quizzes.
        </p>
      </div>
      <div className="space-y-8">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-8 border border-gray-700">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">
            Vocabulary Tips
          </h2>
          <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
            <li>
              Use the search and filter tools to focus on words by difficulty or
              part of speech.
            </li>
            <li>
              Click the speaker icon to hear the pronunciation and practice
              saying the word aloud.
            </li>
            <li>
              Flip vocabulary cards to see example sentences and reinforce
              meaning.
            </li>
            <li>
              Try to use new words in your daily conversations or writing.
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-8 border border-gray-700">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">
            Grammar Tips
          </h2>
          <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
            <li>
              Expand each lesson to read clear explanations and see example
              sentences.
            </li>
            <li>
              Pay attention to the key rules listed for each grammar topic.
            </li>
            <li>
              Practice with the interactive questions to test your
              understanding.
            </li>
            <li>
              Review the explanations for each question, especially when you
              make a mistake.
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-8 border border-gray-700">
          <h2 className="text-2xl font-semibold text-pink-300 mb-4">
            Quiz Tips
          </h2>
          <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
            <li>
              Quizzes are divided into batches to help you focus and avoid
              overwhelm.
            </li>
            <li>Read each question carefully before selecting your answer.</li>
            <li>
              Use the feedback and explanations after each question to learn
              from mistakes.
            </li>
            <li>
              Try quizzes multiple times to improve your score and retention.
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-8 border border-gray-700">
          <h2 className="text-2xl font-semibold text-white mb-4">
            General Learning Tips
          </h2>
          <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
            <li>Practice regularly to reinforce your learning.</li>
            <li>Review mistakes and learn from them.</li>
            <li>Use new words and grammar in your own sentences.</li>
            <li>Ask for help or clarification when needed.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default Tips;
