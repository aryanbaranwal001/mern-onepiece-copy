import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    const connectData = await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected successfully::",connectData.connection.host);
  } catch (error) {
    console.log("MongoDB connection failed::", error);
  }
};

export default connectDB;
