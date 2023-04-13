import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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
  },

  hash: {
    type: String,
  },

  phone: {
    type: Number,
  },

  role: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
