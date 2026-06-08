import {
  Response,
  NextFunction,
} from "express";

import { AuthRequest } from "../middlewares/auth.middleware.js";

import prisma from "../lib/prisma.js";

import { generateSummary } from "../services/ai.service.js";

export const createSummary = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const noteId = Number(req.params.noteId);

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
        message: "No extracted text found",
      });
    }

    // Generate AI Summary
    const summaryText =
      await generateSummary(
        note.extractedText
      );

    // Temporary userId
    console.log(req.userId);
    const userId = req.userId!;

    // Save Summary
    const summary =
      await prisma.summary.create({
        data: {
          content: summaryText,

          status: "READY",

          noteId,

          userId,
        },
      });

    return res.status(201).json({
      success: true,

      message:
        "Summary generated successfully",

      summary,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
  success: false,
  error,
  });
  }
};

export const getSummaryByNote =
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const noteId = Number(
        req.params.noteId
      );

      const summary =
        await prisma.summary.findFirst({
          where: {
            noteId,
          },

          orderBy: {
            createdAt: "desc",
          },
        });

      return res.status(200).json({
        success: true,
        summary,
      });
    } catch (error) {
      next(error);
    }
  };