import { Request, Response } from 'express';
import {
  CreateProductInput,
  DeleteProductInput,
  GetProductInput,
  UpdateProductInput
} from '../schemas/product.schema';
import {
  createProductService,
  deleteProductService,
  findAndUpdateProductService,
  findProductService
} from '../services/product.service';

export const getProductController = async (
  req: Request<GetProductInput['params']>,
  res: Response
) => {
  const productId = req.params.productId;
  const product = await findProductService({ productId });

  if (!product) {
    return res.sendStatus(404);
  }

  return res.send(product);
};

export const createProductController = async (
  req: Request<{}, {}, CreateProductInput['body']>,
  res: Response
) => {
  const userId = res.locals.user._id;

  const body = req.body;

  const product = await createProductService({ ...body, user: userId });

  return res.send(product);
};

export const updateProductController = async (
  req: Request<UpdateProductInput['params']>,
  res: Response
) => {
  const userId = res.locals.user._id;

  const productId = req.params.productId;
  const update = req.body;

  const product = await findProductService({ productId });

  if (!product) {
    return res.sendStatus(404);
  }

  if (String(product.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedProduct = await findAndUpdateProductService(
    { productId },
    update,
    {
      new: true
    }
  );

  return res.send(updatedProduct);
};

export const deleteProductController = async (
  req: Request<DeleteProductInput['params']>,
  res: Response
) => {
  const userId = res.locals.user._id;
  const productId = req.params.productId;

  const product = await findProductService({ productId });

  if (!product) {
    return res.sendStatus(404);
  }

  if (String(product.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteProductService({ productId });

  return res.sendStatus(200);
};
