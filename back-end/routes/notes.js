const express = require('express')
const router = express.Router();
const { check } = require('express-validator')
const {fetchUser} = require('../middleware/fetchUser');
const {createNotes} = require('../controllers/notes-controller/createNotes')
const {fetchAllNotes} = require('../controllers/notes-controller/fetchAllNotes')
const {updateNotes} = require('../controllers/notes-controller/updateNotes')


//Get all notes of an user 
router.get('/fetchallnotes',fetchUser, fetchAllNotes);
//Add new notes for an user 
router.post('/addnote',fetchUser,[
    check('title').isLength({ min: 3 }),
    check('description').isLength({min: 5})
], createNotes);
//Update notes for an user
router.patch('/updatenote/:id',fetchUser,[
    check('title').isLength({ min: 3 }),
    check('description').isLength({min: 5})
], updateNotes);
module.exports = router; 