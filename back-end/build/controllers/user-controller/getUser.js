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
exports.getUser = void 0;
// import statements using ES6 syntax
const User_1 = __importDefault(require("../../models/User"));
const HttpError_1 = __importDefault(require("../../models/HttpError"));
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return next(new HttpError_1.default('Please authenticate using a valid token', 401));
    }
    const userId = req.user.id;
    //Get user info
    const user = yield User_1.default.findById(userId).select('-password');
    if (!user) {
        return next(new HttpError_1.default('User not found', 404));
    }
    res.status(200).json({
        message: "user details fetched",
        user
    });
});
exports.getUser = getUser;
