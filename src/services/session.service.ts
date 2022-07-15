import { ISessionType, SessionModel } from '../models/session.model';

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
