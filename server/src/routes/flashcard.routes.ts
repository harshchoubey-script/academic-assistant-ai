import express from "express";

import { createFlashcards } from "../controllers/flashcard.controller.js";

import {
  authMiddleware,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/generate/:noteId",
  authMiddleware,
  createFlashcards
);

export default router;