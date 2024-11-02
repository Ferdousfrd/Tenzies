import { useState } from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"
import "./App.css"


export default function App() {
/**
 * Challenge: Add conditional styling to the Die component
 * so that if it's held (isHeld === true), its background color
 * changes to a light green (#59E391)
 * 
 * Remember: currently the Die component has no way of knowing
 * if it's "held" or not.
 */

    const [dice, setDice] = useState(allNewDice())  // sets initial dice state to the array of obj returned by allNewDice
    
    function allNewDice() {                         // returns an array of 10 obj
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push({                          // creating diec obj
              value : Math.ceil(Math.random() * 6),
              isHeld : true,
              id : nanoid()
            })
        }
        return newDice
    }
    
    function rollDice() {                           // setDice calles the allNewDice func again and 
        setDice(allNewDice())                       // gets a new array with new 10 nums and sets that to new dice state
    }
    
    function holdDice(id){
      console.log(id)
      const currentDiceId = id
      for(let i = 0; i<dice.length; i++){
        if(dice[i].id === id){
          console.log(dice[i].value)
        }
      }
    }

    const diceElements = dice.map(die => <Die key={die.id} handler={()=>holdDice(die.id)} value={die.value} isHeld={die.isHeld} />)
    
    return (
        <main>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>Roll</button>
        </main>
    )
}