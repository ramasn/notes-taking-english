"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react"; // Import an icon for the clear button

async function getVocabularyItems() {
  const response = await fetch("/api/vocabulary");
  return response.json();
}

export default function VocabularyList({ refreshTrigger }) {
  const [vocabularyItems, setVocabularyItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const items = await getVocabularyItems();
      setVocabularyItems(items);
      setFilteredItems(items);
    }
    fetchData();
  }, [refreshTrigger]);

  useEffect(() => {
    const filtered = vocabularyItems.filter(
      (item) =>
        item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchQuery, vocabularyItems]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">List Vocabulary</h2>
      <div className="relative w-full text-black">
        <input
          type="text"
          placeholder="Cari Kata..."
          className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => setSearchQuery("")}
          >
            <X size={20} />
          </button>
        )}
      </div>
      <ul className="space-y-4 mt-4">
        {filteredItems.map((item) => (
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
