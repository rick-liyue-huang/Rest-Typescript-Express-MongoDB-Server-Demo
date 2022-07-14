import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

/**
 * @define User model type,
 */
export interface IUserType extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

/**
 * @define create user schema
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
 * @description add the hash password on user
 */
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
 * @description add comparePassword method to deal with user validation
 * @param candidatePassword
 */
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as IUserType;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

export const UserModel = mongoose.model<IUserType>('User', UserSchema);
