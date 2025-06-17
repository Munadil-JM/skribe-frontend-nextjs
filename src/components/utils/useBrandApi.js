import {
  brandAPI,
  brandAPIAggregation,
  brandAPI_Article,
} from "../../constants";
import { queryKeys } from "../../reactQuery/constants";
import axios from "axios";
import { useQuery } from "react-query";

async function brandApi(beatId) {
  let token = localStorage.getItem("userToken");
  if (beatId !== undefined) {
    let result = await axios.get(`${brandAPI}${beatId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let { data } = result.data;
    return data;
  }
}

export function useBrandApi(beatId) {
  const fallback = [];
  const { data = fallback, isLoading } = useQuery(
    [queryKeys.BRANDAPI, beatId],
    () => brandApi(beatId)
  );

  let brandApiData = data;
  let isLoadingBrandApi = isLoading;
  return { brandApiData, isLoadingBrandApi };
}

export async function brandApiAggregateFn({ keyword, arr }) {
  if (!arr.length)
    return new Promise((resolve, reject) =>
      reject("Error 01: Please select one or more brand")
    );
  let token = localStorage.getItem("userToken");
  let result = await axios.post(
    `${brandAPIAggregation}${encodeURIComponent(keyword)}`,
    arr,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  let { data } = result.data;
  data = JSON.parse(data);
  let { aggregations } = data;

  /* error message logic start */
  let cnt = 0;
  for (let idx in aggregations) {
    if (aggregations[idx].doc_count === 0) {
      cnt = cnt + 1;
    }
  }
  if (Object.keys(aggregations).length === cnt) {
    return new Promise((resolve, reject) =>
      reject("Error 02: No data to show")
    );
  }
  /* error message logic end */
  return aggregations;
}

/* export function useBrandApiAggregate({ keyword, arr }) {
  const fallback = [];
  const { data = fallback, isLoading } = useQuery(
    queryKeys.BRANDAPIAGGREGATE,
    () => brandApiAggregateFn(keyword, arr)
  );

  let brandApiAggregate = data;
  let isLoadingBrandApiAggregate = isLoading;
  return { brandApiAggregate, isLoadingBrandApiAggregate };
} */

export default async function brand_article({ pageParam, keyword, brandArr }) {
  if (!brandArr.length) return { data: [], totalPage: 1, currentPage: 1 };
  const login_TKN = localStorage.getItem("userToken");
  let processed_url = undefined;
  let currentPage = undefined;
  if (!pageParam)
    processed_url = `${brandAPI_Article}${encodeURIComponent(keyword)}`;
  else
    processed_url = `${brandAPI_Article}${encodeURIComponent(
      keyword
    )}&searchbefore=${pageParam.searchbefore}&&searchAfter=${
      pageParam.searchAfter
    }`;

  let result = await axios.post(processed_url, brandArr, {
    headers: {
      Authorization: `Bearer ${login_TKN}`,
    },
  });

  result = JSON.parse(result.data.data);
  result = result["hits"];
  const data = result.hits;
  const searchbefore = result.hits[result.hits.length - 1].sort[0];
  const searchAfter = result.hits[result.hits.length - 1].sort[1];
  const count = result.total.value;
  const totalPage = parseInt(count / 10) + (count % 10 !== 0 ? 1 : 0);

  if (!pageParam) currentPage = 1;
  else currentPage = pageParam.currentPage;
  return { data, searchbefore, searchAfter, count, totalPage, currentPage };
}
