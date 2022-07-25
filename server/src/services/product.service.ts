import { IProductType, ProductModel } from '../models/product.model';
import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery
} from 'mongoose';

export const createProductService = async (
  input: DocumentDefinition<Omit<IProductType, 'createdAt' | 'updatedAt'>>
) => {
  try {
    return await ProductModel.create(input);
  } catch (err: any) {
    throw new Error(err);
  }
};

export const getProductService = async (
  query: FilterQuery<IProductType>,
  options: QueryOptions = { lean: true }
) => {
  try {
    return await ProductModel.findOne(query, {}, options);
  } catch (err: any) {
    throw new Error(err);
  }
};

export const getAndUpdateProductService = async (
  query: FilterQuery<IProductType>,
  update: UpdateQuery<IProductType>,
  options: QueryOptions = { lean: true }
) => {
  try {
    return await ProductModel.findOneAndUpdate(query, update, options);
  } catch (err: any) {
    throw new Error(err);
  }
};

export const getAndDeleteProductService = async (
  query: FilterQuery<IProductType>
) => {
  try {
    return await ProductModel.deleteOne(query);
  } catch (err: any) {
    throw new Error(err);
  }
};
