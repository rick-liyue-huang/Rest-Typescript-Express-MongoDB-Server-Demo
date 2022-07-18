import { Request, Response } from 'express';
import chalk from 'chalk';
import { omit } from 'lodash';
import { createUserService } from '../services/user.service';
import { CreateUserInput } from '../zod-schemas/user.schema';

export const createUserController = async (
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response
) => {
  try {
    // here use req.body after the validateResources middleware, so let the req.body match with zod type
    // in order to match the zod input type with mongoDB user type, need to omit some properties!!!
    const user = await createUserService(req.body);
    console.log('user: ----', user);
    // todo
    return res.send(omit(user, 'password'));
  } catch (err: any) {
    console.log(chalk.bgRedBright(err));
    return res.status(409).send(err.message); // conflict
  }
};
