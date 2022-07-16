import { object, string, TypeOf } from 'zod';

/**
 * @define create the input type by zod, and match with 'validateResources' file
 */
export const createUserSchema = object({
  body: object({
    name: string({
      required_error: 'Register name is required'
    }),
    password: string({
      required_error: 'Register password is required'
    }).min(6, 'need at least 6 characters'),
    passwordConfirmation: string({
      required_error: 'Register password not matched'
    }),
    email: string({
      required_error: 'Register email is required'
    }).email('Not a valid email')
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Register password not match each other',
    path: ['passwordConfirmation']
  })
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  'body.passwordConfirmation'
>;
