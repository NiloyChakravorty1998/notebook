// import statements using ES6 syntax
import HttpError from '../../models/HttpError';
import Notes from '../../models/Notes';
import { Request, Response, NextFunction } from 'express';
export const deleteNotes = async (req : Request, res : Response, next : NextFunction) => {
  const noteId = req.params.id;
  //check if notes exist with that id
  let note;
  try {
    note = await Notes.findById(noteId);
  } catch (error) {
    return next(new HttpError('Could not find note with that id', 404));
  }
  //if notes exist with that id check the user id to see it belongs to them
  if (!note || note.user!.toString() !== req.headers["userId"]) {
    return next(new HttpError('Could not find note with that id', 404));
  }
  //delete the note
  try {
    const deletedNote = await Notes.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return next(new HttpError('Could not find place with that id', 404));
    }

    res.json({
      message: 'Note deleted successfully',
    });
  } catch (error) {
    return next(new HttpError('Could not delete Note with that id', 500));
  }
};
