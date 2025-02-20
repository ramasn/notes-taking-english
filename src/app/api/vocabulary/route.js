import { NextResponse } from "next/server";
import { addVocabularyItem } from "../../lib/mongodb";

export async function POST(request) {
  try {
    const { word, definition } = await request.json();
    const result = await addVocabularyItem(word, definition);
    return NextResponse.json({
      message: "Vocabulary item added successfully",
      result,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add vocabulary item" },
      { status: 500 }
    );
  }
}
