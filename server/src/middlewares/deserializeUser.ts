import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';
import { verifyJWT } from '../utils/jwt.util';
import { getBackAccessToken } from '../services/session.service';

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, 'headers.authorization', '').replace(
    /^Bearer\s/,
    ''
  );

  const refreshToken = get(req, 'headers.x-refresh');

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyJWT(accessToken);

  if (decoded) {
    // the key point: res.locals.user = decoded
    res.locals.user = decoded;
    console.log('res.locals.user: --- ', res.locals.user);
    return next();
  }

  //
  if (expired && refreshToken) {
    const newAccessToken = await getBackAccessToken(refreshToken);

    console.log('newAccessToken: ---', newAccessToken);
    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken);
    }

    const result = verifyJWT(newAccessToken as string);

    res.locals.user = result.decoded;

    return next();
  }

  return next();
};
