import { DocumentDefinition } from 'mongoose';
import { IUserType, UserModel } from '../models/user.model';

/**
 * @define connect with mongoDB user in service
 * @param input: need to omit the three fields to match with zod input type
 */
export const createUserService = async (
  input: DocumentDefinition<
    Omit<IUserType, 'createdAt' | 'updatedAt' | 'comparePassword'>
  >
) => {
  try {
    return await UserModel.create(input);
  } catch (err: any) {
    throw new Error(err);
  }
};
