import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import noteRoutes from "./routes/note.routes";
import summaryRoutes from "./routes/summary.routes";
import flashcardRoutes from "./routes/flashcard.routes";
import quizRoutes from "./routes/quiz.routes";

import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/", (_, res) => {
  res.send("Backend Running");
});

app.get("/test", (_, res) => {
  res.send("WORKING");
});

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);
app.use("/summary", summaryRoutes);
app.use("/flashcards", flashcardRoutes);
app.use("/quiz", quizRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 8080;

app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});