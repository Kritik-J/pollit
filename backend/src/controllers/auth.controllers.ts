import {NextFunction, Request, Response} from 'express';

export const sendOTP = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {email} = req.body;

  if (!email || email.trim() === '') {
  }
};

export const verifyOTP = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};
