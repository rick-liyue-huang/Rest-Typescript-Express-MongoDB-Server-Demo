import { DocumentDefinition } from 'mongoose';
import { IUserType, UserModel } from '../models/user.model';

/**
 * @define connect with mongoDB and create the user by 'UserModel.create' method
 * @param input: same as the zod type in 'user.schema', I also need to omit some optional fields to match the zod type
 * so the last types both contain 'name, email, password'
 */
export const createUserService = async (
  input: DocumentDefinition<
    Omit<IUserType, 'createdAt' | 'updatedAt' | 'comparePassword'>
  >
) => {
  try {
    // create the user in mongodb and return to controller
    return await UserModel.create(input);
  } catch (err: any) {
    throw new Error(err);
  }
};
