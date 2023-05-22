import * as dotenv from 'dotenv';
import express, {Application} from 'express';
import cookieParser from 'cookie-parser';
import RootRouter from './routes/index.js';
import errorMiddleWare from './middlewares/error.js';
import morgan from 'morgan';

const app: Application = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());

if (process.env.ENVIRONMENT === 'development') {
  app.use(morgan('tiny'));
}

app.use('/api/v1', RootRouter);

app.use(errorMiddleWare);

export default app;
