import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import styles from '../styles/Home.module.css';
import { getGoogleURL } from '../utils/getGoogleURL';

type User = {
  _id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  session: string;
  iat: number;
  exp: number;
};

const Home: NextPage<{ fallbackData: User }> = ({ fallbackData }) => {
  // get it through http://localhost:1336/api/me
  const { data } = useSWR<User | null>(
    `
    http://localhost:1336/api/me
  `,
    fetcher,
    { fallbackData }
  );

  if (data) {
    return (
      <div className={styles.container}>
        <main className={styles.main}>Welcome {data.name}</main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <a href={getGoogleURL()}>login with google</a>
        <a href="/auth/login">login</a>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.req.headers;

  const data = await fetcher(
    `http://localhost:1336/api/me`,
    context.req.headers
  );

  return {
    props: {
      fallbackData: data,
    },
  };
};

export default Home;
