import mongoose from 'mongoose';
import { IUserType } from './user.model';
import { string } from 'zod';

/**
 * @define create the session type, to deal with authorization
 */
export interface ISessionType extends mongoose.Document {
  user: IUserType['_id'];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * @define define the mongoose type
 */
const SessionSchema = new mongoose.Schema(
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

export const SessionModel = mongoose.model('Session', SessionSchema);
