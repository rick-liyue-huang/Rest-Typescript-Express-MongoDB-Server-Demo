import mongoose, { Document } from 'mongoose';
import { IUserType } from './user.model';

/**
 * @define create the session document type in mongodb
 */
export interface ISessionType extends Document {
  user: IUserType['_id'];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * @define the session schema match with session type in mongodb
 */
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
 * @define create the document
 */
export const SessionModel = mongoose.model<ISessionType>(
  'Session',
  SessionSchema
);
