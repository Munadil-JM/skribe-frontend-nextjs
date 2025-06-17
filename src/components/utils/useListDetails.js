import { useEffect, useState } from "react";
import userService from "../../Services/user.service";
import { GETLISTDETAILS } from "../../constants";
// import { clearConfigCache } from "prettier";

const useListDetails = (id, countDeps) => {
  const [listName, setListName] = useState("");
  const [listDescription, setListDescription] = useState("");
  const [listDate, setListDate] = useState("");
  const [count, setCount] = useState(0);
  const [journalists, setJournalists] = useState([]);
  useEffect(() => {
    getListDetails(`${GETLISTDETAILS}${id}`);
  }, [countDeps]);

  const getListDetails = (url) => {
    userService.get(url).then((result) => {
      if (result?.response?.status === "Ok") {
        if ((result?.listDetail?.length ?? 0) > 0) {
          const listDetail = result.listDetail[0];
          setListName(listDetail?.listName?.vchCampaignName);
          setListDescription(listDetail?.listName?.vchListDescription);
          setListDate(listDetail?.listName?.dtCreatedDate);
          setCount(listDetail?.count);
          setJournalists(listDetail?.journalists);
        } else {
          setListName("");
          setListDescription("");
          setListDate("");
          setCount(0);
          setJournalists([]);
        }
      }
    });
  };
  return { listName, listDescription, listDate, count, journalists };
};

export default useListDetails;
