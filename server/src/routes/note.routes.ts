import express from "express";

import { uploadNote } from "../controllers/note.controller.js";

import { upload } from "../middlewares/upload.middleware.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

import { getNotes } from "../controllers/note.controller.js";

import { getSingleNote } from "../controllers/note.controller.js";

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