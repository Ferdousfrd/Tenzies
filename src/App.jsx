import { useEffect, useState } from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import "./App.css"


export default function App() {

  const [dice, setDice] = useState(allNewDice())  // sets initial dice state to the array of obj returned by allNewDice
  const [tenzies, setTenzies] = useState(false)   // state of the game is won


  function generateNewDie(){                      // making an obj of die with random value and id
    return {
      value : Math.ceil(Math.random() * 6),
      isHeld : false,
      id : nanoid()
    }
  }
  
  function allNewDice() {                         // returns an array of 10 obj
    const newDice = []
    for (let i = 0; i < 10; i++) {
        newDice.push(generateNewDie())
    }
    return newDice
  }
  
  function rollDice() {                                 
    if(!tenzies){                            // if game not won,setting a new state to our dice array. after holding a dice with onClick
      setDice(prev => prev.map(item => {                  // we dont change the obj which isHeld true
        return item.isHeld ? item : generateNewDie()      // we just change the value on which isHeld is false
      }))  
    }   
    else {                                  // if won
      setDice(allNewDice())
      setTenzies(false)
    }                 
  }
  
  function holdDice(id){
    setDice(prev => prev.map(item =>{             // updateing our dice obj in array on click by toggling between isHeld true and false
      return item.id === id ? {
        ...item,
        isHeld: !item.isHeld
      } : item
    }))
  }

  useEffect(()=> {
    // if all dices are held
    const allDieHeld = dice.every(die => die.isHeld)
    // if all dices values are same
    const firsDieValue = dice[0].value
    const allDieSameValue = dice.every(die => die.value === firsDieValue)

    if(allDieHeld && allDieSameValue){
      setTenzies(true)
      console.log("Won")
    }

  },[dice])

  const diceElements = dice.map(die => <Die key={die.id} handler={()=>holdDice(die.id)} value={die.value} isHeld={die.isHeld} />)
  
  return (
    <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        
        <div className="dice-container">
            {diceElements}
        </div>

        <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}