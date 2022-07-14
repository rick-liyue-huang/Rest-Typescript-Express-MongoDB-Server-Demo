import { Request, Response } from 'express';
import { validatePassword } from '../services/user.service';
import { createSessionService } from '../services/session.service';
import { signJWT } from '../utils/jwt.utils';
import config from 'config';

export const createUserSessionController = async (
  req: Request,
  res: Response
) => {
  //  validate the password
  const user = await validatePassword(req.body);
  if (!user) {
    return res.status(401).send('invalid email or password');
  }
  //  create the session
  const session = await createSessionService(
    user._id,
    req.get('user-agent') || ''
  );

  //  create user token
  const accessToken = signJWT(
    {
      ...user,
      session: session._id
    },
    {
      expiresIn: config.get('accessTokenTimeDuration')
    }
  );
  //  create refresh token
  const refreshToken = signJWT(
    {
      ...user,
      session: session._id
    },
    {
      expiresIn: config.get('refreshTokenTimeDuration')
    }
  );
  //  return access and refresh token
  return res.send({ accessToken, refreshToken });
};
