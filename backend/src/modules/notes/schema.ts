import {z} from "zod";

export const createNoteSchema = z.object({
  title: z
    .string()
    .min(1, "Title cannot be empty")
    .max(255, "Title is too long"),
  content: z
    .string()
    .max(999, "Title is too long")
    .optional()
    .default("")
});

export const updateNoteSchema = createNoteSchema.partial();
