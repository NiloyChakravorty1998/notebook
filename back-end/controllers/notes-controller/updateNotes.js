const { validationResult } = require('express-validator')
const HttpError = require('../../models/HttpError')
const Notes = require('../../models/Notes')

module.exports = {
    updateNotes: async (req, res, next) => {
        const errors = validationResult(req); // check the validation for fields 
        //we mentioned in routes and check that user has passed a proper note id
        if (!errors.isEmpty() || !req.params.id) {
            return next(new HttpError('Invalid inputs passed, please check your data'), 422);
        }
        const noteId = req.params.id;
        const { title, description, tag } = req.body;
        let note;
        try {
            note = await Notes.findById(noteId);
        } catch (error) {
            return next(new HttpError('Could not find note with that id', 404));
        }
        if (!note || note.user.toString() !== req.user.id) {
            return next(new HttpError('Could not find note with that id', 404));
        }

        note.title = title;
        note.description = description;
        note.tag = tag;
        try {
            await Notes.findByIdAndUpdate(noteId, { $set: note }, { new: true });
        } catch (error) {
            return next(new HttpError('Could not update note', 500));
        }
        res.json({
            message: "Note updated",
            note
        });
    },
}