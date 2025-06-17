import { createContext, useContext, useState } from "react";
// import Filterbox from "./Filterbox";

const FilterContext = createContext();

export const Filter = ({ prev, set, fData, children }) => {
  const [filter, setFilter] = useState(fData);
  const initOpen = false; //Object?.keys(fData)[0];
  return (
    <FilterContext.Provider value={{ filter, setFilter, set, prev, initOpen }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
