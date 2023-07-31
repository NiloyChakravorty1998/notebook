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
exports.stateOfUser = void 0;
// import statements using ES6 syntax
const User_1 = __importDefault(require("../../models/User"));
const HttpError_1 = __importDefault(require("../../models/HttpError"));
const stateOfUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.headers["userId"]);
    //check if there exists a user with the entered email address
    let user = yield User_1.default.findById(req.headers["userId"]);
    console.log(user);
    if (!user) {
        return next(new HttpError_1.default(`Invalid token`, 400));
    }
    res.status(200).json({
        message: "Status logged in",
        name: user.name,
        email: user.email
    });
});
exports.stateOfUser = stateOfUser;
