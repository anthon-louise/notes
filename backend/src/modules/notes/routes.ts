import express from "express";
import { createNote, getNoteById, getNotes } from "./controllers.js";

const router = express.Router();

router.post('/', createNote);
router.get('/', getNotes);
router.get('/:id', getNoteById);

export default router;
