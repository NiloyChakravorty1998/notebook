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
exports.createUser = void 0;
// import statements using ES6 syntax
const express_validator_1 = require("express-validator");
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = require("bcrypt");
const User_1 = __importDefault(require("../../models/User"));
const HttpError_1 = __importDefault(require("../../models/HttpError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    // check the validation for fields we mentioned in routes
    if (!errors.isEmpty()) {
        return next(new HttpError_1.default('Invalid inputs passed, please check your data', 422));
    }
    const { name, email, password, date } = req.body;
    //check if there exists a user with the entered email address
    let user = yield User_1.default.findOne({ email });
    if (user) {
        return next(new HttpError_1.default('User exists with the same email id', 400));
    }
    //securing password
    const salt = yield (0, bcrypt_1.genSalt)(10);
    let secPass = yield (0, bcrypt_1.hash)(password, salt);
    const newUser = new User_1.default({
        name,
        email,
        password: secPass,
        date
    });
    try {
        yield newUser.save();
    }
    catch (error) {
        return next(new HttpError_1.default('Error creating new user', 500));
    }
    //send jwt token to user after they have signed up
    const data = {
        user: {
            id: newUser.id
        }
    };
    const authtoken = jsonwebtoken_1.default.sign(data, process.env.JWT_KEY);
    res.status(201).json({
        message: "Welcome",
        authtoken
    });
});
exports.createUser = createUser;
