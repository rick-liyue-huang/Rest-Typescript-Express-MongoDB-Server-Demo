import { Request, Response } from 'express';
import { validatePassword } from '../services/user.service';
import { createSessionService } from '../services/session.service';
import { signJWT } from '../utils/jwt.utils';
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
  const accessToken = await signJWT(
    {
      ...user,
      session: session._id
    },
    {
      expiresIn: config.get<string>('accessTokenTimeDuration')
    }
  );

  //  4.create refreshToken
  const refreshToken = await signJWT(
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
