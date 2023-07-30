"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const createUser_1 = require("../controllers/user-controller/createUser");
const loginUser_1 = require("../controllers/user-controller/loginUser");
const getUser_1 = require("../controllers/user-controller/getUser");
const fetchUser_1 = require("../middleware/fetchUser");
const stateOfUser_1 = require("../controllers/user-controller/stateOfUser");
const router = express_1.default.Router();
// Signup route
router.post('/createuser', [
    (0, express_validator_1.check)('name').isLength({ min: 5 }),
    (0, express_validator_1.check)('email').isEmail(),
    (0, express_validator_1.check)('password').isLength({ min: 8, max: 16 }),
], createUser_1.createUser);
// Login route
router.post('/loginuser', [
    (0, express_validator_1.check)('email').isEmail(),
    (0, express_validator_1.check)('password').isLength({ min: 8, max: 16 }),
], loginUser_1.loginUser);
// Get user route, login required. Token required
router.get('/getuser', fetchUser_1.fetchUser, getUser_1.getUser);
// Check login status
router.get('/me', fetchUser_1.fetchUser, stateOfUser_1.stateOfUser);
exports.default = router;
