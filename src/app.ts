import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDatabase } from './services/database';
import authRouter from './routers/authRouters';
import candidateRouter from './routers/candidateRouter';
import userRouter from './routers/userRouter';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

connectToDatabase();

app.use('/auth', authRouter);
app.use('/api', candidateRouter);
app.use('/api', userRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});