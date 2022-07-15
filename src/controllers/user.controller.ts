import { Request, Response } from 'express';
import { log } from 'console-log-colors';
import dayjs from 'dayjs';
import { createUserService } from '../services/user.service';
import { CreateUserInput, createUserSchema } from '../schemas/user.schema';
import { omit } from 'lodash';

/**
 * @define create the 'create user controller'
 * @param req: req.body is matched with the zod type
 * @param res
 */
export const createUserController = async (
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response
) => {
  try {
    const user = await createUserService(req.body);
    // do not show the password field
    return res.send(omit(user.toJSON(), 'password'));
  } catch (err: any) {
    log.bgRedBright(`${err}`);
    return res.status(409).send({ err });
  }
};
