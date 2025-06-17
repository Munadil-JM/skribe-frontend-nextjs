import { useEffect, useState } from "react";
import userService from "../Services/user.service";

const useCrmData = (url) => {
  const [crmRecords, setCrmRecords] = useState([]);
  const [crmtoken, setCrmToken] = useState("");
  const [crmCount, setCrmCount] = useState();
  const [crmFilters, setCrmFilters] = useState([]);
  useEffect(() => {
    callingCRM(url);
  }, [url]);

  const callingCRM = async (url) => {
    try {
      userService.get(url).then((output) => {
        if (output?.result.length > 0) {
          const records = output?.result;
          const { token, count } = output?.nextpagetoken;
          setCrmRecords(records);
          setCrmToken(token);
          setCrmCount(count);
          if (output?.filters) {
            setCrmFilters(output?.filters);
          }
        } else {
        }
      });
    } catch (error) {
      alert(error?.message);
    }
  };
  return { crmRecords, crmFilters, crmtoken, crmCount };
};
export default useCrmData;
