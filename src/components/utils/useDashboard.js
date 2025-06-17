import { dashboard_API, crm_API } from "../../constants";
import { queryKeys } from "../../reactQuery/constants";
import axios from "axios";
import { useQuery } from "react-query";

async function crm() {
  let token = localStorage.getItem("userToken");
  let result = await axios.get(crm_API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  let { data } = result.data;
  return data;
}

export function useCRM() {
  const fallback = [];
  const { data = fallback, isLoading } = useQuery(queryKeys.CRM, crm);
  let crmData = data;
  let isLoadingCRM = isLoading;
  return { crmData, isLoadingCRM };
}

export default async function dashboard_article({
  pageParam,
  journoProfileId,
}) {
  if (!journoProfileId) return { data: [], totalPage: 1, currentPage: 1 };
  const login_TKN = localStorage.getItem("userToken");
  let processed_url = undefined;
  let currentPage = undefined;
  if (!pageParam)
    processed_url = `${dashboard_API}&jid=${journoProfileId}`;
  else
    processed_url = `${dashboard_API}&token=${pageParam.token}&jid=${journoProfileId}`;

  const result = await axios.get(processed_url, {
    headers: {
      Authorization: `Bearer ${login_TKN}`,
    },
  });

  const { data } = result.data.articles;
  const token = encodeURIComponent(result.data.token.token);
  const count = result.data.token.count;
  const totalPage = parseInt(count / 10) + (count % 10 !== 0 ? 1 : 0);
  if (!pageParam) currentPage = 1;
  else currentPage = pageParam.currentPage;

  return { data, token, count, totalPage, currentPage };
}

/* export default async function dashboard_article() {
  const _token_ = localStorage.getItem("userToken");
  const dashboardLS = JSON.parse(
    localStorage.getItem("dashboard_page_article")
  ) || {
    token: "",
    count: Number.MAX_SAFE_INTEGER,
  };
  let processed_url = undefined;

  if (!dashboardLS.token.length) processed_url = dashboard_API;
  else processed_url = `${dashboard_API}&token=${dashboardLS.token}`;

  const result = await axios.get(processed_url, {
    headers: {
      Authorization: `Bearer ${_token_}`,
    },
  });

  const { data } = result.data.articles;
  const token = result.data.token.token;
  const count = result.data.token.count;
  
  dashboardLS.token = encodeURIComponent(token);
  dashboardLS.count = count;
  localStorage.setItem("dashboard_page_article", JSON.stringify(dashboardLS));

  return data;
} */

export function useDashboard() {
  const fallback = {};
  const { data = fallback, isLoading } = useQuery(
    queryKeys.DASHBOARD,
    dashboard_article
  );
  let dashboardData = data;
  let isLoadingDashboard = isLoading;
  return { dashboardData, isLoadingDashboard };
}
