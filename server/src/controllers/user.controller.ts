import { Request, Response } from 'express';
import { createUserService } from '../services/user.service';
import { CreateUserInput } from '../schemas/user.schema';

/**
 * @define creat user controller for res with user
 * @param req: req.body = schema.body, containing {email, name, password, passwordConfirmation}, but have to remove passwordConfirmation
 * @param res
 */
export const createUserController = async (
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response
) => {
  try {
    const user = await createUserService(req.body);
    return res.status(200).send(user);
  } catch (err: any) {
    return res.status(409).send(err.message); // conflict for duplicated user
  }
};
