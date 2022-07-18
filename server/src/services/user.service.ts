import mongoose, { DocumentDefinition } from 'mongoose';
import { IUserType, UserModel } from '../models/user.model';

/**
 * @define service used to connect with mongoDB through UserModel
 * @param input
 */
export const createUserService = async (
  input: DocumentDefinition<
    Omit<IUserType, 'comparePassword' | 'createdAt' | 'updatedAt'>
  >
) => {
  try {
    return await UserModel.create(input);
  } catch (err: any) {
    throw new Error(err);
  }
};
