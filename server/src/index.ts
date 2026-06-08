import express from "express";
import cors from "cors";

import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

import { errorMiddleware } from "./middlewares/error.middleware";
import noteRoutes from "./routes/note.routes";
import summaryRoutes from "./routes/summary.routes";
import flashcardRoutes from "./routes/flashcard.routes";
import quizRoutes from "./routes/quiz.routes";

console.log("CORRECT INDEX RUNNING");

const app = express();

// Middlewares
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://academic-assistant-ai-36hj-o7idia3uu-harsh-choubey-s-projects.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/users", userRoutes);

app.use("/auth", authRoutes);

app.use("/notes", noteRoutes);

app.use("/summary", summaryRoutes);

app.use("/flashcards", flashcardRoutes);

app.use("/quiz", quizRoutes);

// Test Route
app.get("/test", (req, res) => {
  res.send("WORKING");
});

// Global Error Middleware
app.use(errorMiddleware);

// Railway Dynamic Port
const PORT = process.env.PORT || 8080;

// Server
app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});