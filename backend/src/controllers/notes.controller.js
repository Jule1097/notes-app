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
};
