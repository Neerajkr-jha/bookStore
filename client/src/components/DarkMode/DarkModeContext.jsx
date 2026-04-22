import React from 'react'
import { useState ,useContext ,createContext } from 'react'

 const DarkModeContext=createContext();

 export const DarkModeProvider = ({children}) => {
   const [isDark, setIsDark] = useState(false)
  return (
    <DarkModeContext value={{isDark,setIsDark}}>
        {children}
    </DarkModeContext>
  )
}

export const useDarkMode = () => useContext(DarkModeContext);