import {Request, Response, NextFunction} from 'express';

const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: Error) => {
      if (process.env.ENVIRONMENT === 'development') {
        console.log(err.message);
      }
      next(err);
    });
  };
};

export default catchAsync;
