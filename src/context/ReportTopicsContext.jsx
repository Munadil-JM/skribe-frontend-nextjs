import { createContext, useEffect } from "react";
import { useState } from "react";
import { useBrandBeatTrue } from "../components/utils/useBrandBeatTrue";

export const ReportTopicsContext = createContext();
export const ReportTopicsProvider = ({ children }) => {
  const { beatData, isLoadingBeat } = useBrandBeatTrue();
  const [brand, setBrand] = useState({
    keyword: undefined,
    id: 0,
    arr: [],
    data: undefined,
    aggrs: undefined,
    args: undefined,
  });
  const [chart, setChart] = useState([]);

  useEffect(() => {
    if (!isLoadingBeat) {
      setBrand({
        ...brand,
        keyword: beatData[0].beatName,
        id: beatData[0].beatid,
        data: beatData,
      });
    }
  }, [isLoadingBeat]);

  return (
    <ReportTopicsContext.Provider value={{ brand, setBrand, chart, setChart }}>
      {children}
    </ReportTopicsContext.Provider>
  );
};
