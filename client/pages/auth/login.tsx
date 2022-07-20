import React, { useState } from 'react';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/router';

export const LoginSchema = object({
  email: string()
    .nonempty({
      message: 'login email is required',
    })
    .email('email is invalid'),
  password: string().nonempty({
    message: 'login password is required',
  }),
});

type LoginSchemaType = TypeOf<typeof LoginSchema>;

const LoginPage: NextPage = () => {
  const [registerError, setRegisterError] = useState(null);
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const submitHandler = async (values: LoginSchemaType) => {
    console.log({ values });

    try {
      await axios.post(`http://localhost:1336/api/sessions`, values, {
        withCredentials: true,
      });
      router.push('/');
    } catch (err: any) {
      setRegisterError(err.message);
    }
  };

  console.log({ errors });

  return (
    <>
      <p>{registerError}</p>
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
          <label htmlFor="password">Password: </label>
          <input
            id={'password'}
            type="password"
            placeholder={'123123'}
            {...register('password')}
          />
          <p>{errors.password?.message}</p>
        </div>

        <button type={'submit'}>Submit</button>
      </form>
    </>
  );
};

export default LoginPage;
