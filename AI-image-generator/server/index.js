import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import generateImageRoute from "./src/routes/GenerateImage.route.js";
import posts from "./src/routes/Posts.route.js";
import { connectDB } from "./src/database/db.js";
import { errorMiddleware } from "./src/middleware/error.middleware.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/generateImage/", generateImageRoute);
app.use("/api/post/", posts);

app.use(errorMiddleware);

const startServer = async () => {
  try {
    connectDB();
    app.listen(8080, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
