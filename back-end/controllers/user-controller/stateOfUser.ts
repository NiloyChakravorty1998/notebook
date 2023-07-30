
const User = require('../../models/User')
const HttpError = require('../../models/HttpError')


module.exports = {
    //Get state of user
    stateOfUser: async (req, res, next) => {
        console.log(req.user.id);
         //check if there exits user with the entered email adress 
         let user = await User.findById( req.user.id );
         console.log(user);
         if (!user) {
             return next(new HttpError(`Invalid token`), 400);
        }
        
        res.status(200).json({
            message: "Status logged in",
            name: user.name,
            email: user.email
        })

    }
}