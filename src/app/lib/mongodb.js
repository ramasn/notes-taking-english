import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export async function getVocabularyItems() {
  const client = await clientPromise;
  const collection = client.db("vocabulary").collection("words");
  return collection.find({}).sort({ dateAdded: -1 }).toArray();
}

export async function addVocabularyItem(word, definition) {
  const client = await clientPromise;
  const collection = client.db("vocabulary").collection("words");
  return collection.insertOne({ word, definition, dateAdded: new Date() });
}
