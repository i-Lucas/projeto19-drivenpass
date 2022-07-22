import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import dotenv from 'dotenv';
import appRouter from './routes/index.js';
import errorHandle from './middlewares/error.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(appRouter);
app.use(errorHandle);

export default app;