import {NextFunction, Request, Response} from 'express';
import errorHandler from '../utils/errorHandler.js';

const error = (
  err: errorHandler,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  // Wrong mongodb Id error

  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new errorHandler(message, 400);
  }

  // mongoose duplicate key error

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new errorHandler(message, 400);
  }

  // wrong json web token error

  if (err.name === 'JsonWebTokenError') {
    const message = `Json web token is invalid, try again`;
    err = new errorHandler(message, 400);
  }

  // jwt expire error

  if (err.name === 'TokenExpireError') {
    const message = `Json web token is expired, try again`;
    err = new errorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    status: err.statusCode,
    // error: err.stack,
    message: err.message,
  });
};

export default error;
