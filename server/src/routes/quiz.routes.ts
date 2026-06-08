import express from "express";

import { createQuiz } from "../controllers/quiz.controller.js";

import { getQuizByNoteId } from "../controllers/quiz.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

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