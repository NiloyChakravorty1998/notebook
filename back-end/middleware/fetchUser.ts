// import statements using ES6 syntax
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import HttpError from '../models/HttpError';
import { Request, Response, NextFunction } from 'express';
dotenv.config();


interface JwtData {
  user: string;
}

export const fetchUser = (req : Request, res : Response, next : NextFunction) => {
  // Get the user from the token and add ID to the request object
  const token = req.header('auth-token');

  if (!token) {
    return next(new HttpError('Please authenticate using a valid token', 401));
  }

  try {
    const data = jwt.verify(token, process.env.JWT_KEY!) as JwtData;
    req.headers["userId"]= data.user;
    next();
  } catch (error) {
    return next(new HttpError('Please authenticate using a valid token', 401));
  }
};
