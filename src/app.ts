import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './services/database';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

connectToDatabase();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});