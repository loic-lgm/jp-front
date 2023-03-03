import Layout from '@/components/layout'
import Head from 'next/head'
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  console.log(styles);
  return (
    <Layout>
      <Head>
        <title>La juste peine</title>
      </Head>
      <h1>Home</h1>
      <Link href="/play" className={styles.button_play}>
        PLAY
      </Link>
    </Layout>
  )
}
