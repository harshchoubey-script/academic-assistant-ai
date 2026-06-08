import {
  Response,
  NextFunction,
} from "express";

import { AuthRequest } from "../middlewares/auth.middleware.js";

import prisma from "../lib/prisma.js";

import { generateFlashcards } from "../services/ai.service.js";

export const createFlashcards =
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const noteId = Number(
        req.params.noteId
      );

      // Find Note
      const note =
        await prisma.uploadedNote.findUnique({
          where: {
            id: noteId,
          },
        });

      if (!note) {
        return res.status(404).json({
          success: false,
          message: "Note not found",
        });
      }

      if (!note.extractedText) {
        return res.status(400).json({
          success: false,
          message:
            "No extracted text found",
        });
      }

      // Generate AI Flashcards
      const flashcardText =
        await generateFlashcards(
          note.extractedText
        );

      // Parse JSON
      const cleanedText =
       flashcardText
         .replace(/```json/g, "")
         .replace(/```/g, "")
         .trim();
      const flashcards =
        JSON.parse(cleanedText);

      const userId = req.userId!;

      // Save All Flashcards
      const savedFlashcards =
        await Promise.all(
          flashcards.map(
            (flashcard: any) =>
              prisma.flashcard.create({
                data: {
                  question:
                    flashcard.question,

                  answer:
                    flashcard.answer,

                  status: "READY",

                  noteId,

                  userId,
                },
              })
          )
        );

      return res.status(201).json({
        success: true,

        message:
          "Flashcards generated successfully",

        flashcards:
          savedFlashcards,
      });
    } catch (error) {
      next(error);
    }
  };