import {
  Response,
  NextFunction,
} from "express";

import { AuthRequest } from "../middlewares/auth.middleware.js";

import prisma from "../lib/prisma.js";

import { generateQuiz } from "../services/ai.service.js";

export const createQuiz = async (
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

    // Generate Quiz
    const quizText =
      await generateQuiz(
        note.extractedText
      );

    // Clean AI Response
    const cleanedText =
      quizText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    console.log(cleanedText);

    // Parse JSON
    const quizzes =
      JSON.parse(cleanedText);

    const userId = req.userId!;

    // Save Quiz
    const savedQuiz =
      await Promise.all(
        quizzes.map((quiz: any) =>
          prisma.quiz.create({
            data: {
              question:
                quiz.question,

              optionA:
                quiz.optionA,

              optionB:
                quiz.optionB,

              optionC:
                quiz.optionC,

              optionD:
                quiz.optionD,

              correctAnswer:
                quiz.correctAnswer,

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
        "Quiz generated successfully",

      quizzes: savedQuiz,
    });
  } catch (error) {
    next(error);
  }
};

export const getQuizByNoteId =
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const noteId = Number(
        req.params.noteId
      );

      const quizzes =
        await prisma.quiz.findMany({
          where: {
            noteId,
          },
        });

      return res.json({
        success: true,
        quizzes,
      });
    } catch (error) {
      next(error);
    }
  };