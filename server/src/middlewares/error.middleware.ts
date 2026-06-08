import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);

  return res.status(500).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
};