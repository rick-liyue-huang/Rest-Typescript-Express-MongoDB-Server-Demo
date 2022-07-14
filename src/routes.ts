import { Express, Request, Response } from 'express';
import { createUserController } from './controllers/user.controller';
import { validateResources } from './middlewares/validateResources';
import { createUserSchema } from './schemas/user.schema';
import { createUserSessionController } from './controllers/session.controller';
import { createSessionSchema } from './schemas/session.schema';

const routes = (app: Express) => {
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200); //  `curl http://localhost:1336/healthcheck` to check the routes is ok
  });

  app.post(
    '/api/users',
    validateResources(createUserSchema),
    createUserController
  );

  app.post(
    '/api/sessions',
    validateResources(createSessionSchema),
    createUserSessionController
  );
};

export default routes;
