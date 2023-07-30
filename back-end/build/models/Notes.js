"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import Mongoose
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
// Create the Notes Schema
const NotesSchema = new Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: 'General'
    },
    date: {
        type: Date,
        default: Date.now
    }
});
// Export the Notes Model
exports.default = mongoose_1.default.model('notes', NotesSchema);
