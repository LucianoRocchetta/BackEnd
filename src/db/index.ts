import { URI } from "../config";
import mongoose from "mongoose";

const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

async function connectDB() {
  const db = await mongoose.connect(URI);
  console.log("database is connected to", db.connection.db.databaseName);
}

connectDB();
