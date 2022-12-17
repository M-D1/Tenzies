import React from 'react'
// import images from './images/'
import './App.css'

export default function Die(props){
    const bg ={
        backgroundColor: props.isHeld ? '#100000':'#db2121'
       
        
    }
    
    return (
        <div > 
        
           <img src={`images/redDie-${props.value}.png`} onClick={props.handleClick} style={bg} className="dice" />
        </div>
    )
}