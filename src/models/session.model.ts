import mongoose from 'mongoose';
import { IUserType } from './user.model';

export interface ISessionType extends mongoose.Document {
  user: IUserType['_id'];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    valid: { type: Boolean, default: true },
    userAgent: { type: String }
  },
  {
    timestamps: true
  }
);

export const SessionModel = mongoose.model('Session', SessionSchema);
