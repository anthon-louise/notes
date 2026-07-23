import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import { createNoteSchema, updateNoteSchema } from "./schemas.js";
import { pool } from "../../config/db.js";
import { Note } from "./types.js";
import { AppError } from "../../errors/AppError.js";

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

});


export const getNotes = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

  const noteResults = await pool.query<Note>(`
    SELECT id, title, content, created_at
    FROM notes
    `);

  res.status(200).json({
    message: "Notes fetched",
    notes: noteResults.rows
  });
});

export const getNoteById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

  const noteId = req.params.id;

  const noteResult = await pool.query<Note>(`
    SELECT id, title, content, created_at
    FROM notes
    WHERE id=$1
    `, [noteId]);

  if (noteResult.rows.length === 0) throw new AppError("Note not found", 404);

  res.status(200).json({
    message: "Note fetched",
    note: noteResult.rows[0]
  })
});


export const updateNote = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

  const noteId = req.params.id;

  const noteResult = await pool.query(`
    SELECT title, content
    FROM notes
    WHERE id=$1
    `, [noteId]);

  if (noteResult.rows.length === 0) throw new AppError("Note not found", 404);

  const note = noteResult.rows[0];
  const data = updateNoteSchema.parse(req.body);

  const title = data.title ?? note.title
  const content = data.content ?? note.content

  await pool.query(`
    UPDATE notes
    SET title=$1, content=$2
    WHERE id=$3
    `, [title, content, noteId]);

  res.status(200).json({
    message: "Note updated"
  })

});

export const deleteNote = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const noteId = req.params.id;

  const noteResult = await pool.query(`
    SELECT id
    FROM notes
    WHERE id=$1
    `, [noteId]);

  if (noteResult.rows.length === 0) throw new AppError("Note not found", 404);

  await pool.query(`
    DELETE FROM notes
    WHERE id=$1
    `, [noteId]);

  res.status(200).json({
    message: "Note deleted"
  })

});
