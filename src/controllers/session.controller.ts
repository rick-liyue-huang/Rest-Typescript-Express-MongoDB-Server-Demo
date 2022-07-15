import { Request, Response } from 'express';
import { validatePassword } from '../services/user.service';
import {
  createSessionService,
  getUserSessionService,
  updateSessionService
} from '../services/session.service';
import { signJWT } from '../utils/jwt.util';
import { ISessionType } from '../models/session.model';
import config from 'config';

/**
 * @define deal with the authentication logic after login
 * @param req
 * @param res
 */
export const createSessionController = async (req: Request, res: Response) => {
  //  1.validate the password when login
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send('Invalid email or password');
  }
  //  2.after login, create the session
  const session = await createSessionService(
    user._id,
    req.get('user-agent') || ''
  );
  //  3.create accessToken
  const accessToken = signJWT(
    {
      ...user,
      session: session._id
    },
    {
      expiresIn: config.get<string>('accessTokenTimeDuration')
    }
  );

  //  4.create refreshToken
  const refreshToken = signJWT(
    {
      ...user,
      session: session._id
    },
    {
      expiresIn: config.get<string>('refreshTokenTimeDuration')
    }
  );
  //  5.return accessToken and refreshToken
  return res.send({ accessToken, refreshToken });
};

/**
 * @define get the sessions info from the mongoDB, here I use middleware to get the user info firstly
 * @param req
 * @param res
 */
export const getUserSessionController = async (req: Request, res: Response) => {
  // after the middleware 'deserializeUserUtil', and also need 'res.locals.user' is existed by middleware 'requireUser.util.ts'
  const userId = res.locals.user._id;

  console.log('res.locals.user: ', res.locals.user);

  const session = await getUserSessionService({ user: userId, valid: true });

  console.log('session: ', { session });

  return res.send(session);
};

/**
 * @define delete session from logout
 */
export const deleteSessionController = async (req: Request, res: Response) => {
  console.log('res.locals.users: ', res.locals.users);
  const sessionId = res.locals.user.session;

  await updateSessionService({ _id: sessionId }, { valid: false });

  return res.status(200).send({
    accessToken: null,
    refreshToken: null
  });
};
