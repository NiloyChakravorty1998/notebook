// import statements using ES6 syntax
import { validationResult } from 'express-validator';
import HttpError from '../../models/HttpError';
import Notes from '../../models/Notes';
import { Request, Response, NextFunction } from 'express';
export const updateNotes = async (req : Request, res : Response, next : NextFunction) => {
  const errors = validationResult(req);

  // check the validation for fields we mentioned in routes and check that user has passed a proper note id
  if (!errors.isEmpty() || !req.params.id) {
    return next(new HttpError('Invalid inputs passed, please check your data', 422));
  }

  const noteId = req.params.id;
  const { title, description, tag } = req.body;
  let note;

  try {
    note = await Notes.findById(noteId);
  } catch (error) {
    return next(new HttpError('Could not find note with that id', 404));
  }

  if (!note || note.user!.toString() !== req.headers["userId"]) {
    return next(new HttpError('Could not find note with that id', 404));
  }

  note.title = title;
  note.description = description;
  note.tag = tag.toUpperCase();

  try {
    await Notes.findByIdAndUpdate(noteId, { $set: note }, { new: true });
  } catch (error) {
    return next(new HttpError('Could not update note', 500));
  }

  res.json({
    message: 'Note updated',
    note
  });
};
