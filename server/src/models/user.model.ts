import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

/**
 * note: the whole thing in this file deal with the mongoDB in DB, so the type is same as
 * {
 *   _id: ObjectId(xxx)
 *   email: string;
 *   name: string;
 *   password: string;
 *   createdAt: Date;
 *   updatedAt: Date;
 * }
 */

/**
 * @define the user type in mongoDB
 */
export interface IUserType extends Document {
  email: string;
  name: string;
  password: string;
  comparePassword(inputPassword: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * @define keep the schema as the IUserType
 */
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

/**
 * @define add the hook before save to mongoDB, in which the user password is stored as hashed type
 */
UserSchema.pre('save', async function (next) {
  const user = this as IUserType;

  if (!user.isModified('password')) {
    return next();
    //  is the password is modified, it will have a hash and salt
  }

  const salt = await bcrypt.genSalt(config.get<number>('passwordSaltFactor'));
  const hashedPassword = bcrypt.hashSync(user.password, salt);

  user.password = hashedPassword;

  return next();
});

/**
 * @define add method on mongoDB user document
 * @param inputPassword: the blank password
 */
UserSchema.methods.comparePassword = async function (
  inputPassword: string
): Promise<boolean> {
  const user = this as IUserType;
  return bcrypt.compare(inputPassword, user.password).catch((err) => false);
};

/**
 * @define the UseModel act as the user document in mongoDB,
 * and can be manual in service file
 */
export const UserModel = mongoose.model<IUserType>('User', UserSchema);
