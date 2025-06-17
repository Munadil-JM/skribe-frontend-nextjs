import { useEffect, useState } from "react";
import userService from "../../Services/user.service";
import { GETCAMPAIGNLIST } from "../../constants";

const useCampaignList = (count) => {
  const [campaignList, setCampaignList] = useState([]);
  const [campaignStatus, setCampaignStatus] = useState(false);

  useEffect(() => {
    getList(`${GETCAMPAIGNLIST}`);
  }, [count]);

  const getList = (url) => {
    userService
      .get(url)
      .then((result) => {
        if (result?.response?.status === "Ok") {
          setCampaignList(result?.lists);
          setCampaignStatus(true);
        }
      })
      .catch((error) => {
        setCampaignList([]);
      })
      .finally(() => {});
  };
  return { campaignList, campaignStatus };
};

export default useCampaignList;
