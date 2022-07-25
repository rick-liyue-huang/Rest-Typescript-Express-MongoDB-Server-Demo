import { AnyZodObject } from 'zod';
import { NextFunction, Request, Response } from 'express';

/**
 * @define connect zod type with mongoose user type
 * @param schema.body === req.body
 */
export const validateResources =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query
      });
      next();
    } catch (err: any) {
      return res.status(401).send(err.errors);
    }
  };
