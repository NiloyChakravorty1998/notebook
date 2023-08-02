// import statements using ES6 syntax
import { validationResult } from 'express-validator';
import dotenv from 'dotenv';
import { compare } from 'bcrypt';
import User from '../../models/User';
import HttpError from '../../models/HttpError';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
dotenv.config();

export const loginUser = async (req : Request, res : Response, next : NextFunction) => {
  const errors = validationResult(req);

  // check the validation for fields we mentioned in routes
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid username or password, please check your data', 422));
  }

  const { email, password } = req.body;

  // check if there exists a user with the entered email address
  let user = await User.findOne({ email });

  if (!user) {
    return next(new HttpError('Invalid email / password', 400));
  }

  const passwordCompare = await compare(password, user.password);

  if (!passwordCompare) {
    return next(new HttpError('Invalid email / password', 400));
  }

  // send jwt token to the user after they have signed up
  const authtoken = jwt.sign({id : user.id}, process.env.JWT_KEY!);

  res.status(200).json({
    message: "You have logged in",
    authtoken
  });
};
