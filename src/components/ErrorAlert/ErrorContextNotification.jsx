"use client";

import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

const ErrorContextNotification = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000); // Hide notification after 3 seconds
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default ErrorContextNotification;

export const useNotification = () => useContext(NotificationContext);
