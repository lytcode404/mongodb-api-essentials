// npm i mongodb
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

const options = {};
let mongoClient;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

export const connectToDatabase = async () => {
  try {
    if (mongoClient) {
      return { mongoClient };
    }
    mongoClient = await new MongoClient(uri, options).connect();
    console.log("Just Connected");
    return { mongoClient };
  } catch (err) {
    console.error(err)
    
  }
};
