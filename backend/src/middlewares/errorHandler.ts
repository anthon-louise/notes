import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/AppError.js";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: err.issues[0].message
    })
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message
    })
  }

  console.error(err);
  res.status(500).json({
    message: "Something went wrong"
  })
}
