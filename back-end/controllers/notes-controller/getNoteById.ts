// import statements using ES6 syntax
import HttpError from '../../models/HttpError';
import Notes from '../../models/Notes';

export const getNoteById = async (req, res, next) => {
  const noteId = req.params.id;
  const note = await Notes.findOne({ _id: noteId, user: req.user.id });
 
  if (!note) {
    return next(new HttpError('Note not found', 404));
  }
  res.status(200).json({
    message: "Notes are fetched",
    note
  });
};
