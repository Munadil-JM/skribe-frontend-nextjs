import { createContext, useContext, useState } from "react";

const createSearchContext = createContext();
const MainSearchContext = ({ children }) => {
  const [sVal, setSearchVal] = useState("");

  return (
    <createSearchContext.Provider value={{ sVal, setSearchVal }}>
      {children}
    </createSearchContext.Provider>
  );
};
export default MainSearchContext;
export const useSearchContext = () => useContext(createSearchContext);
