"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-lg p-6 text-black"
    >
      <h2 className="text-2xl font-semibold mb-4 text-blue-500">
        Tambah Kata Baru
      </h2>
      <div className="mb-4">
        <label
          htmlFor="word"
          className="block text-sm font-medium text-gray-700"
        >
          Kata
        </label>
        <input
          type="text"
          id="word"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          required
          placeholder="Masukkan kata"
          className="mt-1 block w-full rounded-md border-2 border-gray-500 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-300 focus:ring-opacity-50 placeholder-gray-300 text-lg"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="definition"
          className="block text-sm font-medium text-gray-700"
        >
          Artinya
        </label>
        <textarea
          id="definition"
          value={definition}
          onChange={(e) => setDefinition(e.target.value)}
          required
          placeholder="Masukkan arti kata"
          className="mt-1 block w-full rounded-md border-2 border-gray-500 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-300 focus:ring-opacity-50 placeholder-gray-300 text-lg"
          rows={3}
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Tambah Kata
      </button>
    </form>
  );
}
