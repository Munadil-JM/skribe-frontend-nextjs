import { useState } from "react";
import axios from "axios";
import { PRECUSTOMCRM } from "../../../constants";
import { useEffect } from "react";

const HandleScroll = async (e) => {
  const [currentPage, setCurrentPage] = useState(1);
  const userId = localStorage.getItem("userId");
  const PRECRM_TOKEN = localStorage.getItem("PRE_CRM_Token");
  const PRECRM_TOTALPAGES = localStorage.getItem("PRE_CRM_TOTAL_PAGES");
  let token = localStorage.getItem("userToken");

  useEffect(() => {
    if (PRECRM_TOTALPAGES > currentPage) {
      setCurrentPage(currentPage + 1);
    }
  }, [PRECRM_TOTALPAGES]);
  try {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const isBottomReached = scrollTop + clientHeight >= scrollHeight;
    if (isBottomReached) {
      const result = await axios.get(
        PRECUSTOMCRM + userId + `token=${PRECRM_TOKEN}&pageSize=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  } catch (error) {}
};
export default HandleScroll;
