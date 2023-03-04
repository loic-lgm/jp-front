import Layout from "@/components/layout";
import SentenceContainer from "@/components/sentence_container";
import useSWR from "swr";
import styles from "@/styles/Play.module.css"
import InputGame from "@/components/input_game";
import { useEffect, useState } from "react";
import Timer from "@/components/timer";

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Play() {
  // const { data, error } = useSWR('http://localhost:3001/sentences/getrandoms', fetcher, {refreshInterval: 1000})
  const { data, error } = useSWR('http://localhost:3001/sentences/getrandoms', fetcher)
  
  const [countSentence, setCountSentence] = useState(0);
  const [isAnswerTrue, setIsAnswerTrue] = useState(false);
  const [answer, setAnswer] = useState("");
  const [lastAnswer, setLastAnswer] = useState("");
  const [clue, setClue] = useState("");
  const [displayGame, setDisplayGame] = useState(true);
  const [seconds, setSeconds ] =  useState(10);
  const [showAnswer, setShowAnswer] = useState("");

  // if (timeEnd) {
  //   if (countSentence < 2) {
  //     setCountSentence(countSentence +1);
  //   } else {
  //     setDisplayGame(false);
  //   }
  // }
  
  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (data && data[countSentence].jail_time == answer) {
      setIsAnswerTrue(true);
      setClue("C'est gagné");
      setShowAnswer("La réponse était : ")
      setSeconds(0)
      if (countSentence == 2) {
        setDisplayGame(false)
      }
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
    setIsAnswerTrue(false);
    setShowAnswer("")
    setSeconds(10)
  }

  if (error) return <div>Failed to load</div>

  if (data && displayGame) {
    return (
      <Layout>
        <h1>PLAY</h1>
        <div>
          Question {countSentence +1}/3
        </div>
        <Timer 
          seconds={seconds} 
          setSeconds={setSeconds} 
          setShowAnswer={setShowAnswer}
          countSentence={countSentence}
          setDisplayGame={setDisplayGame}
        />
        <SentenceContainer classname={styles.container} data={data[countSentence]}/>
        <div>{lastAnswer}</div>
        <div>{clue}</div>
        <div>{showAnswer && showAnswer + data[countSentence].jail_time + " mois"}</div>
        {(isAnswerTrue || showAnswer) && 
          <div>
            <button onClick={handleNextButtonClick}>Suivant</button>
          </div>
        }
        {!showAnswer && <InputGame answer={answer} setAnswer={setAnswer} handleInputSubmit={handleInputSubmit} handleInputChange={handleInputChange}/>}
      </Layout>
    )
  } else {
    return (
      <Layout>
        <div>Vous avez dépassé la limite quotidienne, à demain !</div>
      </Layout>
    )
  }
}
