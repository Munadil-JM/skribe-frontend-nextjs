import { createContext, useContext, useEffect, useState } from "react";
import { useRequest } from "ahooks";

const JournalistFilterContext = createContext();

export const JournalistFilterProvider = ({ cb, children }) => {
  const [filter, setFilter] = useState({});
  const [isOpenFilter, setIsOpenFilter] = useState({});
  const [isActive, setIsActive] = useState({});

  const { data, error, loading } = useRequest(cb, {
    manual: !!Object.keys(filter).length ? true : false,
    retryCount: 3,
  });

  useEffect(() => {
    if (!loading && !error) {
      let arr = undefined;
      let k = Object.keys(data);
      let key = {};
      arr = Object.keys(data).map((ele) => ele.split("filter")[1]);
      key = {};
      for (let idx in arr) {
        if (key[arr[idx]] == undefined) {
          if (idx == 0) key[arr[idx]] = true;
          else key[arr[idx]] = false;
        }
      }
      setIsOpenFilter(key);
      key = {};
      for (let idx in arr) {
        if (key[arr[idx]] == undefined) {
          key[arr[idx]] = data[k[idx]];
        }
      }
      setFilter(key);
    }
  }, [loading, error]);

  return (
    <JournalistFilterContext.Provider
      value={{
        filter,
        setFilter,
        isOpenFilter,
        setIsOpenFilter,
        isActive,
        setIsActive,
      }}
    >
      {children}
    </JournalistFilterContext.Provider>
  );
};

export const useContextFilter = () => useContext(JournalistFilterContext);
