"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

async function getVocabularyItems() {
  const response = await fetch("/api/vocabulary");
  return response.json();
}

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function QuizPage() {
  const [vocabularyItems, setVocabularyItems] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [loading, setLoading] = useState(true);
  const [navigating, setNavigating] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      let items = await getVocabularyItems();
      items = shuffleArray(items); // Shuffle once at the start
      setVocabularyItems(items);
      setQuestionIndex(0);
      generateQuestion(items, 0);
      setLoading(false);
    }
    fetchData();
  }, []);

  function generateQuestion(items, index) {
    if (items.length === 0) return;

    // Reset index and reshuffle if all words have been asked
    if (index >= items.length) {
      const reshuffledItems = shuffleArray(items);
      setVocabularyItems(reshuffledItems);
      index = 0;
    }

    const questionWord = items[index];
    let optionsSet = new Set();

    optionsSet.add(questionWord.definition);
    while (optionsSet.size < 4) {
      const randomOption =
        items[Math.floor(Math.random() * items.length)].definition;
      optionsSet.add(randomOption);
    }

    setCurrentQuestion(questionWord);
    setOptions([...optionsSet].sort(() => Math.random() - 0.5));
    setSelectedAnswer(null);
    setIsCorrect(null);
    setQuestionIndex(index);
  }

  function handleAnswerClick(option) {
    setSelectedAnswer(option);
    setIsCorrect(option === currentQuestion.definition);
  }

  function nextQuestion() {
    generateQuestion(vocabularyItems, questionIndex + 1);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-purple-950">
      {loading ? (
        <div className="text-white text-2xl font-semibold">Loading...</div>
      ) : (
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Kuis Vocabulary
          </h1>

          {currentQuestion && (
            <div>
              <h2 className="text-lg font-medium text-gray-700 mb-4">
                Apa arti dari{" "}
                <span className="font-bold text-blue-600">
                  {currentQuestion.word}
                </span>
                ?
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {options.map((option, index) => (
                  <button
                    key={index}
                    className={`py-3 px-5 text-lg font-semibold rounded-lg transition-all duration-300 shadow-md ${
                      selectedAnswer === option
                        ? isCorrect
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
                    }`}
                    onClick={() => handleAnswerClick(option)}
                    disabled={selectedAnswer !== null}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {selectedAnswer !== null && (
                <p
                  className={`mt-4 text-lg font-semibold ${
                    isCorrect ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isCorrect
                    ? "Benar! 🎉"
                    : `Salah! ❌ Jawaban yang benar: ${currentQuestion.definition}`}
                </p>
              )}
              <button
                onClick={nextQuestion}
                className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
              >
                Pertanyaan Selanjutnya
              </button>
            </div>
          )}
          <Link href="/">
            <button
              onClick={() => setNavigating(true)}
              className="mt-6 px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition-all duration-300"
            >
              {navigating ? "Loading..." : "Kembali ke Home"}
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
