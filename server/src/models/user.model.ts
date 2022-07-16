import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

/**
 * @define User type in mongoDB
 */
export interface IUserType extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(loginPassword: string): Promise<boolean>;
}

/**
 * @define Schema with the Type
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
 * @description add hook on pre-save to add bcrypt password function
 * TODO
 */
// @ts-ignore : mongoose.HookNextFunction
UserSchema.pre('save', async function (next) {
  let user = this as IUserType;

  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get<number>('passwordSaltFactor'));
  const hashedPassword = bcrypt.hashSync(user.password, salt);

  user.password = hashedPassword;

  return next();
});

/**
 * @description add comparePassword method on user schema, and interface as well
 * @param loginPassword
 */
UserSchema.methods.comparePassword = async function (
  loginPassword: string
): Promise<boolean> {
  const user = this as IUserType;

  return bcrypt.compare(loginPassword, user.password).catch((err) => false);
};

export const UserModel = mongoose.model<IUserType>('User', UserSchema);
