import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    email: string({
      required_error: 'register email is required'
    }).email('email format is invalid'),
    name: string({
      required_error: 'register name is required'
    }),
    password: string({
      required_error: 'register password is required'
    }).min(6, 'password at least 6 characters'),
    passwordConfirmation: string({
      required_error: 'confirm password is required'
    }).min(6, 'confirm password at least 6 characters')
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'password not match',
    path: ['passwordConfirmation']
  })
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  'body.passwordConfirmation'
>;
