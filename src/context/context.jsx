import { createContext, useContext, useEffect, useState } from "react";

//create context
const AppContext = createContext();

//si en las preferencias del navegador esta activado el dark-mode devuelve true
const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme:dark)').matches;
  //localStorage devuelve un string
  const storedDarkMode = localStorage.getItem('darkTheme');
  //Si storedDarkMode no es null que lo retorne
  if (storedDarkMode === null) { return prefersDarkMode;}
  if (storedDarkMode !== null) { return storedDarkMode === 'true';}
}

// console.log(getInitialDarkMode());

//context provider
export const AppProvider = ({ children }) => {

  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());//(no automatico) podriamos false
  const [searchTerm, setSearchTerm] = useState('cat');

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme); 
    //toggle class in body html element (no automatico)
    // const body = document.querySelector('body');
    // body.classList.toggle('dark-theme', newDarkTheme);

    localStorage.setItem('darkTheme', newDarkTheme);
  }

  //para usar si preferencias del navegador esta activado el dark-mode
  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkTheme);
  }, [isDarkTheme])
  

  return(
    <AppContext.Provider value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}>
      { children }
    </AppContext.Provider>
  )
}

//context hook
export const useGlobalContext = () => {
  return useContext(AppContext);
}