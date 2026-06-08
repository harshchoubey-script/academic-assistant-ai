import {
  Request,
  Response,
  NextFunction,
} from "express";

import prisma from "../lib/prisma.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {
  signupSchema,
  loginSchema,
} from "../validators/auth.validation.js";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Zod Validation
    const validatedData =
      signupSchema.safeParse(req.body);

    if (!validatedData.success) {
      return res.status(400).json({
        success: false,
        errors:
          validatedData.error.flatten()
            .fieldErrors,
      });
    }

    const { name, email, password } =
      validatedData.data;

    // Check Existing User
    const existingUser =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash Password
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // Create User
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user.id,
      },
      "secretkey",
      {
        expiresIn: "7d",
      }
    );

    // Response
    return res.status(201).json({
      success: true,
      message: "Signup successful",
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Zod Validation
    const validatedData =
      loginSchema.safeParse(req.body);

    if (!validatedData.success) {
      return res.status(400).json({
        success: false,
        errors:
          validatedData.error.flatten()
            .fieldErrors,
      });
    }

    const { email, password } =
      validatedData.data;

    // Find User
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // User Not Found
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare Password
    const isPasswordValid =
      await bcrypt.compare(
        password,
        user.password
      );

    // Invalid Password
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user.id,
      },
      "secretkey",
      {
        expiresIn: "7d",
      }
    );

    // Response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};