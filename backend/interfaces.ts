import {Request} from 'express';
import User from './src/models/user.model.js';

export interface IUser {
  name: string;
  email: string;
  userName: string;
  salt: string;
  hash: string;
  iterations: number;
  role: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserRequest extends Request {
  user: IUser;
}

export interface CookieRequest extends Request {
  cookies: {
    jwttoken: string;
  };

  // TODO: remove any and replace with User type
  user: any;
}
