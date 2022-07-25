import { object, string, TypeOf } from 'zod';

export const createSessionSchema = object({
  body: object({
    email: string({
      required_error: 'login email is required'
    }).email('email format is invalid'),
    password: string({
      required_error: 'login password is required'
    })
  })
});

export type CreateSessionInput = TypeOf<typeof createSessionSchema>;
