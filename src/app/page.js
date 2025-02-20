import VocabularyList from "./components/VocabularyList";
import AddVocabularyForm from "./components/AddVocabularyForm";

if (process.env.MONGODB_URI) {
  console.log("MONGODB_URI is defined");
} else {
  console.log("MONGODB_URI is not defined");
}

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        My Vocabulary Notes
      </h1>
      <div className="grid md:grid-cols-2 gap-8">
        <AddVocabularyForm />
        <VocabularyList />
      </div>
    </main>
  );
}
