import React, { useState, useEffect } from "react";
import { Volume2, Filter, Search } from "lucide-react";
import vocabularyData from "../data/vocabulary.json";

interface VocabularyItem {
  id: number;
  word: string;
  meaning: string;
  example: string;
  difficulty: string;
  partOfSpeech: string;
}

const Vocabulary: React.FC = () => {
  const [vocabulary] = useState<VocabularyItem[]>(vocabularyData.vocabulary);
  const [filteredVocabulary, setFilteredVocabulary] =
    useState<VocabularyItem[]>(vocabulary);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    let filtered = vocabulary;

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.meaning.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(
        (item) => item.difficulty === selectedDifficulty
      );
    }

    setFilteredVocabulary(filtered);
  }, [vocabulary, searchTerm, selectedDifficulty]);

  const handleCardFlip = (id: number) => {
    const newFlippedCards = new Set(flippedCards);
    if (newFlippedCards.has(id)) {
      newFlippedCards.delete(id);
    } else {
      newFlippedCards.add(id);
    }
    setFlippedCards(newFlippedCards);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-gradient-to-r from-emerald-500 to-teal-500 text-white";
      case "intermediate":
        return "bg-gradient-to-r from-yellow-500 to-orange-500 text-white";
      case "advanced":
        return "bg-gradient-to-r from-red-500 to-pink-500 text-white";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600 text-white";
    }
  };

  const speakWord = (word: string) => {
    if ("speechSynthesis" in window) {
      const utter = new window.SpeechSynthesisUtterance(word);
      utter.lang = "en-US";
      window.speechSynthesis.speak(utter);
    } else {
      alert("Speech synthesis is not supported in your browser.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Vocabulary Builder
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Expand your vocabulary with WordBridge: carefully selected words,
            definitions, and real-world examples. Click on any card to reveal
            the meaning and example usage.
          </p>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search vocabulary..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredVocabulary.length} of {vocabulary.length} words
          </p>
        </div>

        {filteredVocabulary.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No vocabulary words found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVocabulary.map((item) => (
              <div key={item.id} className="h-64">
                <div
                  className={`relative w-full h-full cursor-pointer transition-transform duration-500 transform-style-preserve-3d ${
                    flippedCards.has(item.id) ? "rotate-y-180" : ""
                  }`}
                  onClick={() => handleCardFlip(item.id)}
                >
                  <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg border border-gray-700 p-6 flex flex-col justify-center items-center text-center hover:shadow-2xl hover:border-purple-500/50 transition-all duration-200">
                    <div className="flex items-center justify-between w-full mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium shadow-lg ${getDifficultyColor(
                          item.difficulty
                        )}`}
                      >
                        {item.difficulty}
                      </span>
                      <span className="text-xs text-gray-400 uppercase tracking-wide">
                        {item.partOfSpeech}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4">
                      {item.word}
                    </h3>

                    <div className="flex items-center justify-center space-x-2 text-purple-400 mb-2">
                      <button
                        type="button"
                        className="p-2 rounded-full bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        title="Speak"
                        onClick={(e) => {
                          e.stopPropagation();
                          speakWord(item.word);
                        }}
                      >
                        <Volume2 className="h-5 w-5 text-white" />
                      </button>
                      <span className="text-sm font-medium">
                        Click to reveal meaning
                      </span>
                    </div>
                  </div>

                  <div className="absolute inset-0 backface-hidden bg-gray-900 rounded-xl shadow-lg border border-gray-700 p-6 flex flex-col justify-center items-center text-center transform rotate-y-180">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Meaning & Example
                    </h3>
                    <p className="text-lg text-gray-300 mb-4">{item.meaning}</p>
                    <p className="text-sm text-gray-400 italic">
                      "{item.example}"
                    </p>
                    <div className="mt-4">
                      <button
                        type="button"
                        className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 text-white text-sm font-medium transition-all duration-200"
                        onClick={() => handleCardFlip(item.id)}
                      >
                        &larr; Back to Word
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default Vocabulary;
