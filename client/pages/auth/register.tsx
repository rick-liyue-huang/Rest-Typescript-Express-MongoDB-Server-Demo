import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { NextPage } from 'next';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

/**
 * @define confirm with the zod type from server user.schema
 */
const createUserSchema = object({
  name: string().nonempty({
    message: 'Register name is required',
  }),
  password: string().min(6, 'need at least 6 characters').nonempty({
    message: 'Register password is required',
  }),
  passwordConfirmation: string().nonempty({
    message: 'confirm password is required',
  }),
  email: string({
    required_error: 'Register email is required',
  }).email('Not a valid email'),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: 'Register password not matched',
  path: ['passwordConfirmation'],
});

/**
 * @define confirm the Input Payload
 */
type Input = TypeOf<typeof createUserSchema>;

/**
 * @define create the register page
 */
const RegisterPage: NextPage = () => {
  const [registerError, setRegisterError] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Input>({
    resolver: zodResolver(createUserSchema),
  });

  const submitHandler = async (values: Input) => {
    console.log({ values });

    try {
      await axios.post(`http://localhost:1336/api/users`, values);
    } catch (err: any) {
      setRegisterError(err.message);
    }
  };

  // console.log({ errors });
  return (
    <div>
      <p>{registerError}</p>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className={'form-element'}>
          <label htmlFor="email">Email</label>
          <input
            id={'email'}
            type="email"
            placeholder={'jane.doe@example.com'}
            {...register('email')}
          />
          <p>{errors.email?.message}</p>
        </div>

        <div className={'form-element'}>
          <label htmlFor="name">Name</label>
          <input
            id={'name'}
            type="text"
            placeholder={'Jane Doe'}
            {...register('name')}
          />
          <p>{errors.name?.message}</p>
        </div>

        <div className={'form-element'}>
          <label htmlFor="password">Password</label>
          <input
            id={'password'}
            type="password"
            placeholder={'Password456!'}
            {...register('password')}
          />
          <p>{errors.password?.message}</p>
        </div>

        <div className={'form-element'}>
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <input
            id={'passwordConfirmation'}
            type="password"
            placeholder={'Password456!'}
            {...register('passwordConfirmation')}
          />
          <p>{errors.passwordConfirmation?.message}</p>
        </div>
        <button type={'submit'}>Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
