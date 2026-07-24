import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchNotes, fetchNoteById, createNote, updateNote, deleteNote } from "../api/note";
import type { createNoteInput, updateNoteInput } from "../schemas/note";

export const useNotes = () => {
  return useQuery({
    queryKey: ["notes"],
    queryFn:  fetchNotes
  });
}

export const useNote = (id: number) => {
  return useQuery({
    queryKey: ["notes", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id
  });
}

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: createNoteInput) => createNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["notes"]}),
      toast.success("Note created");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message ?? "Faield to create note")
    }
  });
}

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({data, id} : {data: updateNoteInput, id: number}) => updateNote(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["notes"]}),
      toast.success("Note updated")
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message ?? "Failed to update note")
    }
  });
}

export const useDeleteNote = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["notes"]});
      toast.success("Noted deleted");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message ?? "Failed to delete note")
    }
  });
}
