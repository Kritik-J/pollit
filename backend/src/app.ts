import * as dotenv from 'dotenv';
import express, {Application} from 'express';
import cookieParser from 'cookie-parser';
import RootRouter from './routes/index.js';

const app: Application = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1', RootRouter);

export default app;
