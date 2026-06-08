import express from "express";

import { createFlashcards } from "../controllers/flashcard.controller";

import {
  authMiddleware,
} from "../middlewares/auth.middleware";

const router = express.Router();

router.post(
  "/generate/:noteId",
  authMiddleware,
  createFlashcards
);

export default router;