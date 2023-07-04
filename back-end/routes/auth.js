const express = require('express')
const {check} = require('express-validator')
const router = express.Router();
const {createUser} = require('../controllers/user-controller')


router.post('/',[
    check('name').isLength({min:5}),
    check('email').isEmail(),
    check('password').isLength({min:8, max: 16}),
],
 createUser);
module.exports = router;
