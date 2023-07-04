const HttpError = require('../../models/HttpError')
const Notes = require('../../models/Notes')
module.exports = {
    //Get all notes of an user
    fetchAllNotes : async(req,res,next) => {
        const notes = await Notes.find({
            user: req.user.id
        })
        if(!notes)
        {
                return next(new HttpError('Notes not found'), 404);
            
        }
        res.status(200).json({
            message:"Notes are fetched",
            notes
        })
        
    }
}