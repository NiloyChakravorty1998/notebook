// import statements using ES6 syntax
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import HttpError from '../models/HttpError';
import { Request, Response, NextFunction } from 'express';
dotenv.config();


export const fetchUser = (req : Request, res : Response, next : NextFunction) => {
  // Get the user from the token and add ID to the request object
  const token = req.header('auth-token');
  console.log(token)
  if (!token) {
    return next(new HttpError('Please authenticate using a valid token', 401));
  }

  try {
    jwt.verify(token, process.env.JWT_KEY!, (err, payload) => {
      if(err)
      {
        return next(new HttpError('Please authenticate using a valid token', 401));
      }
      if(!payload)
      {
        return next(new HttpError('Please authenticate using a valid token', 401));
      }
    req.headers["userId"]= payload.id;
    next();
    })
    
  } catch (error) {
    return next(new HttpError('Please authenticate using a valid token', 401));
  }
};
