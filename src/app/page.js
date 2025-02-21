import VocabularyList from "./components/VocabularyList";
import AddVocabularyForm from "./components/AddVocabularyForm";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 bg-gradient-to-br from-blue-900 to-purple-950">
      <h1 className="text-3xl font-bold mb-6 text-center">
        My Vocabulary Notes
      </h1>

      <div className="flex justify-center mb-8">
        <Link
          href="/quiz"
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Take a Quiz
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="w-full">
          <AddVocabularyForm />
        </div>
        <div className="w-full">
          <VocabularyList />
        </div>
      </div>
    </main>
  );
}
