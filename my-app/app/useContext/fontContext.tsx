import { createContext, useState } from "react";

export type fontSize = 'small' | 'medium' | 'large';

interface fontContextType {
    fontSize : fontSize;
    setFontSize : (font:fontSize)=> void;
}

export const fontContext = createContext<fontContextType>({
    fontSize : 'small',
    setFontSize : ()=>{},
})

const fontContextProvide = ({ children }) => {

    const [fontSize , setFontSize] = useState('small')

    return(
        <fontContext.Provider value={{fontSize , setFontSize}}>
            {children}
        </fontContext.Provider>
    )

}

export default fontContextProvide;

