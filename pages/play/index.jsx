import Layout from "@/components/layout";
import SentenceContainer from "@/components/sentence_container";
import useSWR from "swr";
import styles from "@/styles/Play.module.css"
import InputGame from "@/components/input_game";

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Play() {
  // const { data, error } = useSWR('http://localhost:3001/sentences/getrandoms', fetcher, {refreshInterval: 1000})
  const { data, error } = useSWR('http://localhost:3001/sentences/getrandoms', fetcher)
  console.log(data)
  if (error) return <div>Failed to load</div>
  return (
    <Layout>
      <h1>PLAY</h1>
      {data && 
        <SentenceContainer classname={styles.container} data={data}/>
      }
      <InputGame />
    </Layout>

  )
}