import { Express, Request, Response } from 'express';
import { createUserController } from './controllers/user.controller';
import { validateResources } from './middlewares/validateResources';
import { createUserSchema } from './schemas/user.schema';
import {
  createSessionController,
  deleteSessionController,
  getUserSessionController
} from './controllers/session.controller';
import { createSessionSchema } from './schemas/session.schema';
import { requireUser } from './middlewares/requireUser';
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema
} from './schemas/product.schema';
import {
  createProductController,
  deleteProductController,
  getProductController,
  updateProductController
} from './controllers/product.controller';

export const routes = (app: Express) => {
  app.get('/testroute', (req: Request, res: Response) => {
    res.sendStatus(200); //  curl http://localhost:1336/testroute
  });

  // add validateResources middleware to let zod can be recognized in controller
  app.post(
    '/api/users',
    validateResources(createUserSchema),
    createUserController
  );

  app.post(
    '/api/sessions',
    validateResources(createSessionSchema),
    createSessionController
  );

  app.get('/api/sessions', requireUser, getUserSessionController);

  app.delete('/api/sessions', requireUser, deleteSessionController);

  app.get(
    '/api/products/:productId',
    validateResources(getProductSchema),
    getProductController
  );

  app.post(
    '/api/products',
    [requireUser, validateResources(createProductSchema)],
    createProductController
  );

  app.put(
    '/api/products/:productId',
    [requireUser, validateResources(updateProductSchema)],
    updateProductController
  );

  app.delete(
    '/api/products/:productId',
    [requireUser, validateResources(deleteProductSchema)],
    deleteProductController
  );
};
