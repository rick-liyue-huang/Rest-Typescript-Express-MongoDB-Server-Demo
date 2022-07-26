import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';

interface IUser {
  _id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  _v: number;
  session: string;
  iat: number;
  exp: number;
}

// @ts-ignore
const Home: NextPage = ({ fallbackData }: { fallbackData: IUser }) => {
  const { data, error } = useSWR<IUser>(
    `http://localhost:1336/api/me`,
    fetcher,
    { fallbackData }
  );

  if (data) {
    return <div>Welcome, {data.name} </div>;
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}></main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
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
