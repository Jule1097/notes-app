import { createNoteService } from "../services/noteService.js";
import { notesRepository } from "../repositories/notes.repository.js";

const noteRepositoryInstance = new notesRepository();

export const notesController = {
  getAllNotes: async (req, res) => {
    try {
      const userId = req.user.id;
      const notes = await noteRepositoryInstance.getNotesByUserId(userId);

      res.json({
        code: 200,
        ok: true,
        payload: notes,
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        ok: false,
        message: error.message,
      });
    }
  },

  createNote: async (req, res) => {
    try {
      const userId = req.user.id;
      const noteData = {
        ...req.body,
        user_id: userId,
      };

      const newNote = await createNoteService(noteData);

      res.status(201).json({
        code: 201,
        ok: true,
        payload: newNote,
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        ok: false,
        message: error.message,
      });
    }
  },
  updateNote: async (req, res) => {
    try {
      const noteId = req.params.id;
      const noteData = req.body;
      const updatedNote = await noteRepositoryInstance.updateNote(
        noteId,
        noteData
      );

      if (!noteId) {
        return res.status(400).json({
          code: 400,
          ok: false,
          message: "Note ID is required",
        });
      }

      if (!updatedNote) {
        return res.status(404).json({
          code: 404,
          ok: false,
          message: "Note not found",
        });
      }

      res.json({
        code: 200,
        ok: true,
        payload: updatedNote,
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        ok: false,
        message: error.message,
      });
    }
  },

  deleteNote: async (req, res) => {
    try {
      const noteId = req.params.id;

      if (!noteId) {
        return res.status(400).json({
          code: 400,
          ok: false,
          message: "Note ID is required",
        });
      }

      const deletedNote = await noteRepositoryInstance.deleteNote(noteId);

      if (!deletedNote) {
        return res.status(404).json({
          code: 404,
          ok: false,
          message: "Note not found",
        });
      }

      res.json({
        code: 200,
        ok: true,
        message: "Note deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        ok: false,
        message: error.message,
      });
    }
  },
};
