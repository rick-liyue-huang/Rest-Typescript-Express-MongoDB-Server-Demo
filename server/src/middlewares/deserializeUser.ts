import { NextFunction, Request, Response } from 'express';
import { verifyJWT } from '../utils/jwt.util';
import { get } from 'lodash';
import { getBackAccessToken } from '../services/session.service';

/**
 * @define when the user login, the session for current user is created in mongodb,
 * and can get the access token and refresh token from headers,
 * and then get user from the jwt token
 * store the user info in res.locals.user for the requireUser and following controllers
 * @param req
 * @param res
 * @param next
 * @note  decoded.session = session._id  session.user = user._id
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
  if (!accessToken) {
    return next();
  }

  const refreshToken = get(req, 'headers.x-refresh');

  const { decoded, expired } = verifyJWT(accessToken);

  // until now the access token is valid (expired is false)
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  // now consider the access token is expired and refresh is valid, to get back access token
  if (expired && refreshToken) {
    console.log('-----------', expired, refreshToken);
    const newAccessToken = await getBackAccessToken({ refreshToken });

    console.log('newAccessToken: -------', newAccessToken);

    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken);
    }

    const result = verifyJWT(newAccessToken as string);
    res.locals.user = result.decoded;

    return next();
  }

  return next();
};
