import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IUserType } from './user.model';

// const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

export interface ProductInput {
  user: IUserType['_id'];
  title: string;
  description: string;
  price: number;
  image: string;
}

export interface IProductType extends mongoose.Document {
  user: IUserType['_id'];
  title: string;
  description: string;
  price: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  productId: string;
}

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      default: () => `product_${uuidv4()}`
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

export const ProductModel = mongoose.model<IProductType>(
  'Product',
  productSchema
);
