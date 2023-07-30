const HttpError = require('../../models/HttpError')
const Notes = require('../../models/Notes')
module.exports = {
    //Get all notes of an user
    getNoteById : async(req,res,next) => {
        const noteId = req.params.id;
        const note = await Notes.findOne({ _id: noteId, user: req.user.id });
       
        if(!note)
        {
                return next(new HttpError('Note not found'), 404);
            
        }
        res.status(200).json({
            message:"Notes are fetched",
            note
        })
        
    }
}