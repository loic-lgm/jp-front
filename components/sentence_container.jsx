import { useState } from "react"

export default function SentenceContainer({classname, data}) {
  return (
    <div className={classname}>
      {data &&
      <div>
        <p>{data.description}</p>
        <p>{data.country}</p>
        {data.categories && 
          data.categories.map(category => 
            <p key={category}>{category}</p>
          )
        }
      </div>
      }
    </div>
  )
}