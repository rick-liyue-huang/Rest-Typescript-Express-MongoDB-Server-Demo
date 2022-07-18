import { ISessionType, SessionModel } from '../models/session.model';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { signJWT, verifyJWT } from '../utils/jwt.util';
import { get } from 'lodash';
import { findUserService } from './user.service';
import config from 'config';

/**
 * @define
 * @param userId: mongoose.Types.ObjectId
 * @param userAgent: the browser type
 */
export const createSessionService = async (
  userId: string,
  userAgent: string
) => {
  const session = (await SessionModel.create({
    user: userId,
    userAgent: userAgent
  })) as ISessionType;
  console.log('session: ', session);
  return session.toJSON();
};

export const getSessionService = async (query: FilterQuery<ISessionType>) => {
  return SessionModel.find(query).lean(); // same as json
};

export const deleteSessionService = async (
  query: FilterQuery<ISessionType>,
  update: UpdateQuery<ISessionType>
) => {
  return SessionModel.updateOne(query, update);
};

export const getBackAccessToken = async (refreshToken: string) => {
  const { decoded } = verifyJWT(refreshToken);

  if (!decoded || !get(decoded, 'session')) {
    return false;
  }

  const session = await SessionModel.findById(get(decoded, 'session'));

  if (!session || !session.valid) {
    return false;
  }

  const user = await findUserService({ _id: session.user });

  if (!user) {
    return false;
  }

  const accessToken = signJWT(
    {
      ...user,
      session: session._id
    },
    {
      expiresIn: config.get<string>('accessTokenTimeDuration')
    }
  );

  return accessToken;
};
