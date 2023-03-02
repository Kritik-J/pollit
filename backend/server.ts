import app from './src/app.js';
import chalk from 'chalk';


app.listen(process.env.PORT, () => {
  console.log(
    `\nStarted Server on port ${process.env.PORT} \n${chalk.blue(
      `http://localhost:${process.env.PORT}`,
    )}\n\n`,
  );
});

export {};
