"use client";

import { createContext, useContext, useEffect, useState } from "react";
import tokenService from "../../Services/token.service";

const AuthContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const role = tokenService.getLocalRole();
    setUser(role);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AppProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
