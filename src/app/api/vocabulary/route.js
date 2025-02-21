import { NextResponse } from "next/server";
import { addVocabularyItem, getVocabularyItems } from "../../lib/mongodb";

export async function GET() {
  try {
    const items = await getVocabularyItems();
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error("Error fetching vocabulary:", error); // Debugging
    return NextResponse.json(
      { error: "Failed to fetch vocabulary" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.text(); // Read raw text
    console.log("Raw Request Body:", body); // Debugging

    if (!body) {
      return NextResponse.json(
        { error: "Empty request body" },
        { status: 400 }
      );
    }

    const { word, definition } = JSON.parse(body); // Parse JSON
    if (!word || !definition) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const result = await addVocabularyItem(word, definition);
    return NextResponse.json(
      { message: "Vocabulary item added successfully", result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding vocabulary:", error); // Debugging
    return NextResponse.json(
      { error: "Failed to add vocabulary item" },
      { status: 500 }
    );
  }
}
