import { useInfiniteScroll } from "ahooks";
import tokenService from "../../Services/token.service";
import axios from "axios";

export const getReqURL = (fData, url) => {
  let urlBuilder = url;
  let flag = false;
  for (let allKeys in fData) {
    if (fData[allKeys].length > 0) {
      let output = fData[allKeys].map((curItem) => curItem.split(" ")[0]);
      if (fData[allKeys].length > 0 && !flag) {
        urlBuilder = `${urlBuilder}${allKeys}Filter=${output}`;
        flag = true;
      } else if (fData[allKeys]?.length > 0 && flag)
        urlBuilder = `${urlBuilder}&${allKeys}Filter=${output}`;
    }
  }
  return urlBuilder + "&IsFilter=false";
};

export async function getLoadMoreList(url) {
  const totalCount = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${tokenService.getLocalAccessToken()}`,
    },
  });
  return {
    total: totalCount?.data,
  };
}

export const useTotalCount = (fData, count, URL, searchDeps, selected) => {
  const { data, loading, loadMore, loadingMore, noMore, podcastGenre } =
    useInfiniteScroll(
      (param) => {
        if (!!count) {
          if (!!param?.nextpagetoken) {
            return getLoadMoreList(
              getReqURL(fData, URL) +
                "&token=" +
                encodeURIComponent(param.nextpagetoken)
            );
          } else {
            return getLoadMoreList(getReqURL(fData, URL));
          }
        } else {
          if (!!param?.nextpagetoken)
            return getLoadMoreList(
              URL + "&token=" + encodeURIComponent(param.nextpagetoken)
            );
          else return getLoadMoreList(URL);
        }
      },
      {
        isNoMore: (param) => param?.nextpagetoken === undefined,
        reloadDeps: [count, searchDeps, selected],
      }
    );

  const totalCounts = data?.total?.data;

  return {
    totalCounts,
  };
};
