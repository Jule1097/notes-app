import { Router } from 'express';
import { notesController } from '../controllers/notes.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const notesRouter = Router();

notesRouter.get('/notes', authMiddleware, notesController.getAllNotes);
notesRouter.post('/notes', authMiddleware, notesController.createNote);
notesRouter.put('/notes/:id', authMiddleware, notesController.updateNote);
notesRouter.delete('/notes/:id', authMiddleware, notesController.deleteNote);

export default notesRouter;

    