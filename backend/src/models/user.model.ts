import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },

    userName: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },

    salt: {
      type: String,
      required: true,
      select: false,
    },

    hash: {
      type: String,
      required: true,
      select: false,
    },

    iterations: {
      type: Number,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {timestamps: true},
);

const User = mongoose.model('User', userSchema);

export default User;
