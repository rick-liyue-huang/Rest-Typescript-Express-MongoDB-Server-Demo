import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

/**
 * @define create one middleware to connect zod with controller rules
 * @param schema
 */
export const validateResources =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body, // the body is the input type from frontend
        query: req.query,
        params: req.params
      });
      next();
    } catch (err: any) {
      return res.status(400).send(err.errors);
    }
  };
