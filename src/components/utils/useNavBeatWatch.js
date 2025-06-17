import { useState, useEffect } from "react";

const useNavBeatWatch = (selectedBeat, mediaBeat) => {
  const [allBeat, setAllBeat] = useState([]);

  useEffect(() => {
    let selectedVal = [];
    const updatedState = mediaBeat?.forEach((curElem) => {
      const matching = selectedBeat?.find(
        (val) => val.intBeatId === curElem.beatid
      );
      const status = matching ? true : false;
      if (status) {
        selectedVal.push({ ...curElem, status });
      }
    });
    setAllBeat(selectedVal);
  }, [mediaBeat]);

  return allBeat;
};

export default useNavBeatWatch;
