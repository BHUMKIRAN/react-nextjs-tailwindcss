import React, { useReducer } from 'react'

const intialState = {
    theme : 'light'
}

const reducer = (state, action) =>{
    switch(action.type){
        case 'toggle' :
            return {
                theme : state.theme ===  'light' ? 'dark' : 'light'
            }
        default : 
         return state
    }
}


const ToggleTheme = () => {
    const [state, dispatch] = useReducer(reducer, intialState)
  return (
    <div>
        <button onClick={()=>dispatch({type : 'toggle'})}>
                Toggle theme {state?.theme}
        </button>
    </div>
  )
}

export default ToggleTheme