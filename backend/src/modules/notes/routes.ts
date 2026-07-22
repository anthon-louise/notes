import express from "express";
import { createNote } from "./controllers.js";

const router = express.Router();

router.post('/', createNote);

export default router;
