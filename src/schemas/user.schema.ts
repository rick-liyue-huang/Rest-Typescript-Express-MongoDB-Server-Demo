import { object, string, TypeOf } from 'zod';

/**
 * @define create the input type by zod, and here the zod type need to match with the mongodb model type, so I need to omit the 'passwordConfirmation' field, but it still needs to input, but not shows in mongodb
 */
export const createUserSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required'
    }),
    password: string({
      required_error: 'Name is required'
    }).min(6, 'Password too short - should be 6 chars minimum'),
    passwordConfirmation: string({
      required_error: 'passwordConfirmation is required'
    }),
    email: string({
      required_error: 'Email is required'
    }).email('Not a valid email')
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation']
  })
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  'body.passwordConfirmation'
>;
