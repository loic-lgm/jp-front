import { useEffect } from "react";

export default function Timer ({seconds, setSeconds, setShowAnswer, countSentence, setDisplayGame }) {
    useEffect(() => {
      let myInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 1) {
          clearInterval(myInterval);
          setShowAnswer("La réponse était : ")
          if (countSentence > 2) {
            setDisplayGame(false)
          }
        } 
      }, 1000)
      return () => {
        clearInterval(myInterval);
      };
    });
    return (
      <div>
      { seconds === 0
          ? null
          : <h1>{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
      }
      </div>
    )
  }