"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dbConfig_1 = require("./config/dbConfig");
const auth_1 = __importDefault(require("./routes/auth"));
const notes_1 = __importDefault(require("./routes/notes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Connect to MongoDB
(0, dbConfig_1.connectToMongo)();
// CORS handling
app.use((0, cors_1.default)());
app.options('*', (0, cors_1.default)());
app.use(body_parser_1.default.json());
// Use the imported routes
app.use('/api/auth', auth_1.default);
app.use('/api/notes', notes_1.default);
const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
    console.log(`Application has been started on port ${port}`);
});
