import { createContext } from "react";
import { useState } from "react";

export const DashboardContext = createContext();
export const DashboardProvider = ({ children }) => {
  const [vchartjourno, setVchartjourno] = useState({
    id: undefined,
    path: "",
    title: "",
    jname: "",
  });

  return (
    <DashboardContext.Provider value={{ vchartjourno, setVchartjourno }}>
      {children}
    </DashboardContext.Provider>
  );
};
