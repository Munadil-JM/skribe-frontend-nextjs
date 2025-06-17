import {
  trendingTopic,
  topicAuthorAPI,
  topicWebsiteAPI,
  topicAPI_Article,
} from "../../constants";
import { queryKeys } from "../../reactQuery/constants";
import axios from "axios";
import { useQuery } from "react-query";

async function trendingTopicApi(keyword) {
  let token = localStorage.getItem("userToken");
  if (keyword !== undefined) {
    let result = await axios.post(
      `${trendingTopic}${encodeURIComponent(keyword)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let { data } = result.data;
    const {
      aggregations: {
        topics_name_count: { buckets },
      },
    } = JSON.parse(data);

    console.error(buckets);
    return buckets;
  } else return new Promise((resolve) => resolve([]));
}

export function useTrendingTopicApi(keyword) {
  const fallback = [];
  const { data = fallback, isLoading } = useQuery(
    [queryKeys.TRENDINGTOPIC, keyword],
    () => trendingTopicApi(keyword)
  );

  let topicApiData = data;
  let isLoadingTopicApi = isLoading;
  return { topicApiData, isLoadingTopicApi };
}

async function topicAuthorApi(keyword) {
  let token = localStorage.getItem("userToken");
  if (keyword !== undefined) {
    let result = await axios.post(
      `${topicAuthorAPI}${encodeURIComponent(keyword)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let { data } = result.data;
    const {
      aggregations: {
        topics_outlet_count: { buckets },
      },
    } = JSON.parse(data);

    return buckets;
  } else return new Promise((resolve) => resolve([]));
}

export function useTopicAuthorApi(keyword) {
  const fallback = [];
  const { data = fallback, isLoading } = useQuery(
    [queryKeys.TOPICAUTHOR, keyword],
    () => topicAuthorApi(keyword)
  );

  let topicAuthorData = data;
  let isLoadingTopicAuthor = isLoading;
  return { topicAuthorData, isLoadingTopicAuthor };
}

async function topicWebsiteApi(keyword) {
  let token = localStorage.getItem("userToken");
  if (keyword !== undefined) {
    let result = await axios.post(
      `${topicWebsiteAPI}${encodeURIComponent(keyword)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let { data } = result.data;
    const {
      aggregations: {
        topics_outlet_count: { buckets },
      },
    } = JSON.parse(data);
    return buckets;
  } else return new Promise((resolve) => resolve([]));
}

export function useTopicWebsiteApi(keyword) {
  const fallback = [];
  const { data = fallback, isLoading } = useQuery(
    [queryKeys.TOPICWEBSITE, keyword],
    () => topicWebsiteApi(keyword)
  );

  let topicWebsiteData = data;
  let isLoadingTopicWebsite = isLoading;
  return { topicWebsiteData, isLoadingTopicWebsite };
}


/* async function for aggregation topic */
export async function topicApiAggrs(buckets) {
  if (!buckets.length)
    return new Promise((resolve, reject) =>
      reject("Error 01: Do not have data to show!")
    );

  const aggregations = {};
  for (let ele of buckets) {
    try {
      const n = ele.key.split(" ").join("");
      if (aggregations[`topic_count_${n}`] === undefined) {
        aggregations[`topic_count_${n}`] = { doc_count: ele.doc_count };
      }
    } catch (error) {}
  }

  return new Promise((resolve, reject) =>
    setTimeout(() => resolve(aggregations), 500)
  );
}

export default async function spokesperson_article({
  pageParam,
  keyword,
  brandArr,
}) {
  if (!brandArr.length) return { data: [], totalPage: 1, currentPage: 1 };
  const login_TKN = localStorage.getItem("userToken");
  let processed_url = undefined;
  let currentPage = undefined;
  if (!pageParam)
    processed_url = `${topicAPI_Article}${encodeURIComponent(keyword)}`;
  else
    processed_url = `${topicAPI_Article}${encodeURIComponent(
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
