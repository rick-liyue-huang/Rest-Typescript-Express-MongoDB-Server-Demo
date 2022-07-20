import { Express, Request, Response } from 'express';
import {
  createUserController,
  getUserController
} from './controllers/user.controller';
import { validateResources } from './middlewares/validateResources';
import { createUserService } from './services/user.service';
import { createUserSchema } from './zod-schemas/user.schema';
import {
  createSessionController,
  deleteSessionController,
  getSessionController
} from './controllers/session.controller';
import { createSessionSchema } from './zod-schemas/session.schema';
import { deserializeUser } from './middlewares/deserializeUser';
import { requireUser } from './middlewares/requireUser';
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema
} from './zod-schemas/product.schema';
import {
  createProductController,
  deleteProductController,
  getProductController,
  updateProductController
} from './controllers/product.controller';

export const routes = (app: Express) => {
  app.get('/routes-check', (req: Request, res: Response) => {
    res.send(`this is route check`);
    //   curl http://localhost:1336/routes-check
  });

  app.post(
    '/api/users',
    validateResources(createUserSchema),
    createUserController
  );

  app.get('/api/me', requireUser, getUserController);

  app.post(
    '/api/sessions',
    validateResources(createSessionSchema),
    createSessionController
  );

  app.get('/api/sessions', requireUser, getSessionController);

  app.delete('/api/sessions', requireUser, deleteSessionController);

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

  app.get(
    '/api/products/:productId',
    [requireUser, validateResources(getProductSchema)],
    getProductController
  );

  app.delete(
    '/api/products/:productId',
    [requireUser, validateResources(deleteProductSchema)],
    deleteProductController
  );
};
