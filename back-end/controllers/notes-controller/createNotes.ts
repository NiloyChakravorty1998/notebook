// import statements using ES6 syntax
import { validationResult } from 'express-validator';
import HttpError from '../../models/HttpError';
import Notes from '../../models/Notes';
import { Request, Response,NextFunction } from 'express';
// Exporting the createNotes function directly
export const createNotes = async (req : Request, res : Response, next : NextFunction) => {
  const errors = validationResult(req); // check the validation for fields 
  //we mentioned in routes
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data', 422));
  }
  const { title, description, tag } = req.body;
  const note = new Notes({
    title,
    description,
    tag: tag.toUpperCase(),
    user: req.headers["userId"]
  });
  try {
    const savedNote = await note.save();
    res.status(201).json({
      message: "Notes added",
      notes: savedNote
    });
  } catch (error) {
    return next(new HttpError('Error creating new notes', 500));
  }
};
