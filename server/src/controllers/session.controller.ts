import { Request, Response } from 'express';
import { validatePassword } from '../services/user.service';
import {
  createSessionService,
  deleteSessionService,
  getSessionService
} from '../services/session.service';
import { signJWT } from '../utils/jwt.util';
import config from 'config';

/**
 * @define
 * @param req
 * @param res
 */
export const createSessionController = async (req: Request, res: Response) => {
  //  1. validate the user's password
  console.log(req.body);
  const { email, password } = req.body;
  const user = await validatePassword({ email, password });

  if (!user) {
    return res.status(401).send('invalid email or password');
  }
  //  2. crate a session
  const session = await createSessionService(
    user._id,
    req.get('user-agent') || ''
  );
  //  3. create access token
  const accessToken = signJWT(
    {
      ...user,
      session: session._id
    },
    {
      expiresIn: config.get<string>('accessTokenTimeDuration')
    }
  );
  //  4. create refresh token
  const refreshToken = signJWT(
    {
      ...user,
      session: session._id
    },
    {
      expiresIn: config.get<string>('refreshTokenTimeDuration')
    }
  );
  //  5. return access and refresh token
  return res.send({ accessToken, refreshToken });
};

export const getSessionController = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;

  const session = await getSessionService({ user: userId, valid: true });

  console.log('session: in getSessionController: ', session);
  return res.send(session);
};

/**
 * @define always remember that user.session = session._id, session.user = user._id
 * @param req
 * @param res
 */
export const deleteSessionController = async (req: Request, res: Response) => {
  const sessionId = res.locals.user.session;

  // actually it is update the valid to false, and let the session invalid
  await deleteSessionService({ _id: sessionId }, { valid: false });

  return res.status(200).send({
    accessToken: null,
    refreshToken: null
  });
};
