import { createContext } from "react";
import { doctors } from '../assets/assets';

export const AppContext =createContext()
const AppContextProvider =(props)=>{

    const currencySymol ='VND'

    const value={
        doctors,
        currencySymol
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
console.log("Doctors từ AppContext:", doctors);

export default AppContextProvider