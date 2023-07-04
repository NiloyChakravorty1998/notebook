const User = require('../models/User')
const HttpError = require('../models/HttpError')


module.exports = {
    //Create new user
    createUser : async (req,res, next) => {
        const { name, email, password, date} = req.body;
        const newUser = new User(
            {
                name, email, password, date
            }
        );
        try{
            await newUser.save();
        }catch(error)
        {
            return next(new HttpError('Error creating new user', 500));
        }

        res.status(201).json({
            message: "Created user",
            user : newUser
        })
    }
}