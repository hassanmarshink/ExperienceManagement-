import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import surveyRoutes from "./routes/surveyRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(cors());
app.use(express.json());

// // Serve static files from the 'client/public' directory
// app.use(express.static(path.join(__dirname, "../client")));
// Serve the production build from the 'client/build' directory
app.use(express.static(path.join(__dirname, "../client/build")));

// Handle the root route by sending the 'index.html' file
// app.get("/", (req, res) => {
//   console.log("sent index.html from backend");
//   res.sendFile(path.join(__dirname, "../client/index.html"));
// });

// Routes
app.use("/", surveyRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    console.log("Database connected Server Started");
    app.listen(3000);
  })
  .catch((err) => {
    console.log("could not connect to database");
  });
