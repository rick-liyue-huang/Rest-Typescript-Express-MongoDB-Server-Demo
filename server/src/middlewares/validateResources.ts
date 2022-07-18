import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

/**
 * @define create the connection between the zod and mongoDB
 * @param schema: {body, query, params}
 */
export const validateResources =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params
      });
      next();
    } catch (err: any) {
      return res.status(400).send(err.errors);
    }
  };
