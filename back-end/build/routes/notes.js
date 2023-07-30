const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { fetchUser } = require('../middleware/fetchUser');
const { createNotes } = require('../controllers/notes-controller/createNotes');
const { fetchAllNotes } = require('../controllers/notes-controller/fetchAllNotes');
const { updateNotes } = require('../controllers/notes-controller/updateNotes');
const { deleteNotes } = require('../controllers/notes-controller/deleteNotes');
const { getNoteById } = require('../controllers/notes-controller/getNoteById');
//Get all notes of an user 
router.get('/fetchallnotes', fetchUser, fetchAllNotes);
//Get note by Id
router.get('/getnote/:id', fetchUser, getNoteById);
//Add new notes for an user 
router.post('/addnote', fetchUser, [
    check('title').isLength({ min: 3 }),
    check('description').isLength({ min: 5 })
], createNotes);
//Update notes for an user
router.patch('/updatenote/:id', fetchUser, [
    check('title').isLength({ min: 3 }),
    check('description').isLength({ min: 5 })
], updateNotes);
//Delete notes for an user
router.delete('/deletenote/:id', fetchUser, deleteNotes);
module.exports = router;
