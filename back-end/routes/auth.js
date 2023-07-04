const express = require('express')
const {check} = require('express-validator')
const router = express.Router();
const {createUser} = require('../controllers/user-controller/createUser')
const {loginUser} = require('../controllers/user-controller/loginUser')

//signup route
router.post('/createuser',[
    check('name').isLength({min:5}),
    check('email').isEmail(),
    check('password').isLength({min:8, max: 16}),
],
 createUser);

 //login route
 router.post('/loginuser',[
    check('email').isEmail(),
    check('password').isLength({min:8, max: 16}),
],
 loginUser);
module.exports = router;
