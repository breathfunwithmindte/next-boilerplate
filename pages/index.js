import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import default_callback from '../bssl/default_callback';
import { ContextProvider } from '../bssl/main';
import Request from '../bssl/Request';
import useFetch from '../hooks/useFetch';
import useForm from '../hooks/useForm';
import styles from '../styles/Home.module.css'
import DataTemplate from '../templates/Data.template';

export default function Home() {
  const [data, loading, error, message, rfetch] = useFetch("/something");

  return (
    <ContextProvider>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='primary-container'>
        <div className='primary-container-content'>
          <aside>
            {/* <NavBar /> */}
            {message + "!!"}
          </aside>
          <main className={styles.main}>
              <DataTemplate loading={loading} error={error} data={data}>
                hello world its rendering
              </DataTemplate>
          </main>
        </div>
        <footer className={styles.footer}>
       
        </footer>
      </div>
    </ContextProvider>
  )
}
