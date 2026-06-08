import {
  Response,
  NextFunction,
} from "express";

import { AuthRequest } from "../middlewares/auth.middleware";

import prisma from "../lib/prisma";

import fs from "fs";

import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export const uploadNote = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Read File
    const data = new Uint8Array(
      fs.readFileSync(file.path)
    );

    // Load PDF
    const pdf =
      await pdfjsLib.getDocument({
        data,
      }).promise;

    let extractedText = "";

    // Read All Pages
    for (
      let i = 1;
      i <= pdf.numPages;
      i++
    ) {
      const page =
        await pdf.getPage(i);

      const textContent =
        await page.getTextContent();

      const pageText =
        textContent.items
          .map((item: any) =>
            "str" in item ? item.str : ""
          )
          .join(" ");

      extractedText +=
        pageText + "\n";
    }

    // Temporary userId
    const userId = req.userId!;
    console.log("UPLOAD USER:", userId);

    // Save Note
    const note =
      await prisma.uploadedNote.create({
        data: {
          title: file.originalname,

          fileUrl: file.path,

          extractedText,

          status: "READY",

          userId,
        },
      });

    return res.status(201).json({
      success: true,

      message:
        "PDF uploaded and text extracted successfully",

      note,
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

export const getNotes = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId!;
    console.log("GET NOTES USER:", userId);

    const notes =
      await prisma.uploadedNote.findMany({
        where: {
          userId,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    return res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleNote = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.params.id);
    console.log(req.userId);
    const noteId = Number(
      req.params.id
    );

    const userId = req.userId!;

    const note =
      await prisma.uploadedNote.findFirst({
        where: {
          id: noteId,
          userId,
        },
      });

    if (!note) {
      return res.status(404).json({
        success: false,
        message:
          "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      note,
    });
  } catch (error) {
    next(error);
  }
};