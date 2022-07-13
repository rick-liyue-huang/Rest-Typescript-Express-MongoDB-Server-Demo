import { Express, Request, Response } from 'express';

const routes = (app: Express) => {
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200); //  `curl http://localhost:1336/healthcheck` to check the routes is ok
  });
};

export default routes;
