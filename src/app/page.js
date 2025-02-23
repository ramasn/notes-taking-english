"use client";
import VocabularyList from "./components/VocabularyList";
import AddVocabularyForm from "./components/AddVocabularyForm";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  return (
    <main className="min-h-screen px-4 py-8 bg-gradient-to-br from-blue-900 to-purple-950">
      <h1 className="text-3xl font-bold mb-6 text-center">
        My Vocabulary Notes
      </h1>

      <div className="flex justify-center mb-8">
        <Link
          href="/quiz"
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Kuis Kosakata
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="w-full">
          <AddVocabularyForm
            onVocabularyAdded={() => setRefreshTrigger((prev) => prev + 1)}
          />
        </div>
        <div className="w-full">
          <VocabularyList refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </main>
  );
}
