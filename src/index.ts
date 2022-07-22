import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

app.listen(process.env.PORT || 4999, () =>
    console.log('Server is running on port %s', process.env.PORT));