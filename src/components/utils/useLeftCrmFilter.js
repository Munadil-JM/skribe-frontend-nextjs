import { useState } from "react";
import { useEffect } from "react";

const useLeftCrmFilter = (preFilters) => {
  const [city, setCity] = useState([]);
  const [beat, setBeat] = useState([]);
  const [mediaType, setMediaTypes] = useState([]);
  const [outlet, SetOutlet] = useState([]);

  const cities = preFilters?.geo?.map((allCity) => allCity);
  const beats = preFilters?.beat?.map((beats) => beats);
  const mediaTypes = preFilters?.mediaType?.map((mediaType) => mediaType);
  const outlets = preFilters?.outlet?.map((allOutlet) => allOutlet);
  useEffect(() => {
    setCity(cities);
    setBeat(beats);
    setMediaTypes(mediaTypes);
    SetOutlet(outlets);
  }, [preFilters]);
  return { city, beat, mediaType, outlet };
};
export default useLeftCrmFilter;
