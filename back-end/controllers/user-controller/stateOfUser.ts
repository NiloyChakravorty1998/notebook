// import statements using ES6 syntax
import User from '../../models/User';
import HttpError from '../../models/HttpError';
import { Request, Response, NextFunction } from 'express';
export const stateOfUser = async (req : Request, res : Response, next : NextFunction) => {
  console.log(req.headers["userId"]);

  //check if there exists a user with the entered email address
  let user = await User.findById(req.headers["userId"]);
  console.log(user);

  if (!user) {
    return next(new HttpError(`Invalid token`, 400));
  }

  res.status(200).json({
    message: "Status logged in",
    name: user.name,
    email: user.email
  });
};
