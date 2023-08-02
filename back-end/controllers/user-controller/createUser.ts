// import statements using ES6 syntax
import { validationResult } from 'express-validator';
import dotenv from 'dotenv';
import { genSalt, hash } from 'bcrypt';
import User from '../../models/User';
import HttpError from '../../models/HttpError';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
dotenv.config();

export const createUser = async (req :Request, res : Response, next : NextFunction) => {
  const errors = validationResult(req);

  // check the validation for fields we mentioned in routes
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data', 422));
  }

  const { name, email, password, date } = req.body;

  //check if there exists a user with the entered email address
  let user = await User.findOne({ email });

  if (user) {
    return next(new HttpError('User exists with the same email id', 400));
  }

  //securing password
  const salt = await genSalt(10);
  let secPass = await hash(password, salt);

  const newUser = new User({
    name,
    email,
    password: secPass,
    date
  });

  try {
    await newUser.save();
  } catch (error) {
    return next(new HttpError('Error creating new user', 500));
  }

  //send jwt token to user after they have signed up
  const authtoken = jwt.sign({id: newUser.id}, process.env.JWT_KEY!);
  console.log(authtoken);
  res.status(201).json({
    message: "Welcome",
    authtoken
  });
};
