import { Request, Response } from 'express';
import logger from '../utils/logger';
import { createUserService } from '../services/user.service';
import { unknown } from 'zod';
import { CreateUserInput } from '../schemas/user.schema';

/**
 * @define the controller used to connect service with route for MVC
 * @param req
 * @param res
 * @description 'CreateUserInput' and 'createUserService' need to match each other
 */
export const createUserController = async (
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response
) => {
  try {
    const user = await createUserService(req.body);
    return res.send(user);
  } catch (err: any) {
    logger.error(err);
    return res.status(409).send(err.message);
  }
};
