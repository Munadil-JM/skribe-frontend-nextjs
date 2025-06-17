import { createContext, useContext } from "react";
// import { useAllBeat } from "../utils/useAllBeat";
// import { useSelections } from "ahooks";

const Beatcreate = createContext();
//mediaBeat, isLoadingBeat, open, onClose
const BeatContext = ({ children }) => {
  console.log("this is from context ");
  return <Beatcreate.Provider value={{}}>{children}</Beatcreate.Provider>;
};

export const useBeatContext = () => useContext(Beatcreate);

export default BeatContext;
