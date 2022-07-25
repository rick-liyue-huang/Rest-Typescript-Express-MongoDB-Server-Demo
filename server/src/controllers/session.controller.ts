import { Request, Response } from 'express';
import { assignWith } from 'lodash';
import {
  createSessionService,
  deleteSessionService,
  getSessionService
} from '../services/session.service';
import config from 'config';
import { validatePassword } from '../services/user.service';
import { signJWT } from '../utils/jwt.util';
import { CreateSessionInput } from '../schemas/session.schema';

/**
 * @define create the controller for login in front end
 * @param req
 * @param res
 */
export const createSessionController = async (
  req: Request<{}, {}, CreateSessionInput['body']>,
  res: Response
) => {
  // 1. validate the user's password
  const user = await validatePassword(req.body);
  if (!user) {
    return res.sendStatus(401);
  }
  // 2. create session in mongodb used to store the user info
  const session = await createSessionService(
    user._id,
    req.get('user-agent') || ''
  );
  // 3. create access token
  const accessToken = signJWT(
    {
      ...user,
      session: session._id
    },
    {
      expiresIn: config.get<string>('accessTokenTimeDuration')
    }
  );
  // 4. create refresh token
  const refreshToken = signJWT({
    ...user,
    session: session._id
  });
  // 5. return tokens
  return res.status(200).send({ accessToken, refreshToken });
};

export const getSessionController = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;
  console.log('userid:', userId);
  const sessions = await getSessionService({ user: userId, valid: true });
  return res.status(200).send(sessions);
};

export const deleteSessionController = async (req: Request, res: Response) => {
  const sessionId = res.locals.user.session;
  await deleteSessionService({ _id: sessionId }, { valid: false });
  return res.status(200).send({ accessToken: null, refreshToken: null });
};
