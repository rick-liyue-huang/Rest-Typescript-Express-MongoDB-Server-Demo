import { Express, Request, Response } from 'express';
import { createUserController } from './controllers/user.controller';
import { validateResources } from './middlewares/validateResources';
import { createUserSchema } from './schemas/user.schema';
import { createSessionController } from './controllers/session.controller';
import { createSessionSchema } from './schemas/session.schema';

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
};
