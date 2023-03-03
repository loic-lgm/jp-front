import { useState } from "react"

export default function InputGame() {
    const [answer, setAnswer] = useState("")
    const handleChange = (e) => {
        setAnswer(e.target.value)
    }
    return (
        <input type="text" id="answer" name="answer" value={answer} onChange={handleChange}/>
    )
}