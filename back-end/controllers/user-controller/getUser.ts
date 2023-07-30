// import statements using ES6 syntax
import User from '../../models/User';
import HttpError from '../../models/HttpError';

export const getUser = async (req, res, next) => {
  if (!req.user) {
    return next(new HttpError('Please authenticate using a valid token', 401));
  }

  const userId = req.user.id;

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
