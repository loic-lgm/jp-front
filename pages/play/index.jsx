import Layout from "@/components/layout";
import SentenceContainer from "@/components/sentence_container";
import styles from "@/styles/Play.module.css"
import InputGame from "@/components/input_game";
import { useEffect, useState } from "react";
import Timer from "@/components/timer";
import Link from "next/link";
import getRandomIds from "@/utils/getRandoms";

export default function Play ({ sentences, data }) {
  const [countSentence, setCountSentence] = useState(0);
  const [isAnswerTrue, setIsAnswerTrue] = useState(false);
  const [answer, setAnswer] = useState("");
  const [lastAnswer, setLastAnswer] = useState("");
  const [clue, setClue] = useState("");
  const [displayGame, setDisplayGame] = useState(true);
  const [seconds, setSeconds ] =  useState(10);
  const [showAnswer, setShowAnswer] = useState("");
  const [isLoading, setLoading] = useState(false)
  // const [data, setData] = useState(null)

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     let todayIds = []
  //     todayIds = getRandomIds(sentences, 3)
  //     setLoading(true)
  //     fetch(`http://localhost:3001/sentences/getsentences/${todayIds[0]}/${todayIds[1]}/${todayIds[2]}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data)
  //       setLoading(false)
  //     })
  //   }, 6000);
  //   return () => clearInterval(interval);
  // }, [])
  
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

  // if (error || sentencesError) return <div>Failed to load</div>

  if (data && countSentence < 3) {
    return (
      <>
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
        {(isAnswerTrue || !seconds && countSentence < 3) && 
          <div>
            {displayGame 
            ? <button onClick={handleNextButtonClick}>Suivant</button>
            : <div>
              <div>Vous avez dépassé la limite quotidienne, à demain !</div>
              <Link href="/">Accueil</Link>
            </div>
            }
          </div>
        }
        {!showAnswer && 
          <InputGame 
            answer={answer}  
            setAnswer={setAnswer} 
            handleInputSubmit={handleInputSubmit} 
            handleInputChange={handleInputChange}
          />
        }
      </>
    )
  } else if (isLoading) {
    return (
      <Layout>
        <div>Ca arrive ma gueule.</div>
      </Layout>
    )
  } else {
    return (
      <Layout>
        <div>Une erreur est survenue.</div>
        <Link href="/">Accueil</Link>
      </Layout>
    )
  }
}

export async function getServerSideProps() {
  const resSentences = await fetch('http://localhost:3001/sentences')
  const sentences = await resSentences.json()

  let todayIds = []
  todayIds = getRandomIds(sentences, 3)
  const resRandoms = await fetch(`http://localhost:3001/sentences/getsentences/${todayIds[0]}/${todayIds[1]}/${todayIds[2]}`)
  const data = await resRandoms.json()

  return {
    props: {
      sentences,
      data
    },
  }
}
