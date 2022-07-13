import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import dotenv from 'dotenv';
import appRouter from './routes/index.js';
import errorHandle from './middlewares/error.js';

import db from './config/db.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(appRouter);
app.use(errorHandle);

const port = + process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

// connection test
db.query("SELECT NOW()", (err, res) => {
    if (res) { console.log(`connected to database at ${res.rows[0].now}`); }
    else { console.log(`failed to connect to database: \n\n${err}`); }
})