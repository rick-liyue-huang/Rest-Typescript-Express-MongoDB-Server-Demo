import { IProductType, ProductModel } from '../models/product.model';
import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery
} from 'mongoose';
import { assignWith } from 'lodash';

export const createProductService = async (
  input: DocumentDefinition<Omit<IProductType, 'createdAt' | 'updatedAt'>>
) => {
  const product = await ProductModel.create(input);
  return product;
};

export const getProductService = async (
  query: FilterQuery<IProductType>,
  options: QueryOptions = { lean: true }
) => {
  const product = await ProductModel.findOne(query, {}, options);
  return product;
};

export const getAndUpdateProductService = async (
  query: FilterQuery<IProductType>,
  update: UpdateQuery<IProductType>,
  options: QueryOptions
) => {
  const product = await ProductModel.findOneAndUpdate(query, update, options);
  return product;
};

export const deleteProductService = async (
  query: FilterQuery<IProductType>
) => {
  await ProductModel.deleteOne(query);
};
