import { createContext, useEffect } from "react";
import { useState } from "react";
import { useBrandBeatTrue } from "../components/utils/useBrandBeatTrue";

export const ReportInfluencerContext = createContext();
export const ReportInfluencerProvider = ({ children }) => {
  const { beatData, isLoadingBeat } = useBrandBeatTrue();
  const [brand, setBrand] = useState({
    keyword: undefined,
    id: 0,
    arr: [],
    data: undefined,
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
    <ReportInfluencerContext.Provider
      value={{ brand, setBrand, chart, setChart }}
    >
      {children}
    </ReportInfluencerContext.Provider>
  );
};
