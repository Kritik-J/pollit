import {Request} from 'express';
import User from './src/models/user.model.js';

export interface UserRequest extends Request {
  user: typeof User;
}

export interface CookieRequest extends Request {
  cookies: {
    jwttoken: string;
  };

  // TODO: remove any and replace with User type
  user: any;
}
