"use client"
import React, { useEffect, useReducer, useRef } from 'react'

// intializing the state 
const instialState = {
    count : 0 
}

//writing reducer functions
const reducer=(state , action)=>{

    switch(action.type){
            case 'incresement' :
                return {
                     count : state.count + 1
                }
            case 'decresement' :
                return {
                     count : state.count - 1
                }

            case 'reset' :
                return{
                    count:0
                }
            default :
                 return {
                    instialState
                }


    }
}

// using in component
const Counter = () => {
    
    const [state, dispatch] = useReducer(reducer,instialState)
  
  
  return (
    <div>
        <h1>{state.count}</h1>
        <button onClick={()=>dispatch({type : 'incresement'})}>+</button>
        <button onClick={()=>dispatch({type : 'decresement'})}>-</button>
        <button onClick={()=>dispatch({type : 'reset'})}>Reset</button>
    </div>
  )
}

export default Counter