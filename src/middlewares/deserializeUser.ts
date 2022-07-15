import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';
import { verifyJWT } from '../utils/jwt.util';
import { getBackAccessTokenService } from '../services/session.service';

/**
 * @define from accessToken to get the user info, and the info will pass to the controller
 * @param req
 * @param res
 * @param next
 */
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

  const { expired, decoded } = verifyJWT(accessToken);

  console.log('decoded', decoded);

  // if the access token is valid
  if (decoded) {
    // save the user info in res.locals.user
    res.locals.user = decoded;
    return next();
  }

  // if the access token is expired and still have refresh token
  if (expired && refreshToken) {
    const newAccessToken = await getBackAccessTokenService({ refreshToken });

    console.log('new access token: ', newAccessToken);

    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken);
    }

    const result = verifyJWT(newAccessToken as string);

    res.locals.user = result.decoded;
    return next();
  }

  return next();
};
