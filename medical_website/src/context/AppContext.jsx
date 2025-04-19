import { createContext } from "react";
import { doctors } from "../assets/assets";
import { Goikham } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "VND";

  const value = {
    doctors,
    currencySymbol,
    Goikham,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
