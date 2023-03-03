import { useState } from "react"

export default function SentenceContainer({classname, data}) {
  const [countSentence, setCountSentence] = useState(0);
  return (
    <div className={classname}>
      {data &&
      <div>
        <p>{data[countSentence].description}</p>
        <p>{data[countSentence].country}</p>
        {data[countSentence].categories && 
          data[countSentence].categories.map(category => 
            <p key={category}>{category}</p>
          )
        }
      </div>
      }
    </div>
  )
}