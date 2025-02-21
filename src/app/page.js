import VocabularyList from "./components/VocabularyList";
import AddVocabularyForm from "./components/AddVocabularyForm";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        My Vocabulary Notes
      </h1>
      <div className="grid md:grid-cols-2 gap-8 justify-center">
        <div className="max-w-sm">
          <AddVocabularyForm />
        </div>
        <VocabularyList />
      </div>
    </main>
  );
}
