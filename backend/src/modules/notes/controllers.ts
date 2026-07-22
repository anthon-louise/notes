import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import { createNoteSchema } from "./schemas.js";
import { pool } from "../../config/db.js";

export const createNote = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const {title, content} = createNoteSchema.parse(req.body);

  await pool.query(`
    INSERT INTO
    notes (title, content)
    VALUES ($1, $2)
    `, [title, content]);

  res.status(201).json({
    message: "Note Created"
  })
})
