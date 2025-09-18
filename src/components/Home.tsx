import React from "react";
import Navigation from "./Navigation";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="relative flex-1 min-h-0 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 w-full h-full"></div>
      <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
        <h1 className="text-4xl sm:text-6xl font-bold text-white mb-10">
          Hi,{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent ml-2">
            Learner
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          Unlock your language skills with WordBridge: interactive vocabulary,
          grammar lessons, and fun quizzes.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
          <button
            onClick={() => navigate("/vocabulary")}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold text-base hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/25"
          >
            <span className="px-2">Start</span>
          </button>
        </div>
        <div className="mt-8 text-center">
          <blockquote className="text-xl italic text-purple-300 mb-2">
            "Language is power."
          </blockquote>
        </div>
      </div>
    </section>
  );
};

const Home: React.FC = () => (
  <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
    <Navigation />
    <Hero />
  </div>
);

export default Home;
