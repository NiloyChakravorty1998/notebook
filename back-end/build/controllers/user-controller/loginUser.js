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
const { compare } = require('bcrypt');
const User = require('../../models/User');
const HttpError = require('../../models/HttpError');
const jwt = require('jsonwebtoken');
dotenv.config();
module.exports = {
    //Login user
    loginUser: (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const errors = validationResult(req); // check the validation for fields 
        //we mentioned in routes
        if (!errors.isEmpty()) {
            return next(new HttpError('Invalid username or passowrd, please check your data'), 422);
        }
        const { email, password } = req.body;
        //check if there exits user with the entered email adress 
        let user = yield User.findOne({ email });
        if (!user) {
            return next(new HttpError(`Invalid email / password`), 400);
        }
        const passwordCompare = yield compare(password, user.password);
        if (!passwordCompare) {
            return next(new HttpError(`Invalid email / password`), 400);
        }
        //send jwt token to user after they have signed up
        const data = {
            user: {
                id: user.id
            }
        };
        const authtoken = jwt.sign(data, process.env.JWT_KEY);
        res.status(200).json({
            message: "You have logged in",
            authtoken
        });
    })
};
