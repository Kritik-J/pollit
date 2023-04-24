import {NextFunction, Request, Response} from 'express';
import catchAsync from '../utils/catchAsync.js';
import User from '../models/user.model.js';
import {generateHash, verifyHash} from '../utils/password.js';
import createSendToken from '../utils/createSendToken.js';

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
      return next(new Error('Please provide all the required fields'));
    }

    const userExists = await User.findOne({email});

    if (userExists) {
      return next(new Error('User already exists'));
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
    const {email, password} = req.body;

    if (!email || !password || email.trim() === '' || password.trim() === '') {
      return next(new Error('Please provide all the required fields'));
    }

    const user = await User.findOne({email}).select('+hash +salt +iterations');

    if (!user) {
      return next(new Error('Invalid credentials'));
    }

    const {hash, salt, iterations} = user;

    const isValid = verifyHash(password, salt, hash, iterations);

    if (!isValid) {
      return next(new Error('Invalid credentials'));
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
