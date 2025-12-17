import { createContext } from "react";
import React from "react";
const DataContext = createContext()
const DataProvider = ({children})=>{
    const Data = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : ''
    return(
        <DataContext.Provider value={{Data}}>
             {children}
        </DataContext.Provider>
    )
}

export {DataContext, DataProvider}