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
exports.fetchAllNotes = void 0;
// import statements using ES6 syntax
const HttpError_1 = __importDefault(require("../../models/HttpError"));
const Notes_1 = __importDefault(require("../../models/Notes"));
const fetchAllNotes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield Notes_1.default.find({
        user: req.headers["userId"]
    });
    if (!notes) {
        return next(new HttpError_1.default('Notes not found', 404));
    }
    res.status(200).json({
        message: "Notes are fetched",
        notes
    });
});
exports.fetchAllNotes = fetchAllNotes;
