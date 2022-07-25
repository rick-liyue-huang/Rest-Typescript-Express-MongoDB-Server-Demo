import { Request, Response, Express } from 'express';
import { createUserController } from './controllers/user.controller';
import { validateResources } from './middlewares/validateResources';
import { createUserSchema } from './schemas/user.schema';
import { createSessionSchema } from './schemas/session.schema';
import {
  createSessionController,
  deleteSessionController,
  getSessionController
} from './controllers/session.controller';
import { requiredUser } from './middlewares/requiredUser';

/**
 * @define create the routes for the whole project
 * @param app
 */
export const routes = (app: Express) => {
  app.get('/api/test', (req: Request, res: Response) => {
    res.sendStatus(200);
  });

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

  app.get('/api/sessions', requiredUser, getSessionController);

  app.delete('/api/sessions', requiredUser, deleteSessionController);
};
