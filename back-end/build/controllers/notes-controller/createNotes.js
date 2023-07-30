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
exports.createNotes = void 0;
// import statements using ES6 syntax
const express_validator_1 = require("express-validator");
const HttpError_1 = __importDefault(require("../../models/HttpError"));
const Notes_1 = __importDefault(require("../../models/Notes"));
// Exporting the createNotes function directly
const createNotes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req); // check the validation for fields 
    //we mentioned in routes
    if (!errors.isEmpty()) {
        return next(new HttpError_1.default('Invalid inputs passed, please check your data', 422));
    }
    const { title, description, tag } = req.body;
    const note = new Notes_1.default({
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
        return next(new HttpError_1.default('Error creating new notes', 500));
    }
});
exports.createNotes = createNotes;
