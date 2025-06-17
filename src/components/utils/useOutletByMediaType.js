import { useEffect, useState } from "react";
import userService from "../../Services/user.service";
import { GETOUTLETBYMEDIATYPE } from "../../constants";

const useOutletByMediaType = (id) => {
  const [outlet, setoutlet] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    searchWithefilter(`${GETOUTLETBYMEDIATYPE}${id}`);
  }, []);

  const searchWithefilter = (url) => {
    userService.get(url).then((result) => {
      if (result?.response?.status === "Ok") {
        setoutlet(result?.data);
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
    });
  };
  return { outlet, isLoading };
};

export default useOutletByMediaType;
