import express from "express";

import {
  createSummary,
  getSummaryByNote,
} from "../controllers/summary.controller.js";

import { authMiddleware }
from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/generate/:noteId",
  authMiddleware,
  createSummary
);

router.get(
  "/:noteId",
  authMiddleware,
  getSummaryByNote
);

export default router;