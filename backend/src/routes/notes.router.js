import { Router } from 'express';
import { notesController } from '../controllers/notes.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const notesRouter = Router();

notesRouter.get('/notes', authMiddleware, notesController.getAllNotes);

export default notesRouter;

    