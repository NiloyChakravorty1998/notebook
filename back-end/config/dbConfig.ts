import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI: string = process.env.MONGO_URI!;

export const connectToMongo = () => {
  mongoose.connect(mongoURI).then(() => {
    console.log('Connected to mongo :' + process.env.MONGO_URI);
  });
};
