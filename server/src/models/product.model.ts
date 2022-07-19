import mongoose, { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IUserType } from './user.model';

export interface IProductType extends Document {
  user: IUserType['_id'];
  title: string;
  description: string;
  image: string;
  price: number;
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
    image: {
      type: String,
      required: true
    },
    price: {
      type: Number,
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
