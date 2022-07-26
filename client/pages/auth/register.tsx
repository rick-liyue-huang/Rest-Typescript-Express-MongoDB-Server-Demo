import React, { useState } from 'react';
import { NextPage } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/router';

export const registerSchema = object({
  email: string()
    .nonempty({
      message: 'register email is required',
    })
    .email('email format is invalid'),
  name: string().nonempty({
    message: 'register name is required',
  }),
  password: string()
    .nonempty({
      message: 'register password is required',
    })
    .min(6, 'password at least 6 characters'),
  passwordConfirmation: string()
    .nonempty({
      message: 'confirm password is required',
    })
    .min(6, 'confirm password at least 6 characters'),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: 'password not match',
  path: ['passwordConfirmation'],
});

type RegisterSchemaInput = TypeOf<typeof registerSchema>;

const RegisterPage: NextPage = () => {
  const [registerError, setRegisterError] = useState(null);
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterSchemaInput>({
    resolver: zodResolver(registerSchema),
  });

  const registerHandler: SubmitHandler<RegisterSchemaInput> = async (
    values
  ) => {
    // console.log({ values });
    try {
      await axios.post(`http://localhost:1336/api/users`, values);
      await router.push('/');
    } catch (err: any) {
      setRegisterError(err.message);
    }
  };

  console.log({ errors });

  return (
    <>
      <p>{registerError}</p>
      <form onSubmit={handleSubmit(registerHandler)}>
        <div className={'form-element'}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder={'please input email'}
            {...register('email')}
          />
          {/* @ts-ignore*/}
          <p>{errors.email?.message}</p>
        </div>

        <div className={'form-element'}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            placeholder={'please input name'}
            {...register('name')}
          />
          {/* @ts-ignore*/}
          <p>{errors.name?.message}</p>
        </div>

        <div className={'form-element'}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder={'please input password'}
            {...register('password')}
          />
          {/* @ts-ignore*/}
          <p>{errors.password?.message}</p>
        </div>

        <div className={'form-element'}>
          <label htmlFor="passwordConfirmation">Confirm Password:</label>
          <input
            type="password"
            placeholder={'please confirm password'}
            {...register('passwordConfirmation')}
          />
          {/* @ts-ignore*/}
          <p>{errors.passwordConfirmation?.message}</p>
        </div>
        <button type={'submit'}>Register</button>
      </form>
    </>
  );
};

export default RegisterPage;
