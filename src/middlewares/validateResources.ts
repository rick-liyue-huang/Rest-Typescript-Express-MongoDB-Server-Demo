import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

/**
 *
 * @param schema
 * @return function
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
