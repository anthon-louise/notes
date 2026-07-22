import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import { createNoteSchema } from "./schemas.js";
import { pool } from "../../config/db.js";
import { Note } from "./types.js";

export const createNote = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

  const { title, content } = createNoteSchema.parse(req.body);

  await pool.query(`
    INSERT INTO
    notes (title, content)
    VALUES ($1, $2)
    `, [title, content]);

  res.status(201).json({
    message: "Note Created"
  })

})


export const getNotes = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

  const noteResults = await pool.query<Note>(`
    SELECT title, content, created_at
    FROM notes
    `);

  res.status(200).json({
    message: "Notes fetched",
    notes: noteResults.rows
  });

})
