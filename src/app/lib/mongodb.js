import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  ssl: true,
  sslValidate: true,
};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI, options);
    global._mongoClientPromise = client.connect().catch((err) => {
      console.error("Failed to connect to MongoDB", err);
      throw err;
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(MONGODB_URI, options);
  clientPromise = client.connect().catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    throw err;
  });
}

export async function getVocabularyItems() {
  try {
    const client = await clientPromise;
    const collection = client.db().collection("words");
    return collection.find({}).sort({ dateAdded: -1 }).toArray();
  } catch (error) {
    console.error("Failed to fetch vocabulary items:", error);
    return [];
  }
}

export async function addVocabularyItem(word, definition) {
  try {
    const client = await clientPromise;
    const collection = client.db().collection("words");
    return collection.insertOne({ word, definition, dateAdded: new Date() });
  } catch (error) {
    console.error("Failed to add vocabulary item:", error);
    throw error;
  }
}
