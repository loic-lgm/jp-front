import Layout from "@/components/layout";
import { useEffect } from "react";
import useSWR from "swr";

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
        <div>
          {data.map((sentence) => 
            <div key={sentence.id}>{sentence.id}</div>
          )}
        </div>
      }
    </Layout>

  )
}