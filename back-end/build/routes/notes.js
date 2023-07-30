"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const fetchUser_1 = require("../middleware/fetchUser");
const createNotes_1 = require("../controllers/notes-controller/createNotes");
const fetchAllNotes_1 = require("../controllers/notes-controller/fetchAllNotes");
const updateNotes_1 = require("../controllers/notes-controller/updateNotes");
const deleteNotes_1 = require("../controllers/notes-controller/deleteNotes");
const getNoteById_1 = require("../controllers/notes-controller/getNoteById");
const router = express_1.default.Router();
// Get all notes of a user
router.get('/fetchallnotes', fetchUser_1.fetchUser, fetchAllNotes_1.fetchAllNotes);
// Get note by ID
router.get('/getnote/:id', fetchUser_1.fetchUser, getNoteById_1.getNoteById);
// Add new notes for a user
router.post('/addnote', fetchUser_1.fetchUser, [
    (0, express_validator_1.check)('title').isLength({ min: 3 }),
    (0, express_validator_1.check)('description').isLength({ min: 5 })
], createNotes_1.createNotes);
// Update notes for a user
router.patch('/updatenote/:id', fetchUser_1.fetchUser, [
    (0, express_validator_1.check)('title').isLength({ min: 3 }),
    (0, express_validator_1.check)('description').isLength({ min: 5 })
], updateNotes_1.updateNotes);
// Delete notes for a user
router.delete('/deletenote/:id', fetchUser_1.fetchUser, deleteNotes_1.deleteNotes);
exports.default = router;
