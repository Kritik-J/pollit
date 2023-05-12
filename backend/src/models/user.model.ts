import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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

    avatar: {
      type: String,
      default: 'https://api.dicebear.com/6.x/thumbs/png?seed=DefaultAvatar',
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

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({_id: this._id}, String(process.env.JWT_SECRET_KEY), {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User = mongoose.model('User', userSchema);

export default User;
