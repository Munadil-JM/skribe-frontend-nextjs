"use client";

import { useEffect, useState } from "react";
import userService from "../../Services/user.service";
import { GETMEDIATYPE } from "../../constants";

const useAllMediaType = () => {
  const [allFilter, setAllFilter] = useState([]);
  const [journoRecord, setJournoRecord] = useState([]);
  // const [nextpagetoken, setNextPageToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    searchWithefilter(`${GETMEDIATYPE}?IsFilter=true&pageSize=10`);
  }, []);

  const searchWithefilter = (url) => {
    userService
      .get(url)
      .then((result) => {
        if (result?.response?.status === "Ok") {
          setAllFilter(result?.filters);
          setJournoRecord(result?.data);
          // setNextPageToken(result?.nextpagetoken?.token);
          setIsLoading(false);
          // setTotalResult(result?.nextpagetoken?.totalResult);
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };
  return { allFilter, journoRecord, isLoading };
};

export default useAllMediaType;
