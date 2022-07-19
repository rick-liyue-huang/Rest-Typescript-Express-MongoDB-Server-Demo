import { Request, Response } from 'express';
import {
  CreateProductType,
  DeleteProductType,
  GetProductType,
  UpdateProductType
} from '../zod-schemas/product.schema';
import {
  createProductService,
  deleteProductService,
  getAndUpdateProductService,
  getProductService
} from '../services/product.service';

export const createProductController = async (
  req: Request<{}, {}, CreateProductType['body']>,
  res: Response
) => {
  const userId = res.locals.user._id;

  const body = req.body;
  const product = await createProductService({ ...body, user: userId });
  return res.send(product);
};

export const updateProductController = async (
  req: Request<UpdateProductType['params']>,
  res: Response
) => {
  const userId = res.locals.user._id;
  const productId = req.params.productId;

  const update = req.body;
  const product = await getProductService({ productId });

  if (!product) {
    return res.sendStatus(404);
  }
  if (String(product.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedProduct = await getAndUpdateProductService(
    { productId },
    update,
    {
      new: true
    }
  );

  return res.status(200).send(updatedProduct);
};

export const getProductController = async (
  req: Request<GetProductType['params']>,
  res: Response
) => {
  const productId = req.params.productId;
  const product = await getProductService({ productId });
  if (!product) {
    return res.sendStatus(404);
  }

  return res.send(product);
};

export const deleteProductController = async (
  req: Request<DeleteProductType['params']>,
  res: Response
) => {
  const userId = res.locals.user._id;
  const productId = req.params.productId;

  const product = await getProductService({ productId });

  if (!product) {
    return res.sendStatus(404);
  }
  if (String(product.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteProductService({ productId });

  return res.sendStatus(200);
};
