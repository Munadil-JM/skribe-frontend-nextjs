import { createContext, useEffect } from "react";
import { useState } from "react";
// import useAllMediaType from "../components/utils/useAllMediaType";
import { GETMEDIATYPE } from "../constants";
import userService from "../Services/user.service";

const JournalistSearchContext = createContext();
const JournalistSearchProvider = ({ children }) => {
  const [allFilter, setAllFilter] = useState([]);
  const [isOpenFilter, setIsOpenFilter] = useState({
    Beat: true,
    City: false,
    MediaType: false,
    Outlets: false,
  });

  useEffect(() => {
    searchWithefilter(`${GETMEDIATYPE}?IsFilter=true&pageSize=10`);
  }, []);

  const searchWithefilter = (url) => {
    userService.get(url).then((result) => {
      if (result?.response?.status === "Ok") {
        setAllFilter(result?.filters);
      }
    });
  };

  return (
    <JournalistSearchContext.Provider
      value={{ allFilter, isOpenFilter, setIsOpenFilter }}
    >
      {children}
    </JournalistSearchContext.Provider>
  );
};

export { JournalistSearchProvider, JournalistSearchContext };
