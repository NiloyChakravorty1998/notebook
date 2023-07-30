const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const HttpError = require('../models/HttpError')

dotenv.config();

module.exports = {
    fetchUser : (req, res, next) => {
        //Get the user from the token and add ID to request object
        const token = req.header('auth-token');
        if(!token)
        {
            return next(new HttpError('Please authenticate using a valid token'), 401);
        }
        try{
            const data = jwt.verify(token, process.env.JWT_KEY);
            req.user = data.user;
            next();
        }
        catch(error)
        {
            return next(new HttpError('Please authenticate using a valid token'), 401);
        }
        
        
    }
}