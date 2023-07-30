"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNotes = void 0;
// import statements using ES6 syntax
const express_validator_1 = require("express-validator");
const HttpError_1 = __importDefault(require("../../models/HttpError"));
const Notes_1 = __importDefault(require("../../models/Notes"));
const updateNotes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    // check the validation for fields we mentioned in routes and check that user has passed a proper note id
    if (!errors.isEmpty() || !req.params.id) {
        return next(new HttpError_1.default('Invalid inputs passed, please check your data', 422));
    }
    const noteId = req.params.id;
    const { title, description, tag } = req.body;
    let note;
    try {
        note = yield Notes_1.default.findById(noteId);
    }
    catch (error) {
        return next(new HttpError_1.default('Could not find note with that id', 404));
    }
    if (!note || note.user.toString() !== req.user.id) {
        return next(new HttpError_1.default('Could not find note with that id', 404));
    }
    note.title = title;
    note.description = description;
    note.tag = tag.toUpperCase();
    try {
        yield Notes_1.default.findByIdAndUpdate(noteId, { $set: note }, { new: true });
    }
    catch (error) {
        return next(new HttpError_1.default('Could not update note', 500));
    }
    res.json({
        message: 'Note updated',
        note
    });
});
exports.updateNotes = updateNotes;
