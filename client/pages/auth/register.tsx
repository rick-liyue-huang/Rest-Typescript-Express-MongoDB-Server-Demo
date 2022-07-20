import React, { useState } from 'react';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/router';

export const RegisterSchema = object({
  email: string()
    .nonempty({
      message: 'register email is required',
    })
    .email('email is invalid'),
  name: string().nonempty({
    message: 'register name is required',
  }),
  password: string()
    .nonempty({
      message: 'register password is required',
    })
    .min(6, 'at least 6 characters'),
  passwordConfirmation: string().nonempty({
    message: 'register confirm password is required',
  }),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: 'confirm password not match',
  path: ['passwordConfirmation'],
});

type RegisterSchemaType = TypeOf<typeof RegisterSchema>;

const RegisterPage: NextPage = () => {
  const [loginError, setLoginError] = useState(null);
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  });

  const submitHandler = async (values: RegisterSchemaType) => {
    console.log({ values });

    try {
      await axios.post(`http://localhost:1336/api/users`, values);
      router.push('/');
    } catch (err: any) {
      setLoginError(err.message);
    }
  };

  console.log({ errors });

  return (
    <>
      <p>{loginError}</p>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className={'form-element'}>
          <label htmlFor="email">Email: </label>
          <input
            id={'email'}
            type="text"
            placeholder={'rick@example.com'}
            {...register('email')}
          />
          <p>{errors.email?.message}</p>
        </div>

        <div className={'form-element'}>
          <label htmlFor="name">Name: </label>
          <input
            id={'name'}
            type="text"
            placeholder={'rick'}
            {...register('name')}
          />
          <p>{errors.name?.message}</p>
        </div>

        <div className={'form-element'}>
          <label htmlFor="password">Password: </label>
          <input
            id={'password'}
            type="password"
            placeholder={'123123'}
            {...register('password')}
          />
          <p>{errors.password?.message}</p>
        </div>

        <div className={'form-element'}>
          <label htmlFor="passwordConfirmation">Confirm Password: </label>
          <input
            id={'passwordConfirmation'}
            type="password"
            placeholder={'123123'}
            {...register('passwordConfirmation')}
          />
          <p>{errors.passwordConfirmation?.message}</p>
        </div>

        <button type={'submit'}>Submit</button>
      </form>
    </>
  );
};

export default RegisterPage;
