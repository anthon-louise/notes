import express from "express";
import { createNote, getNoteById, getNotes, updateNote } from "./controllers.js";

const router = express.Router();

router.post('/', createNote);
router.get('/', getNotes);
router.get('/:id', getNoteById);
router.put('/:id', updateNote);

export default router;
