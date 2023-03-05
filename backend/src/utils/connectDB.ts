import mongoose from 'mongoose';

const URL = process.env.MONGODB_URL as string;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(URL, {});
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    const err = error as Error;
    console.error(`Error: ${err.message}`);
  }
};

export default connectDB;
