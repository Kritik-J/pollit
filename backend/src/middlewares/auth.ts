import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import catchAsync from '../utils/catchAsync.js';
import {NextFunction, Request, Response} from 'express';

export const isAuthenticatedUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwttoken;

    if (!token) {
      return next(new Error('Please login to access the resource'));
    }

    const decodedData = jwt.verify(token, String(process.env.JWT_SECRET_KEY));

    req.user = await User.findById(decodedData._id);

    next();
  },
);
