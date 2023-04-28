import {NextFunction, Request, Response} from 'express';
import catchAsync from '../utils/catchAsync.js';
import User from '../models/user.model.js';
import {generateHash, verifyHash} from '../utils/password.js';
import createSendToken from '../utils/createSendToken.js';
import ErrorHandler from '../utils/errorHandler.js';
import {UserRequest} from '../../interfaces';

export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {name, email, userName, password} = req.body;

    if (
      !name ||
      !email ||
      !userName ||
      !password ||
      name.trim() === '' ||
      email.trim() === '' ||
      userName.trim() === '' ||
      password.trim() === ''
    ) {
      return next(
        new ErrorHandler('Please provide all the required fields', 400),
      );
    }

    if (!email.includes('@')) {
      return next(new ErrorHandler('Please provide a valid email', 400));
    }

    if (password.length < 8) {
      return next(
        new ErrorHandler('Password must be at least 8 characters long', 400),
      );
    }

    if (userName.length < 6) {
      return next(
        new ErrorHandler('Username must be at least 6 characters long', 400),
      );
    }

    const isUserExists = await User.findOne({$or: [{email}, {userName}]});

    if (isUserExists) {
      return next(new ErrorHandler('User already exists', 400));
    }

    const {hash, iterations, salt} = generateHash(password);

    const user = await User.create({
      name,
      email,
      userName,
      hash,
      iterations,
      salt,
    });

    createSendToken(user, 201, req, res);
  },
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {userNameOrEmail, password} = req.body;

    if (
      !userNameOrEmail ||
      !password ||
      userNameOrEmail.trim() === '' ||
      password.trim() === ''
    ) {
      return next(
        new ErrorHandler('Please provide all the required fields', 400),
      );
    }

    const user = await User.findOne({
      $or: [{email: userNameOrEmail}, {userName: userNameOrEmail}],
    }).select('+hash +salt +iterations');

    if (!user) {
      return next(new ErrorHandler('Invalid credentials', 400));
    }

    const {hash, salt, iterations} = user;

    const isValid = verifyHash(password, salt, hash, iterations);

    if (!isValid) {
      return next(new ErrorHandler('Invalid credentials', 400));
    }

    createSendToken(user, 200, req, res);
  },
);

export const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const options = {
      expires: new Date(Date.now() + 1000),
      httpOnly: true,
    };

    res.status(200).cookie('jwttoken', null, options).json({
      status: 'success',
    });
  },
);

export const myProfile = catchAsync(
  async (req: UserRequest, res: Response, next: NextFunction) => {
    res.status(200).json({
      status: 'success',
      user: req.user,
    });
  },
);
