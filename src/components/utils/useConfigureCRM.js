// import { PRECUSTOMCRM } from "../../constants";
// import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
// import { useQuery } from "react-query";
import userService from "../../Services/user.service";

const useConfigureCRM = (urlBuilder) => {
  const [PreCrmData, setPreCrmData] = useState([]);
  const [PreCrmToken, setPreCrmToken] = useState([]);
  const [PreTotalRecords, setPreTotalRecords] = useState([]);
  //const [PreCrmFilters, setPreCrmFilters] = useState([]);
  //ON SCROLL API HIT
  // const [currentPage, setCurrentPage] = useState(0);
  // const userId = localStorage.getItem("userId");
  // const PRECRM_TOKEN = localStorage.getItem("PRE_CRM_Token");
  // const PRECRM_TOTALPAGES = localStorage.getItem("PRE_CRM_TOTAL_PAGES");
  // let token = localStorage.getItem("userToken");
  // abc d
  useEffect(() => {
    callCrm(urlBuilder);
  }, [urlBuilder]);
  const callCrm = async (urlBuilder) => {
    try {
      userService.get(urlBuilder).then((output) => {
        //console.log(output.journoInfo, "check key");
        if (output?.journoInfo?.length > 0) {
          const { token, count } = output?.nextpagetoken;
          let PreCrmData = output?.journoInfo;
          let PreCrmToken = token;
          let PreTotalRecords = count;
          //setPreCrmFilters(output?.data?.filters);
          setPreCrmData(PreCrmData);
          setPreCrmToken(PreCrmToken);
          setPreTotalRecords(PreTotalRecords);
        } else {
        }
      });
    } catch (error) {
      alert(error?.message);
    }
  };

  return { PreCrmData, PreCrmToken, PreTotalRecords };
};

// const fallback = [];

// const { data = fallback, isLoading } = useQuery(
//   ["PreConfigCRM", urlBuilder],
//   () => conCrmData(urlBuilder)
// );
// let PreCrmData = data?.output;
// let PreCrmToken = data?.token;
// let PreTotalRecords = data?.count;
// let isLoad = isLoading;
// if (PreCrmToken) {
//   localStorage.setItem("PRE_CRM_Token", PreCrmToken);
//   localStorage.setItem("PRE_CRM_TOTAL_RECORDS", PreTotalRecords);
// }

// return { PreCrmData, isLoad, PreCrmToken, PreTotalRecords };
//};

export default useConfigureCRM;
