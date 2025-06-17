import { useEffect, useState } from "react";

const usePrefLeftFilter = (preData) => {
  const data = preData;

  const [city, setCity] = useState([]);
  const [beat, setBeat] = useState([]);
  const [mediaT, setMediaT] = useState([]);
  const [outlet, setOutlet] = useState([]);
  const cities = data?.geo?.map((city) => city).flat();
  const beats = data?.beat?.map((beat) => beat).flat();
  const mediaTypes = data?.mediaType?.map((media) => media).flat();
  const outlets = data?.outlet?.map((outlet) => outlet).flat();

  useEffect(() => {
    //CITIES FILTER

    if (cities && cities.length > 0) {
      let uniqueVal = cities.filter(
        (val, ind) =>
          cities.findIndex((number) => val.geoName === number.geoName) === ind
      );
      if (uniqueVal.length > 0) {
        let checkStatus = uniqueVal.map((name) => ({ name, status: true }));
        setCity(checkStatus);
      }

      setCity(uniqueVal);
    }
  }, [preData]);

  useEffect(() => {
    //BEAT DATA FILTER
    if (beats && beats.length > 0) {
      let uniqueVal = beats.filter(
        (val, ind) =>
          beats.findIndex((number) => val.intBeatId === number.intBeatId) ===
          ind
      );
      setBeat(uniqueVal);
    }

    //MEDIA TYPE FILTER
    if (mediaTypes && mediaTypes.length > 0) {
      let uniqueVal = mediaTypes.filter(
        (val, ind) =>
          mediaTypes.findIndex(
            (number) => val.mediaTypeId === number.mediaTypeId
          ) === ind
      );
      setMediaT(uniqueVal);
    }
    //OUTLET FILTER
    if (outlets && outlets.length > 0) {
      let uniqueVal = outlets.filter(
        (val, ind) =>
          outlets.findIndex((number) => val.outletId === number.outletId) ===
          ind
      );
      setOutlet(uniqueVal);
    }
  }, [preData]);
  return { city, beat, mediaT, outlet };
};

export default usePrefLeftFilter;
