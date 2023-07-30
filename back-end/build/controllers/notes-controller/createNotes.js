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
    createNotes: (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const errors = validationResult(req); // check the validation for fields 
        //we mentioned in routes
        if (!errors.isEmpty()) {
            return next(new HttpError('Invalid inputs passed, please check your data'), 422);
        }
        const { title, description, tag } = req.body;
        const note = new Notes({
            title,
            description,
            tag: tag.toUpperCase(),
            user: req.user.id
        });
        try {
            const savedNote = yield note.save();
            res.status(201).json({
                message: "Notes added",
                notes: savedNote
            });
        }
        catch (error) {
            return next(new HttpError('Error creating new notes', 500));
        }
    })
};
