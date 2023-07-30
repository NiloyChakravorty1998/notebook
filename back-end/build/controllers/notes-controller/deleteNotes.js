var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const HttpError = require('../../models/HttpError');
const Notes = require('../../models/Notes');
module.exports = {
    deleteNotes: (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const noteId = req.params.id;
        //check if notes exist with that id
        let note;
        try {
            note = yield Notes.findById(noteId);
        }
        catch (error) {
            return next(new HttpError('Could not find note with that id', 404));
        }
        //if notes exist with that id check the user id to see it belongs to them
        if (!note || note.user.toString() !== req.user.id) {
            return next(new HttpError('Could not find note with that id', 404));
        }
        //delete the note
        try {
            const deletedNote = yield Notes.findByIdAndDelete(noteId);
            if (!deletedNote) {
                return next(new HttpError('Could not find place with that id', 404));
            }
            res.json({
                message: 'Note deleted successfully',
            });
        }
        catch (error) {
            return next(new HttpError('Could not delete Note with that id', 500));
        }
    })
};
