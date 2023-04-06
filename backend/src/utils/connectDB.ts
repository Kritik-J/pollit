import mongoose from 'mongoose';
import chalk from 'chalk';

const URL = process.env.MONGODB_URL as string;

const connectDB = () => {
  mongoose
    .connect(URL, {})
    .then(() => {
      console.log(chalk.blue('MongoDB connected successfully\n'));
    })
    .catch(err => {
      console.log(chalk.red(`Error connecting to MongoDB: ${err.message}\n`));
    });
};

export default connectDB;
