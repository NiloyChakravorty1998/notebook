"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUser = void 0;
// import statements using ES6 syntax
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const HttpError_1 = __importDefault(require("../models/HttpError"));
dotenv_1.default.config();
const fetchUser = (req, res, next) => {
    // Get the user from the token and add ID to the request object
    const token = req.header('auth-token');
    console.log(token);
    if (!token) {
        return next(new HttpError_1.default('Please authenticate using a valid token', 401));
    }
    try {
        jsonwebtoken_1.default.verify(token, process.env.JWT_KEY, (err, payload) => {
            if (err) {
                return next(new HttpError_1.default('Please authenticate using a valid token', 401));
            }
            if (!payload) {
                return next(new HttpError_1.default('Please authenticate using a valid token', 401));
            }
            if (typeof payload === 'string') {
                return next(new HttpError_1.default('Please authenticate using a valid token', 401));
            }
            req.headers["userId"] = payload.id;
            next();
        });
    }
    catch (error) {
        return next(new HttpError_1.default('Please authenticate using a valid token', 401));
    }
};
exports.fetchUser = fetchUser;
