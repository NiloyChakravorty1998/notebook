// Import Mongoose
import mongoose from 'mongoose';
const { Schema } = mongoose;

// Create the Notes Schema
const NotesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    default: 'General'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Export the Notes Model
export default mongoose.model('notes', NotesSchema);
