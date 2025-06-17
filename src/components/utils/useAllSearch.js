import { useEffect, useState } from "react";
import userService from "../../Services/user.service";
import { SEARCHBY } from "../../constants";

const useAllSearch = () => {
  const [allFilter, setAllFilter] = useState([]);
  const [journoRecord, setJournoRecord] = useState([]);
  const [nextpagetoken, setNextPageToken] = useState("");
  const [totalResult, setTotalResult] = useState(0);

  useEffect(() => {
    searchWithefilter(`${SEARCHBY}?IsFilter=true&pageSize=10`);
  }, []);

  const searchWithefilter = (url) => {
    userService.get(url).then((result) => {
      if (result?.response?.status === "Ok") {
        setAllFilter(result?.filters);
        setJournoRecord(result?.journoInfo);
        setNextPageToken(result?.nextpagetoken?.token);
        setTotalResult(result?.nextpagetoken?.totalResult);
      }
    });
  };
  return { allFilter, journoRecord, nextpagetoken, totalResult };
};

export default useAllSearch;
