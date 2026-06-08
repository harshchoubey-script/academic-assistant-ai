import express from "express";

import { createQuiz } from "../controllers/quiz.controller";

import { getQuizByNoteId } from "../controllers/quiz.controller";

import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.post(
  "/generate/:noteId",
  authMiddleware,
  createQuiz
);

router.get(
  "/:noteId",
  authMiddleware,
  getQuizByNoteId
);
export default router;