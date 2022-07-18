import mongoose, { DocumentDefinition, FilterQuery } from 'mongoose';
import { IUserType, UserModel } from '../models/user.model';
import { omit } from 'lodash';

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
    const user = await UserModel.create(input);
    return omit(user.toJSON(), 'password');
  } catch (err: any) {
    throw new Error(err);
  }
};

/**
 * @define confirm the user is existing or not by email and password
 * @param email
 * @param password
 */
export const validatePassword = async ({
  email,
  password
}: {
  email: string;
  password: string;
}) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return false;
  }

  return omit(user.toJSON(), 'password');
};

export const findUserService = async (query: FilterQuery<IUserType>) => {
  return UserModel.findOne(query).lean();
};
