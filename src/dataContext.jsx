import { createContext } from "react";
import React from "react";
const DataContext = createContext()
const DataProvider = ({children})=>{
    const Data = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user'))[0] : ''
    return(
        <DataContext.Provider value={{Data}}>
             {children}
        </DataContext.Provider>
    )
}

export {DataContext, DataProvider}