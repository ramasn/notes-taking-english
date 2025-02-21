export default async function VocabularyList() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/vocabulary`,
    {
      cache: "no-store", // Ensures fresh data on every request
    }
  );

  const vocabularyItems = await res.json();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">List Vocabulary</h2>
      <ul className="space-y-4">
        {vocabularyItems.map((item) => (
          <li
            key={item._id.toString()}
            className="bg-white shadow rounded-lg p-4 text-green-500"
          >
            <h3 className="text-xl font-semibold">{item.word}</h3>
            <p className="text-gray-600">{item.definition}</p>
            <p className="text-sm text-gray-500 mt-2">
              Kita Belajar ini tanggal:{" "}
              {new Date(item.dateAdded).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
