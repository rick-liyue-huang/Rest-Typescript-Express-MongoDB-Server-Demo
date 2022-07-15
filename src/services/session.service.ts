import { ISessionType, SessionModel } from '../models/session.model';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { signJWT, verifyJWT } from '../utils/jwt.util';
import { get } from 'lodash';
import { findUserService } from './user.service';
import config from 'config';

/**
 * @define deal with the mongodb with controller
 * @param userId: format: ObjectId('62d0cc3daed5b9a25f7a4fda')
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

  return session.toJSON();
};

export const getUserSessionService = async (
  query: FilterQuery<ISessionType>
) => {
  return SessionModel.find(query).lean(); // same as json to return the plain object
};

export const updateSessionService = async (
  query: FilterQuery<ISessionType>,
  update: UpdateQuery<ISessionType>
) => {
  return SessionModel.updateOne(query, update);
};

export const getBackAccessTokenService = async ({
  refreshToken
}: {
  refreshToken: string;
}) => {
  const { decoded } = verifyJWT(refreshToken);

  if (!decoded || !get(decoded, 'session')) {
    return false;
  }

  const session = await SessionModel.findById(get(decoded, 'session'));

  if (!session || !session.valid) {
    return false;
  }

  // remember that:::user._id === session.user
  const user = await findUserService({ _id: session.user });

  if (!user) {
    return false;
  }

  //  if here have user, it will get the new access token
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
