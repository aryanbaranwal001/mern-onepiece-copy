import authRoutes from "./routes/auth.routes.js";
import theoryAuthorRoutes from "./routes/thoeryAuthor.routes.js";
import theoryCommonRoutes from "./routes/theoryCommon.routes.js";
import connectDB from "./lib/db.lib.js";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/author", theoryAuthorRoutes);
app.use("/api/common", theoryCommonRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
