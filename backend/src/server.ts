import * as dotenv from 'dotenv';
dotenv.config();

import express, {Request, Response, Application} from 'express';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.listen(process.env.PORT, () => {
  console.log(
    `\nStarted Server on port ${process.env.PORT} \n${chalk.blue(
      `http://localhost:${process.env.PORT}`,
    )}\n\n`,
  );
});

export {};
