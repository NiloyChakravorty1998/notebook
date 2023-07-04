const { validationResult } = require('express-validator')
const dotenv = require('dotenv')
const {compare}= require('bcrypt')
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
        const {email, password} = req.body;
         //check if there exits user with the entered email adress 
         let user = await User.findOne({ email });
         if (!user) {
             return next(new HttpError(`Invalid email / password`), 400);
        }
        const passwordCompare = await compare(password, user.password);
        if(!passwordCompare)
        {
            return next(new HttpError(`Invalid email / password`), 400);
        }
        //send jwt token to user after they have signed up
        const data = {
            user: {
                id: user.id  
            }
        }
        const authtoken = jwt.sign(data, process.env.JWT_KEY);
        res.status(200).json({
            message: "You have logged in",
            authtoken
        })

    }
}