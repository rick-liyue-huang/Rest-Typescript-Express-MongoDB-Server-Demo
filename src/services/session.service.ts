import { ISessionType, SessionModel } from '../models/session.model';

export async function createSessionService(userId: string, userAgent: string) {
  const session = (await SessionModel.create({
    user: userId,
    userAgent
  })) as ISessionType;

  return session.toJSON();
}
