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
  const result = await ProductModel.create(input);
  return result;
};

export const findProductService = async (
  query: FilterQuery<IProductType>,
  options: QueryOptions = { lean: true }
) => {
  const result = await ProductModel.findOne(query, {}, options);
  return result;
};

export const findAndUpdateProductService = async (
  query: FilterQuery<IProductType>,
  update: UpdateQuery<IProductType>,
  options: QueryOptions
) => {
  const result = await ProductModel.findOneAndUpdate(query, update, options);
  return result;
};

export const deleteProductService = async (
  query: FilterQuery<IProductType>
) => {
  return ProductModel.deleteOne(query);
};
