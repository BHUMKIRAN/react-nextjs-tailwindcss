"use client"
import React from 'react'
import Counter from './Counter'
import ToggleTheme from './ToggleTheme'
import Todos from './Todos'

const useReducer = () => {
  return (
    <div>
        {/* <Counter/> */}\
        {/* <ToggleTheme/> */}
        <Todos/>
    </div>
  )
}

export default useReducer