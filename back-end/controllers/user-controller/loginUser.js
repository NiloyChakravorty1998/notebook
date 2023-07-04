const { validationResult } = require('express-validator')
const dotenv = require('dotenv')
const {genSalt, hash}= require('bcrypt')
const User = require('../../models/User')
const HttpError = require('../../models/HttpError')
const jwt = require('jsonwebtoken')

dotenv.config();


module.exports = {
    //Create new user
    loginUser: async (req, res, next) => {
        const errors = validationResult(req); // check the validation for fields 
        //we mentioned in routes
        if (!errors.isEmpty()) {
            return next(new HttpError('Invalid username or passowrd, please check your data'), 422);
        }
    }
}