"use client";

import { createContext, useContext, useState } from "react";
import MorePower from "./MorePower"; // Assuming MorePower is the component for your popup

// Create a context to manage popup visibility
const PopupContext = createContext();

// Context provider component
const CreatePopup = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const showPopup = () => setIsOpen(true); // Show the popup
  const hidePopup = () => setIsOpen(false); // Hide the popup

  return (
    <PopupContext.Provider value={{ showPopup, hidePopup }}>
      {children}
      <MorePower isOpen={isOpen} onClose={hidePopup} />
    </PopupContext.Provider>
  );
};

// Custom hook to access popup functions
export const usePopup = () => {
  return useContext(PopupContext);
};

export default CreatePopup;
