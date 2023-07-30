// import statements using ES6 syntax
import User from '../../models/User';
import HttpError from '../../models/HttpError';

export const stateOfUser = async (req, res, next) => {
  console.log(req.user.id);

  //check if there exists a user with the entered email address
  let user = await User.findById(req.user.id);
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
