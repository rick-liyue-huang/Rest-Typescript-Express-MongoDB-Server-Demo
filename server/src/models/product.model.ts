import mongoose, { Document } from 'mongoose';
import config from 'config';
import { v4 as uuidv4 } from 'uuid';
import { IUserType } from './user.model';
import { string } from 'zod';

export interface IProductType extends Document {
  user: IUserType['_id'];
  title: string;
  description: string;
  price: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export const ProductSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      default: () => `product_${uuidv4()}`
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const ProductModel = mongoose.model<IProductType>(
  'Product',
  ProductSchema
);
