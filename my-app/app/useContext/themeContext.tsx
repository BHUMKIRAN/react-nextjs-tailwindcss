import React, { createContext, useState } from 'react'

export type theme = 'light' | 'dark';

interface ThemeContextType {
    theme : theme;
    toggleTheme : ()=>void;
}
export const themeContext = createContext({
    theme:'light',
    toggleTheme :()=>{},
})
const ThemeContextProvider = ({children}) => {

    const [theme , setTheme] = useState('light')

    const toggleTheme =()=>{
        setTheme((x)=> x==='light' ? 'dark' : 'light')
    }
  return (
    <themeContext.Provider value={{theme , toggleTheme}}>
        {children}
    </themeContext.Provider>
  )
}

export default ThemeContextProvider