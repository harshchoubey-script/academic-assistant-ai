import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import noteRoutes from "./routes/note.routes.js";
import summaryRoutes from "./routes/summary.routes.js";
import flashcardRoutes from "./routes/flashcard.routes.js";
import quizRoutes from "./routes/quiz.routes.js";

import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(
  cors({
    origin:
      "https://academic-assistant-ai-36hj.vercel.app",

    credentials: true,
  })
);

app.use(express.json());

app.get("/test", (_req, res) => {
  res.send("WORKING");
});

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);
app.use("/summary", summaryRoutes);
app.use("/flashcards", flashcardRoutes);
app.use("/quiz", quizRoutes);

app.use(errorMiddleware);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});