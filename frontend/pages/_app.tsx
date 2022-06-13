import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head'

import Layout from '../components/Layout';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Spacebook</title>
    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
)

export default MyApp
