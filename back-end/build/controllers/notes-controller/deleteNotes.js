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
exports.deleteNotes = void 0;
// import statements using ES6 syntax
const HttpError_1 = __importDefault(require("../../models/HttpError"));
const Notes_1 = __importDefault(require("../../models/Notes"));
const deleteNotes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const noteId = req.params.id;
    //check if notes exist with that id
    let note;
    try {
        note = yield Notes_1.default.findById(noteId);
    }
    catch (error) {
        return next(new HttpError_1.default('Could not find note with that id', 404));
    }
    //if notes exist with that id check the user id to see it belongs to them
    if (!note || note.user.toString() !== req.headers["userId"]) {
        return next(new HttpError_1.default('Could not find note with that id', 404));
    }
    //delete the note
    try {
        const deletedNote = yield Notes_1.default.findByIdAndDelete(noteId);
        if (!deletedNote) {
            return next(new HttpError_1.default('Could not find place with that id', 404));
        }
        res.json({
            message: 'Note deleted successfully',
        });
    }
    catch (error) {
        return next(new HttpError_1.default('Could not delete Note with that id', 500));
    }
});
exports.deleteNotes = deleteNotes;
