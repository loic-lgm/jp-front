import Layout from "@/components/layout";
import SentenceContainer from "@/components/sentence_container";
import useSWR from "swr";
import styles from "@/styles/Play.module.css"
import InputGame from "@/components/input_game";
import { useEffect, useState } from "react";

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Play() {
  // const { data, error } = useSWR('http://localhost:3001/sentences/getrandoms', fetcher, {refreshInterval: 1000})
  const { data, error } = useSWR('http://localhost:3001/sentences/getrandoms', fetcher)
  
  const [countSentence, setCountSentence] = useState(0);
  const [isAnswerTrue, setIsAnswerTrue] = useState(false);
  const [answer, setAnswer] = useState("");
  const [lastAnswer, setLastAnswer] = useState("");
  const [clue, setClue] = useState("");
  const [display, setDisplay] = useState(false);
  
  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (data && data[countSentence].jail_time == answer) {
      setIsAnswerTrue(true);
      setClue("C'est gagné");
    }
    setLastAnswer(e.target[0].value)
    if (data && data[countSentence].jail_time < answer) {
      setClue("C'est moins")
    } else if (data && data[countSentence].jail_time > answer) {
      setClue("C'est plus")
    }
    setAnswer("")
  }

  const handleInputChange = (e) => {
    setAnswer(e.target.value)
  }

  const handleNextButtonClick = () => {
    setCountSentence(countSentence +1);
    setLastAnswer("");
    setClue("");
  }
  
  if (error) return <div>Failed to load</div>

  return (
    <Layout>
      <h1>PLAY</h1>
      {data && 
        <SentenceContainer classname={styles.container} data={data[countSentence]}/>
      }
      <div>
      {lastAnswer && lastAnswer}
      </div>
      <div>
      {clue && clue}
      </div>
      <div>
      {isAnswerTrue && 
        <button onClick={handleNextButtonClick}>Suivant</button>
      }
      </div>
      <InputGame answer={answer} setAnswer={setAnswer} handleInputSubmit={handleInputSubmit} handleInputChange={handleInputChange}/>
      {countSentence > 2 && "Vous avez dépassé la limite quotidienne ! À demain !"}
    </Layout>
  )
}