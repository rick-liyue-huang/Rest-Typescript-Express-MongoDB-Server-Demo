import mongoose, { Document } from 'mongoose';
import { IUserType } from './user.model';

/**
 * @define create the session type
 */
export interface ISessionType extends Document {
  user: IUserType['_id'];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

export const SessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    valid: {
      type: Boolean,
      default: true
    },
    userAgent: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

/**
 * @define create session document in mongoDB
 */
export const SessionModel = mongoose.model<ISessionType>(
  'Session',
  SessionSchema
);
