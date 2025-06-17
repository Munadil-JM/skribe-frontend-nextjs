import { trendingInfluencer, influencerAPI_Article } from "../../constants";
import { queryKeys } from "../../reactQuery/constants";
import axios from "axios";
import { useQuery } from "react-query";

async function trendingInfluencerApi(keyword) {
  let token = localStorage.getItem("userToken");
  if (keyword !== undefined) {
    let result = await axios.post(
      `${trendingInfluencer}${encodeURIComponent(keyword)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let { data } = result.data;
    const {
      aggregations: {
        author_name_count: { buckets },
      },
    } = JSON.parse(data);

    return buckets;
  } else return new Promise((resolve) => resolve([]));
}

export function useTrendingInfluencerApi(keyword) {
  const fallback = [];
  const { data = fallback, isLoading } = useQuery(
    [queryKeys.BRANDAPI, keyword],
    () => trendingInfluencerApi(keyword)
  );

  let influencerApiData = data;
  let isLoadingInfluencerApi = isLoading;
  return { influencerApiData, isLoadingInfluencerApi };
}

/* async function for aggregation influencer */
export async function influencerApiAggregateFn(keyword, arr, buckets) {
  if (!arr.length)
    return new Promise((resolve, reject) =>
      reject("Error 01: Please select one or more brand")
    );

  const aggregations = {};
  for (let ele of arr) {
    try {
      const n = ele.split(" ").join("");
      if (aggregations[`influencer_count_${n}`] === undefined) {
        const v = buckets.find(({ key, doc_count }) =>
          ele === key ? doc_count : undefined
        );
        aggregations[`influencer_count_${n}`] = { doc_count: v["doc_count"] };
      }
    } catch (error) {}
  }
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

export default async function influencer_article({
  pageParam,
  keyword,
  brandArr,
}) {
  if (!brandArr.length) return { data: [], totalPage: 1, currentPage: 1 };
  const login_TKN = localStorage.getItem("userToken");
  let processed_url = undefined;
  let currentPage = undefined;
  if (!pageParam)
    processed_url = `${influencerAPI_Article}${encodeURIComponent(keyword)}`;
  else
    processed_url = `${influencerAPI_Article}${encodeURIComponent(
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
