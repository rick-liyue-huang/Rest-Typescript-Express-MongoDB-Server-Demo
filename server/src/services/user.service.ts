import { DocumentDefinition, FilterQuery } from 'mongoose';
import { IUserType, UserModel } from '../models/user.model';
import { omit } from 'lodash';
import exp from 'constants';

/**
 * @define create the service to create the user document in mongodb
 * @param input
 * @note must match the zod type with mongodb type with omit
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
    throw new Error(err); // be caught in controller
  }
};

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

  const isValid = user.comparePassword(password);
  if (!isValid) {
    return false;
  }

  return omit(user.toJSON(), 'password');
};

export const getUserService = async (query: FilterQuery<IUserType>) => {
  try {
    const user = await UserModel.findOne(query).lean();
    return user;
  } catch (err: any) {
    throw new Error(err);
  }
};
