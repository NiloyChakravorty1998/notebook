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
    getUser: (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        if (!req.user) {
            return next(new HttpError('Please authenticate using a valid token'), 401);
        }
        const userId = req.user.id;
        //Get user info 
        const user = yield User.findById(userId).select('-password');
        if (!user) {
            return next(new HttpError('User not found'), 404);
        }
        res.status(200).json({
            message: "user details fetched",
            user
        });
    })
};
