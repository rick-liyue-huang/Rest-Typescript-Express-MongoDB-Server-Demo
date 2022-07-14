import { DocumentDefinition } from 'mongoose';
import { IUserType, UserModel } from '../models/user.model';
import { omit } from 'lodash';

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
    const user = await UserModel.create(input);
    return omit(user.toJSON(), 'password');
  } catch (err: any) {
    throw new Error(err);
  }
};

/**
 * @description if not found email or password no match, it will return false, otherwise it will return the email only
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
  const user = await UserModel.findOne({ email: email });
  if (!user) {
    return false;
  }
  // UserModel = mongoose.model<IUserType>('User', UserSchema);
  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return false;
  }

  return omit(user.toJSON(), 'password');
};
