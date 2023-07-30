import express from 'express';
import bodyParser from 'body-parser';
import { connectToMongo } from './config/dbConfig';
import authRoutes from './routes/auth';
import notesRoutes from './routes/notes';
import cors from 'cors';

const app = express();

// Connect to MongoDB
connectToMongo();

// CORS handling
app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());

// Use the imported routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

const port = process.env.APP_PORT || 3000;

app.listen(port, () => {
  console.log(`Application has been started on port ${port}`);
});
