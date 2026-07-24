import { api } from "./axios";
import type { Note } from "../types/note";
import type { createNoteInput, updateNoteInput } from "../schemas/note";

export const fetchNotes = async (): Promise<Note[]> => {
  const res = await api.get("/notes");
  return res.data.notes;
}

export const fetchNoteById = async (id: number): Promise<Note> => {
  const res = await api.get(`/notes/${id}`);
  return res.data.note;
}

export const createNote = async (data: createNoteInput) => {
  const res = await api.post("/notes", data)
  return res.data;
}

export const updateNote = async (data: updateNoteInput, id: number) => {
  const res = await api.put(`'notes/${id}`, data);
  return res.data;
}

export const deleteNote = async (id: number) => {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
}
