var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { validationResult } = require('express-validator');
const HttpError = require('../../models/HttpError');
const Notes = require('../../models/Notes');
module.exports = {
    updateNotes: (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const errors = validationResult(req); // check the validation for fields 
        //we mentioned in routes and check that user has passed a proper note id
        if (!errors.isEmpty() || !req.params.id) {
            return next(new HttpError('Invalid inputs passed, please check your data'), 422);
        }
        const noteId = req.params.id;
        const { title, description, tag } = req.body;
        let note;
        try {
            note = yield Notes.findById(noteId);
        }
        catch (error) {
            return next(new HttpError('Could not find note with that id', 404));
        }
        if (!note || note.user.toString() !== req.user.id) {
            return next(new HttpError('Could not find note with that id', 404));
        }
        note.title = title;
        note.description = description;
        note.tag = tag.toUpperCase();
        try {
            yield Notes.findByIdAndUpdate(noteId, { $set: note }, { new: true });
        }
        catch (error) {
            return next(new HttpError('Could not update note', 500));
        }
        res.json({
            message: "Note updated",
            note
        });
    }),
};
