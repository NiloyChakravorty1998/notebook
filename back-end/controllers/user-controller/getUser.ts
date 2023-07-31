// import statements using ES6 syntax
import User from '../../models/User';
import HttpError from '../../models/HttpError';
import { Request, Response, NextFunction } from 'express';
export const getUser = async (req : Request, res : Response, next : NextFunction) => {
  if (!req.headers["userId"]) {
    return next(new HttpError('Please authenticate using a valid token', 401));
  }

  const userId = req.headers["userId"];

  //Get user info
  const user = await User.findById(userId).select('-password');

  if (!user) {
    return next(new HttpError('User not found', 404));
  }

  res.status(200).json({
    message: "user details fetched",
    user
  });
};
