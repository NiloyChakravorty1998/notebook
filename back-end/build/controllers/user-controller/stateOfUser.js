var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const User = require('../../models/User');
const HttpError = require('../../models/HttpError');
module.exports = {
    //Get state of user
    stateOfUser: (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        console.log(req.user.id);
        //check if there exits user with the entered email adress 
        let user = yield User.findById(req.user.id);
        console.log(user);
        if (!user) {
            return next(new HttpError(`Invalid token`), 400);
        }
        res.status(200).json({
            message: "Status logged in",
            name: user.name,
            email: user.email
        });
    })
};
