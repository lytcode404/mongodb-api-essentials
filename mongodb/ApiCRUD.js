import { connectToDatabase } from "./ConnectionDb";

export default async function handler(request, response) {
  try {
    const { mongoClient } = await connectToDatabase();

    const db = mongoClient.db("my-database");

    if (!db) {
      throw new Error("Unable to retrieve the database.");
    }

    const collection = db.collection("users");
    if (!collection) {
      throw new Error("Unable to retrieve the collection.");
    }
    const results = await collection.find({}).toArray();

    response.status(200).json(results);
  } catch (e) {
    console.error(e);
    response.status(500).json(e);
  }
}
