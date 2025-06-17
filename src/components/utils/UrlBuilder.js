import { useInfiniteScroll } from "ahooks";
import userService from "../../Services/user.service";

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
  const data = await userService.get(url);
  return {
    //list key else condition  use for skribeextra page data
    //list: !!data?.data?.data.length ? data?.data?.data : data?.data?.data?.data,
    list: !!data?.data.length
      ? data?.data
      : !!data?.data?.data
      ? data?.data?.data
      : data?.data?.podcastDetails,
    //social podcast listing podcast genre start
    podcastGenre:
      data?.data?.podcastGenre?.length > 0
        ? data?.data?.podcastGenre
        : undefined,
    //social podcast listing podcasrt genre end
    total: data?.nextpagetoken?.totalResult,
    nextpagetoken: !!data?.nextpagetoken?.token
      ? data?.nextpagetoken?.token
      : !!data?.nextpagetoken?.token
      ? data?.nextpagetoken?.token
      : undefined,
  };
}

export const useLeftJournoSearch = (
  fData,
  count,
  URL,
  searchDeps,
  selected
) => {
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

  const isdata = data;

  return {
    isdata,
    loadMore,
    loadingMore,
    noMore,
    loading,
    podcastGenre,
  };
};
