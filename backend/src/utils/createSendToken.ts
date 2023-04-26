import {Request, Response} from 'express';
import {removeHash} from './password.js';

const createSendToken = (
  user: any,
  statusCode: number,
  req: Request,
  res: Response,
) => {
  const token = user.generateAuthToken();
  const jwtCookieExpiresIn = Number(process.env.JWT_COOKIE_EXPIRES_IN);

  //   set cookie

  const options = {
    expires: new Date(Date.now() + jwtCookieExpiresIn * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  };

  //   remove salt, hash and iterations from user object

  user = removeHash(user);

  res.status(statusCode).cookie('jwttoken', token, options).json({
    status: 'success',
    user,
    token,
  });
};

export default createSendToken;
