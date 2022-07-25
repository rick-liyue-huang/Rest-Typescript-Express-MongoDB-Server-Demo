import { ISessionType, SessionModel } from '../models/session.model';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { query } from 'express';
import { assignWith, get, update } from 'lodash';
import { signJWT, verifyJWT } from '../utils/jwt.util';
import config from 'config';
import { getUserService } from './user.service';

/**
 * @define create session document in mongoDB
 * @param userId
 * @param userAgent
 */
export const createSessionService = async (
  userId: string,
  userAgent: string
) => {
  try {
    const session = await SessionModel.create({
      user: userId,
      userAgent: userAgent
    });
    return session;
  } catch (err: any) {
    throw new Error(err);
  }
};

/**
 * @define query is {} type
 * @param query
 */
export const getSessionService = async (query: FilterQuery<ISessionType>) => {
  try {
    const sessions = await SessionModel.find(query).lean(); // similar as json
    return sessions;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const deleteSessionService = async (
  query: FilterQuery<ISessionType>,
  update: FilterQuery<ISessionType>
) => {
  try {
    const session = await SessionModel.updateOne(query, update);
    return session;
  } catch (err: any) {
    throw new Error(err);
  }
};

/**
 * @define refresh token -> decoded -> session -> user -> access token
 * @param refreshToken
 */
export const getBackAccessToken = async ({
  refreshToken
}: {
  refreshToken: string;
}) => {
  const { decoded } = verifyJWT(refreshToken);

  console.log('decoded: ---', decoded);

  if (!decoded || !get(decoded, 'session')) {
    return false;
  }

  console.log(123123);
  const session = await SessionModel.findById(get(decoded, 'session'));

  if (!session || !session.valid) {
    return false;
  }

  const user = await getUserService({ _id: session.user });

  console.log('user: ---', user);

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
