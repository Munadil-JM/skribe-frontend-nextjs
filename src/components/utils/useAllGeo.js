import { useQuery } from "react-query";
import { queryKeys } from "../../reactQuery/constants";
import { ALLGEO } from "../../constants";
import { USERPREFERENCES } from "../../constants";
import userService from "../../Services/user.service";

async function getAllGeo() {
  let result = userService.get(`${ALLGEO}`).then(function (output) {
    return output?.data;
  });
  return result;
}

export function useAllGeo() {
  const fallback = [];
  const { data = fallback, isLoading } = useQuery(queryKeys.allGeo, getAllGeo);
  return { data, isLoading };
}

async function getSelectedData() {
  let { id } = JSON.parse(localStorage.getItem("userInfo"));
  let res = userService
    .get(`${USERPREFERENCES}?userid=${id}`)
    .then((result) => {
      return result;
    });
  return res;
}

export function useSelected() {
  const { data, isLoading, isRefetching } = useQuery(
    queryKeys.selected,
    getSelectedData
  );
  let userMediaPrefs = data?.data?.userMediaPrefs;
  let userGeoPref = data?.data?.userGeoPref;
  let selectedBeat = data?.data?.userBeatPrefs;
  let userCompetitorPref = data?.data?.userCompetitorPref;
  let userTopicPref = data?.data?.userTopicPref;
  let userBrandPrefs = data?.data?.userBrandPrefs;
  let userSpokespersonPrefs = data?.data?.userSpokespersonPrefs;
  let isLoadingSelected = isLoading;

  return {
    userGeoPref,
    userMediaPrefs,
    selectedBeat,
    isLoadingSelected,
    userCompetitorPref,
    userTopicPref,
    userBrandPrefs,
    userSpokespersonPrefs,
    isRefetching,
  };
}
