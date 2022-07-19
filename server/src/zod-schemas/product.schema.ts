import { number, object, string, TypeOf } from 'zod';

const payload = {
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

const params = {
  params: object({
    productId: string({
      required_error: 'product id is required'
    })
  })
};

export const createProductSchema = object({
  ...payload
});

export const updateProductSchema = object({
  ...payload,
  ...params
});

export const getProductSchema = object({
  ...params
});

export const deleteProductSchema = object({
  ...params
});

export type CreateProductType = TypeOf<typeof createProductSchema>;
export type UpdateProductType = TypeOf<typeof updateProductSchema>;
export type DeleteProductType = TypeOf<typeof deleteProductSchema>;
export type GetProductType = TypeOf<typeof getProductSchema>;
