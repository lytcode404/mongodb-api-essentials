// npm i mongoose
import mongoose from "mongoose";

// MONGODB_URI = mongodb+srv://dilshad:mongopass@cluster0.i4rydma.mongodb.net/

const MONGODB_URI = process.env.MONGODB_URI + "my-database3";


if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function ConnectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
      return mongoose;
    });
  }

  console.log("Connecting to database");

  cached.conn = await cached.promise;
  return cached.conn;
}

export default ConnectToDatabase;


