// import statements using ES6 syntax
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import HttpError from '../models/HttpError';

dotenv.config();

export const fetchUser = (req, res, next) => {
  // Get the user from the token and add ID to the request object
  const token = req.header('auth-token');

  if (!token) {
    return next(new HttpError('Please authenticate using a valid token', 401));
  }

  try {
    const data = jwt.verify(token, process.env.JWT_KEY);
    req.user = data.user;
    next();
  } catch (error) {
    return next(new HttpError('Please authenticate using a valid token', 401));
  }
};
