import { createContext, useEffect } from "react";
import { useState } from "react";
// import useAllSearch from "../components/utils/useAllSearch";
import { SEARCHBY } from "../constants";
import userService from "../Services/user.service";

const JournalistSearchContext = createContext();
const JournalistSearchProvider = ({ children }) => {
  const [beatFilter, setBeatFilter] = useState([]);
  const [cityFilter, setCityFilter] = useState([]);
  const [mediaFilter, setMediaFilter] = useState([]);
  const [outletFilter, setOutletFilter] = useState([]);
  const [stateFilter, setStateFilter] = useState([]);
  const [titleFilter, setTitleFilter] = useState([]);

  const [isOpenFilter, setIsOpenFilter] = useState({
    Beat: true,
  });

  useEffect(() => {
    searchWithefilter(`${SEARCHBY}?IsFilter=true&pageSize=10`);
  }, []);

  const searchWithefilter = (url) => {
    userService.get(url).then((result) => {
      if (result?.response?.status === "Ok") {
        setBeatFilter(
          result?.filters?.filterBeat?.map((curItem) => {
            return { ...curItem, status: false };
          })
        );
        setCityFilter(
          result?.filters?.filterCity?.map((curItem) => {
            return { ...curItem, status: false };
          })
        );
        setMediaFilter(
          result?.filters?.filterMedia?.map((curItem) => {
            return { ...curItem, status: false };
          })
        );
        setOutletFilter(
          result?.filters?.filterOutlets?.map((curItem) => {
            return { ...curItem, status: false };
          })
        );
        setStateFilter(
          result?.filters?.filterState?.map((curItem) => {
            return { ...curItem, status: false };
          })
        );
        setTitleFilter(
          result?.filters?.filterTitle?.map((curItem) => {
            return { ...curItem, status: false };
          })
        );
      }
    });
  };
  return (
    <JournalistSearchContext.Provider
      value={{
        beatFilter,
        cityFilter,
        mediaFilter,
        outletFilter,
        stateFilter,
        titleFilter,
        isOpenFilter,
        setBeatFilter,
        setCityFilter,
        setMediaFilter,
        setStateFilter,
        setTitleFilter,
        setIsOpenFilter,
      }}
    >
      {children}
    </JournalistSearchContext.Provider>
  );
};

export { JournalistSearchProvider, JournalistSearchContext };
