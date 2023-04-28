import app from './src/app.js';
import chalk from 'chalk';
import connectDB from './src/utils/connectDB.js';

connectDB();

// Handling uncaught error
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const server = app.listen(process.env.PORT, () => {
  console.log(
    `\nStarted Server on port ${process.env.PORT} \n${chalk.blue(
      `http://localhost:${process.env.PORT}`,
    )}\n`,
  );
});

// Unhandled Promise Rejection
process.on('unhandledRejection', (err: Error) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to Unhandled Promise rejection');
  server.close(() => {
    process.exit(1);
  });
});

// SIGTERM is a signal that is sent to a process to tell it to terminate.
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});

export {};
