import {NextFunction, Request, Response} from 'express';
import catchAsync from '../utils/catchAsync.js';
import User from '../models/user.model.js';
import {generateHash, verifyHash} from '../utils/password.js';
import createSendToken from '../utils/createSendToken.js';
import ErrorHandler from '../utils/errorHandler.js';
import {UserRequest} from '../../interfaces';
import {checkEmail, checkLength, checkNull} from '../utils/validators.js';

// register user

export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {name, email, userName, password} = req.body;

    // check if all the required fields are provided

    if (
      checkNull(name) ||
      checkNull(email) ||
      checkNull(userName) ||
      checkNull(password)
    ) {
      return next(
        new ErrorHandler('Please provide all the required fields', 400),
      );
    }

    // check if the email is valid

    if (checkEmail(email)) {
      return next(new ErrorHandler('Please provide a valid email', 400));
    }

    // check if the password is at least 8 characters long

    if (checkLength(password, 8)) {
      return next(
        new ErrorHandler('Password must be at least 8 characters long', 400),
      );
    }

    // check if the username is at least 6 characters long

    if (checkLength(userName, 6)) {
      return next(
        new ErrorHandler('Username must be at least 6 characters long', 400),
      );
    }

    // check if the user already exists

    const isUserExists = await User.findOne({$or: [{email}, {userName}]});

    // if user already exists, return error

    if (isUserExists) {
      return next(new ErrorHandler('User already exists', 400));
    }

    // generate hash, salt and iterations

    const {hash, iterations, salt} = generateHash(password);

    // create user

    const user = await User.create({
      name,
      email,
      userName,
      hash,
      iterations,
      salt,
    });

    // send token

    createSendToken(user, 201, req, res);
  },
);

// login user

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {userNameOrEmail, password} = req.body;

    // check if all the required fields are provided

    if (checkNull(userNameOrEmail) || checkNull(password)) {
      return next(
        new ErrorHandler('Please provide all the required fields', 400),
      );
    }

    // check if the user exists

    const user = await User.findOne({
      $or: [{email: userNameOrEmail}, {userName: userNameOrEmail}],
    }).select('+hash +salt +iterations');

    // if user does not exist, return error

    if (!user) {
      return next(new ErrorHandler('Invalid credentials', 400));
    }

    // verify password

    const {hash, salt, iterations} = user;

    const isValid = verifyHash(password, salt, hash, iterations);

    // if password is invalid, return error

    if (!isValid) {
      return next(new ErrorHandler('Invalid credentials', 400));
    }

    // send token

    createSendToken(user, 200, req, res);
  },
);

// logout user

export const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const options = {
      expires: new Date(Date.now() + 1000),
      httpOnly: true,
    };

    // set cookie to null

    res.status(200).cookie('jwttoken', null, options).json({
      status: 'success',
    });
  },
);

// get my profile

export const myProfile = catchAsync(
  async (req: UserRequest, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      status: 'success',
      user: req.user,
    });
  },
);
