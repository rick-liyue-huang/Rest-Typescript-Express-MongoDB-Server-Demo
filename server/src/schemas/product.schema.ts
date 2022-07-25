import { number, object, string, TypeOf } from 'zod';

const productPayload = {
  body: object({
    title: string({
      required_error: 'title is required'
    }),
    description: string({
      required_error: 'description is required'
    }).min(10, 'at least 10 characters'),
    price: number({
      required_error: 'price is required'
    }),
    image: string({
      required_error: 'image is required'
    })
  })
};

const productParams = {
  params: object({
    productId: string({
      required_error: 'productId is required'
    })
  })
};

export const getProductSchema = object({
  ...productParams
});

export const createProductSchema = object({
  ...productPayload
});

export const updateProductSchema = object({
  ...productPayload,
  ...productParams
});

export const deleteProductSchema = object({
  ...productParams
});

export type GetProductInput = TypeOf<typeof getProductSchema>;
export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
