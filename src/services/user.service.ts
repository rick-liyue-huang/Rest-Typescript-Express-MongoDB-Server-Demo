import { DocumentDefinition } from 'mongoose';
import { IUserType, UserModel } from '../models/user.model';
import { omit } from 'lodash';

/**
 * @define create the user document in mongoDB when register
 * @param input: need to omit the three fields to match with zod input type
 */
export const createUserService = async (
  input: DocumentDefinition<
    Omit<IUserType, 'createdAt' | 'updatedAt' | 'comparePassword'>
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
 * @define to get the user from mongoDB when login
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
  // get existing user through email
  const user = await UserModel.findOne({ email: email });

  if (!user) {
    return false;
  }
  // confirm the password is correct. NOW the user look like 'const user: IUserType & {_id: Types.ObjectId}'
  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return false;
  }

  return omit(user.toJSON(), 'password');
};
