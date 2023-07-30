// import statements using ES6 syntax
import HttpError from '../../models/HttpError';
import Notes from '../../models/Notes';

export const fetchAllNotes = async (req, res, next) => {
  const notes = await Notes.find({
    user: req.user.id
  });
  if (!notes) {
    return next(new HttpError('Notes not found', 404));
  }
  res.status(200).json({
    message: "Notes are fetched",
    notes
  });
};
