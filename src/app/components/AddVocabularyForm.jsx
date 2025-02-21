"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaPlusCircle, FaBook } from "react-icons/fa";

export default function AddVocabularyForm() {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/vocabulary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ word, definition }),
    });

    if (response.ok) {
      setWord("");
      setDefinition("");
      router.refresh();
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <form
        onSubmit={handleSubmit}
        className=" bg-white shadow-lg rounded-xl p-6 transition-all duration-300"
      >
        {/* Title */}
        <div className="flex items-center mb-6">
          <FaBook className="text-blue-500 text-3xl mr-2" />
          <h2 className="text-3xl font-bold text-blue-500 dark:text-blue-400">
            Tambah Kata Baru
          </h2>
        </div>

        {/* Word Input */}
        <div className="relative mb-6">
          <input
            type="text"
            id="word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            required
            className="peer block w-full px-4 py-3 text-lg text-gray-900 bg-transparent border-2 border-gray-400 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 outline-none transition-all"
          />
          <label
            htmlFor="word"
            className="absolute top-3 left-4 text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500 transition-all"
          >
            Kata
          </label>
        </div>

        {/* Definition Input */}
        <div className="relative mb-6">
          <textarea
            id="definition"
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
            required
            rows={3}
            className="peer block w-full px-4 py-3 text-lg text-gray-900 bg-transparent border-2 border-gray-400 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 outline-none transition-all"
          ></textarea>
          <label
            htmlFor="definition"
            className="absolute top-3 left-4 text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500 transition-all"
          >
            Artinya
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring focus:ring-blue-300"
        >
          <FaPlusCircle />
          Tambah Kata
        </button>
      </form>
    </div>
  );
}
