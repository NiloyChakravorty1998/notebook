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
const dotenv = require('dotenv');
const { genSalt, hash } = require('bcrypt');
const User = require('../../models/User');
const HttpError = require('../../models/HttpError');
const jwt = require('jsonwebtoken');
dotenv.config();
module.exports = {
    //Create new user
    createUser: (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const errors = validationResult(req); // check the validation for fields 
        //we mentioned in routes
        if (!errors.isEmpty()) {
            return next(new HttpError('Invalid inputs passed, please check your data'), 422);
        }
        const { name, email, password, date } = req.body;
        //check if there exits user with the entered email adress 
        let user = yield User.findOne({ email });
        if (user) {
            return next(new HttpError('User exists with the same email id'), 400);
        }
        //securing password
        const salt = yield genSalt(10);
        let secPass = yield hash(password, salt);
        const newUser = new User({
            name, email, password: secPass, date
        });
        try {
            yield newUser.save();
        }
        catch (error) {
            return next(new HttpError('Error creating new user', 500));
        }
        //send jwt token to user after they have signed up
        const data = {
            user: {
                id: newUser.id
            }
        };
        const authtoken = jwt.sign(data, process.env.JWT_KEY);
        res.status(201).json({
            message: "Welcome",
            authtoken
        });
    })
};
