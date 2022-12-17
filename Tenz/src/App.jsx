import React,{useState,useEffect} from 'react'
import Die from './Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'


import './App.css'

function App() {
  // creting a state to see if the game is started and
    // if the instructions button is clicked to show the instructions to the user
    
    const [startGame,setStartGame] = useState(false);
    const [instructions , setIntruction] = useState(false);
        
    const [hasWon,setHasWon] = useState(false);

    // creating a state to hold the array of random numbers coming from a function
    const [dice,setDice] = useState(newDice())
    
    // using useEffect hook to make two state in sync
    useEffect(()=>{
      const allDiceIsHeld = dice.every(die => die.isHeld)
      const num = dice[0].value
      const hasSameNumber = dice.every(die => die.value === num);

      if(allDiceIsHeld && hasSameNumber){
            setHasWon(true)
      }
     
    },[dice])
        
    // creating a function to hold this object so I do not repeat myself
    function generateDice(){
        return{
            value:Math.floor(Math.random()*6+1),
            isHeld:false,
            id:nanoid()    
        }
    };
    // function return an array of objects that hold random numbers ,id and isHeld property
    function newDice(){
        const arr = []
        for(let i = 0; i < 10; i++){
            arr.push(generateDice())
        }
        return arr
    };
    // function to  check if the id is similar so that mean the dice has been clicked ,
    // so we can hold the dice that has been clicked
    function holdDice(id){
        setDice(oldDie => oldDie.map(die =>{   
            return die.id === id ? {...die, isHeld:!die.isHeld} : die
        }))
    };
    
    // we roll the dice if the btn is clicked except those has been held
    // checking how many rolls it took to win the game
    const [counter,setCounter] = useState(0)
    function rollDice(){
       
        if(!hasWon){
          
            setCounter(old => old+=1)
            setDice(oldDie => oldDie.map(die =>{
                return die.isHeld ? die : generateDice()
            }))
           
        }else{
            setCounter(0)
            setHasWon(false)
            setDice(newDice()) 
        }

    }
    //mapping over the array of object and returning an instance of die
    const dieElements = dice.map(die => (
        <Die
         key={die.id} 
         value={die.value} 
         isHeld={die.isHeld}
         handleClick={()=>holdDice(die.id)}
         
          />
    ))
    
        
  return (
      
      <main>
            {
                // here writing a ternary to see of the startGame value is true,
                //if it is then the tenzies content will show to the user if it is not
                //then the introduction content will be shown
                
                // and checking if the user has won so the confetti package will be shown to the user 
                startGame  ?
             
                  <div className="content">
                  
                    <div>
                        
                        { hasWon && <Confetti />} 
                    </div>
                    <h1 className="title">Tenzies</h1>
                    <p className="desc">{ hasWon ? `Congratulations  ${counter} are the number of rolls to win this game`: 'Remider Of The Instructions:  Roll until all dice are the same. Click each die to freeze it at its current value between rolls.'}</p>
                    <div className="grid">
                        {dieElements}
                    </div>
                    <button onClick={rollDice} className="btn">{hasWon ? 'New Game' : 'Roll'}</button>  
                </div>
                :
                <div className="introduction">
                    <h1>Welcome To Tenzies </h1>
                    <h2>Here are the instructions of the game:</h2>
                    <button onClick={
                        ()=> setIntruction(oldInstruction => !oldInstruction)
                        }>
                    {instructions ? 'Roll until all dice are the same. Click each die to freeze it at its current value between rolls.':'Show Instructions'}
                    </button>
         
                    <button onClick={()=>setStartGame(true)} >Play Tenzies</button>  
                </div>
                
                
            }
            
            
             
      </main>
    
  )  

}

export default App
