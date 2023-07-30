import express from 'express';
import { check } from 'express-validator';
import { createUser } from '../controllers/user-controller/createUser';
import { loginUser } from '../controllers/user-controller/loginUser';
import { getUser } from '../controllers/user-controller/getUser';
import { fetchUser } from '../middleware/fetchUser';
import { stateOfUser } from '../controllers/user-controller/stateOfUser';

const router = express.Router();

// Signup route
router.post('/createuser', [
  check('name').isLength({ min: 5 }),
  check('email').isEmail(),
  check('password').isLength({ min: 8, max: 16 }),
],
createUser);

// Login route
router.post('/loginuser', [
  check('email').isEmail(),
  check('password').isLength({ min: 8, max: 16 }),
],
loginUser);

// Get user route, login required. Token required
router.get('/getuser', fetchUser, getUser);

// Check login status
router.get('/me', fetchUser, stateOfUser);

export default router;
