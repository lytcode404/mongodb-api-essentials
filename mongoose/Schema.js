import mongoose from "mongoose";


const DBSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Schema = mongoose.models.Schema || mongoose.model("Schema", DBSchema);

export default Schema;
