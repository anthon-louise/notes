import {z} from "zod";

export const createNoteSchema = z.object({
  title:
    z.string()
    .min(1, "Title cannot be empty")
    .max(255, "Title is too long"),
  content:
    z.string()
    .max(999, "Content is too long")
    .optional()
});

export const updateNoteSchema = z.object({
  title: z
    .string()
    .min(1, "Title cannot be empty")
    .max(255, "Title is too long")
    .optional(),
  content: z
    .string()
    .max(999, "Content is too long")
    .optional()
});
