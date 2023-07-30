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
exports.loginUser = void 0;
// import statements using ES6 syntax
const express_validator_1 = require("express-validator");
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = require("bcrypt");
const User_1 = __importDefault(require("../../models/User"));
const HttpError_1 = __importDefault(require("../../models/HttpError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    // check the validation for fields we mentioned in routes
    if (!errors.isEmpty()) {
        return next(new HttpError_1.default('Invalid username or password, please check your data', 422));
    }
    const { email, password } = req.body;
    // check if there exists a user with the entered email address
    let user = yield User_1.default.findOne({ email });
    if (!user) {
        return next(new HttpError_1.default('Invalid email / password', 400));
    }
    const passwordCompare = yield (0, bcrypt_1.compare)(password, user.password);
    if (!passwordCompare) {
        return next(new HttpError_1.default('Invalid email / password', 400));
    }
    // send jwt token to the user after they have signed up
    const data = {
        user: {
            id: user.id
        }
    };
    const authtoken = jsonwebtoken_1.default.sign(data, process.env.JWT_KEY);
    res.status(200).json({
        message: "You have logged in",
        authtoken
    });
});
exports.loginUser = loginUser;
