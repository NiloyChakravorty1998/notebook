// import statements using ES6 syntax
import HttpError from '../../models/HttpError';
import Notes from '../../models/Notes';
import { Request, Response, NextFunction } from 'express';

export const getNoteById = async (req : Request, res : Response, next : NextFunction) => {
  const noteId = req.params.id;
  const note = await Notes.findOne({ _id: noteId, user: req.headers["userId"] });
 
  if (!note) {
    return next(new HttpError('Note not found', 404));
  }
  res.status(200).json({
    message: "Notes are fetched",
    note
  });
};
