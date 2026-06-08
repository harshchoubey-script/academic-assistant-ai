import express from "express";

import { uploadNote } from "../controllers/note.controller";

import { upload } from "../middlewares/upload.middleware";

import { authMiddleware } from "../middlewares/auth.middleware";

import { getNotes } from "../controllers/note.controller";

import { getSingleNote } from "../controllers/note.controller";

console.log("NOTE ROUTES LOADED");

const router = express.Router();

router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  uploadNote
);

router.get(
  "/",
  authMiddleware,
  getNotes
);

router.get(
  "/:id",
  authMiddleware,
  getSingleNote
);

export default router;