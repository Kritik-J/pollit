import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import catchAsync from '../utils/catchAsync.js';
import {NextFunction, Request, Response} from 'express';
import ErrErrorHandleror from '../utils/errorHandler.js';
import {CookieRequest} from '../../interfaces.js';

export const isAuthenticatedUser = catchAsync(
  async (req: CookieRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.jwttoken;

    if (!token) {
      return next(
        new ErrErrorHandleror('Please login to access the resource', 401),
      );
    }

    const decodedData = jwt.verify(
      token,
      String(process.env.JWT_SECRET_KEY),
    ) as {
      _id: string;
      iat: number;
      exp: number;
    };

    const user = await User.findById(decodedData._id);

    if (!user) {
      return next(new ErrErrorHandleror('User not found', 404));
    }

    req.user = user;

    next();
  },
);
