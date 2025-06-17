import userService from "../../Services/user.service";
import { brandBeat } from "../../constants";
import { queryKeys } from "../../reactQuery/constants";
import { useQuery } from "react-query";

async function getBrandBeat() {
  let result = userService.get(brandBeat).then(function (output) {
    return output?.data;
  });
  return result;
  // let token = localStorage.getItem("userToken");
  // let result = await axios.get(brandBeat, {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });

  // let { data } = result?.data;
  // return data;
}

export function useBrandBeatTrue() {
  const fallback = [];
  const { data = fallback, isLoading } = useQuery(
    queryKeys.BRANDBEATTRUE,
    getBrandBeat
  );
  let beatData = data;
  let isLoadingBeat = isLoading;

  return { beatData, isLoadingBeat };
}
