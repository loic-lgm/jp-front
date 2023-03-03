import Button from '@/components/button'
import Layout from '@/components/layout'
import Head from 'next/head'
import styles from '../styles/Home.module.css';

export default function Home() {
  console.log(styles);
  return (
    <Layout>
      <Head>
        <title>La juste peine</title>
      </Head>
      <h1>Home</h1>
      <Button className={styles.button_play} content="PLAY" />
    </Layout>
  )
}
