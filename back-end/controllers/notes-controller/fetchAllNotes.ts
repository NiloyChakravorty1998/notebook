// import statements using ES6 syntax
import HttpError from '../../models/HttpError';
import Notes from '../../models/Notes';
import { Request, Response, NextFunction } from 'express';
export const fetchAllNotes = async (req : Request, res : Response, next : NextFunction) => {
  const notes = await Notes.find({
    user: req.headers["userId"]
  });
  if (!notes) {
    return next(new HttpError('Notes not found', 404));
  }
  res.status(200).json({
    message: "Notes are fetched",
    notes
  });
};
