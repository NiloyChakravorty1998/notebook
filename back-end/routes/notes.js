const express = require('express')
const router = express.Router();
const {createNotes} = require('../controllers/notes-controller')
//Create user using POST, no - auth required

router.post('/', createNotes);
module.exports = router;