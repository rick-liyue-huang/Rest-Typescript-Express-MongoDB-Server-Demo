import React, { useState } from 'react';
import { NextPage } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/router';

export const loginSchema = object({
  email: string()
    .nonempty({
      message: 'register email is required',
    })
    .email('email format is invalid'),
  password: string()
    .nonempty({
      message: 'register password is required',
    })
    .min(6, 'password at least 6 characters'),
});

type LoginSchemaInput = TypeOf<typeof loginSchema>;

const LoginPage: NextPage = () => {
  const [loginError, setLoginError] = useState(null);
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginSchemaInput>({
    resolver: zodResolver(loginSchema),
  });

  const loginHandler: SubmitHandler<LoginSchemaInput> = async (values) => {
    // console.log({ values });
    try {
      await axios.post(`http://localhost:1336/api/sessions`, values, {
        withCredentials: true,
      });
      await router.push('/');
    } catch (err: any) {
      setLoginError(err.message);
    }
  };

  console.log({ errors });

  return (
    <>
      <p>{loginError}</p>
      <form onSubmit={handleSubmit(loginHandler)}>
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
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder={'please input password'}
            {...register('password')}
          />
          {/* @ts-ignore*/}
          <p>{errors.password?.message}</p>
        </div>

        <button type={'submit'}>Login</button>
      </form>
    </>
  );
};

export default LoginPage;
