import userService from "../../Services/user.service";
import { JOURNALISTPORTFOLIO } from "../../constants";
import { queryKeys } from "../../reactQuery/constants";
import { useQuery } from "react-query";
// import { useState, useEffect } from "react";

async function getJournalistPortfolio(id, checkToken) {
  //let token = localStorage.getItem("userToken");
  let result = await userService
    .get(`${JOURNALISTPORTFOLIO}${id}&token=${checkToken}`)
    .then((result) => result);
  return result;
}

export function useGetJournalistPortfolio(id, check) {
  // const [portfolioData, setPortfolioD] = useState([]);

  const fallback = [];
  const { data = fallback, isLoading } = useQuery(
    [queryKeys.journoPortfolio, id, check],
    () => getJournalistPortfolio(id, check)
  );
  let portfolioData = data?.data;
  let checkToken = data?.paging?.token ? data?.paging?.token : "";
  let totalResults = data.paging?.totalResult;
  let isLoadingPortfolio = isLoading;
  return { portfolioData, checkToken, totalResults, isLoadingPortfolio };
}
