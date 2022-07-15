import { object, string, TypeOf } from 'zod';

/**
 * @define confirm the input while get the session after login in zod type
 */
export const createSessionSchema = object({
  body: object({
    email: string({
      required_error: 'Login email is required'
    }),
    password: string({
      required_error: 'Login password is required'
    })
  })
});

export type CreateSessionType = TypeOf<typeof createSessionSchema>;
