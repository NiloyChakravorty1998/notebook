import express from 'express';
import { check } from 'express-validator';
import { fetchUser } from '../middleware/fetchUser';
import { createNotes } from '../controllers/notes-controller/createNotes';
import { fetchAllNotes } from '../controllers/notes-controller/fetchAllNotes';
import { updateNotes } from '../controllers/notes-controller/updateNotes';
import { deleteNotes } from '../controllers/notes-controller/deleteNotes';
import { getNoteById } from '../controllers/notes-controller/getNoteById';

const router = express.Router();

// Get all notes of a user
router.get('/fetchallnotes', fetchUser, fetchAllNotes);

// Get note by ID
router.get('/getnote/:id', fetchUser, getNoteById);

// Add new notes for a user
router.post('/addnote', fetchUser, [
  check('title').isLength({ min: 3 }),
  check('description').isLength({ min: 5 })
], createNotes);

// Update notes for a user
router.patch('/updatenote/:id', fetchUser, [
  check('title').isLength({ min: 3 }),
  check('description').isLength({ min: 5 })
], updateNotes);

// Delete notes for a user
router.delete('/deletenote/:id', fetchUser, deleteNotes);

export default router;
