import * as dotenv from 'dotenv';
import express, {Application} from 'express';
import cookieParser from 'cookie-parser';

const app: Application = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());

export default app;