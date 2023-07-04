const express = require('express')
const { check } = require('express-validator')
const router = express.Router();
const { createUser } = require('../controllers/user-controller/createUser')
const { loginUser } = require('../controllers/user-controller/loginUser')
const { getUser } = require('../controllers/user-controller/getUser');
const {fetchUser} = require('../middleware/fetchUser');

//signup route
router.post('/createuser', [
    check('name').isLength({ min: 5 }),
    check('email').isEmail(),
    check('password').isLength({ min: 8, max: 16 }),
],
    createUser);

//login route
router.post('/loginuser', [
    check('email').isEmail(),
    check('password').isLength({ min: 8, max: 16 }),
],
    loginUser);
//Get user route, login required. Token required
router.get('/getuser',fetchUser, getUser)
module.exports = router;
