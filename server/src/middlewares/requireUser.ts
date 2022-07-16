import { NextFunction, Request, Response } from 'express';

/**
 * @define confirm the res.locals.user is defined or throw error
 * @param req
 * @param res
 * @param next
 */
export const requireUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (!user) {
    return res.sendStatus(403);
  }

  return next();
};
