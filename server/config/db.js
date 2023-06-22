import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("database is connected successfully");
  } catch (error) {
    console.log(`Errro: ${error.message}`);
    process.exit(1);
  }
};
