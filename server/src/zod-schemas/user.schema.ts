import { object, string, TypeOf } from 'zod';

/**
 * @define the req.body = {name, email, password, passwordConfirmation} in zod type, and also match with validResources
 */
export const createUserSchema = object({
  body: object({
    email: string({
      required_error: 'register email is required'
    }).email('email is invalid'),
    name: string({
      required_error: 'register name is required'
    }),
    password: string({
      required_error: 'register password is required'
    }).min(6, 'at least 6 characters'),
    passwordConfirmation: string({
      required_error: 'register confirm password is required'
    })
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'confirm password not match',
    path: ['passwordConfirmation']
  })
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  'body.passwordConfirmation'
>;
