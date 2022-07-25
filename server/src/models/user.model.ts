import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

/**
 * @define the User type in MongoDB
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
 * @define create User Schema for MongoDB
 */
export const UserSchema = new mongoose.Schema(
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
 * @define the schema password will be in hashed
 */
UserSchema.pre('save', async function (next) {
  const user = this as IUserType;

  if (!user.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(config.get<number>('passwordSaltFactor'));
  const hashedPassword = bcrypt.hashSync(user.password, salt);
  user.password = hashedPassword;
  return next();
});

/**
 * @define create the comparePassword method for sign in
 * @param inputPassword
 */
UserSchema.methods.comparePassword = async function (
  inputPassword: string
): Promise<boolean> {
  const user = this as IUserType;
  return bcrypt.compare(inputPassword, user.password).catch((err) => false);
};

export const UserModel = mongoose.model<IUserType>('User', UserSchema);
