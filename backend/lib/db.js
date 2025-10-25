import mongoose from "mongoose";
import envars from "./enVars.js";

export const connectDB = async (req, res) => {
  try {
    const conn = await mongoose.connect(envars.mongo_uri);
    console.log(`Connected to MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connecting to MongoDB", error.message);
    process.exit(1);
  }
};
