"use client";

import { useEffect, useState } from "react";
import userService from "../../Services/user.service";
import { GETEMAILQUOTA } from "../../constants";

const useEmailQuota = () => {
  const [quotaAdded, setQuotaAdded] = useState("");
  const [remainingQuota, setRemainingQuota] = useState("");
  const [monthlyEMailQuota, setMonthlyEmailQuota] = useState("");
  const [usedQuota, setUsedQuota] = useState("");
  const [totalQuota, setTotalQuota] = useState("");
  const [emailQuotaStatus, setEmailQuotaStatus] = useState(false);

  const getMailQuota = () => {
    setEmailQuotaStatus(true);
    userService
      .get(`${GETEMAILQUOTA}`)
      .then((result) => {
        if (result?.response?.status === "Ok") {
          setQuotaAdded(result?.data?.emailQuotaAddOn);
          setRemainingQuota(result?.data?.remainingQuota);
          setMonthlyEmailQuota(result?.data?.monthalyEmailQuota);
          setTotalQuota(result?.data?.totalQuota);
          setUsedQuota(result?.data?.usedQuota);
        }
      })
      .catch((error) => {
        alert(error?.message);
      })
      .finally((result) => {
        setEmailQuotaStatus(false);
      });
  };

  useEffect(() => {
    getMailQuota();
  }, []);

  return {
    quotaAdded,
    remainingQuota,
    monthlyEMailQuota,
    usedQuota,
    totalQuota,
    emailQuotaStatus,
  };
};

export default useEmailQuota;
