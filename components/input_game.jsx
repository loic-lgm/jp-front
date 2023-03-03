import { useState } from "react"

export default function InputGame({ answer, handleInputSubmit, handleInputChange }) {
  return (
    <form action="" onSubmit={handleInputSubmit}>   
      <input type="text" id="answer" name="answer" value={answer} onChange={handleInputChange} />
      <button type="submit">Valider</button>
    </form>
  )
}