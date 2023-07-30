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
    //Get all notes of an user
    fetchAllNotes: (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const notes = yield Notes.find({
            user: req.user.id
        });
        if (!notes) {
            return next(new HttpError('Notes not found'), 404);
        }
        res.status(200).json({
            message: "Notes are fetched",
            notes
        });
    })
};
