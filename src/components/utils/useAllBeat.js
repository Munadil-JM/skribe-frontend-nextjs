import userService from "../../Services/user.service";
import { GETALLBEATS } from "../../constants";
import { queryKeys } from "../../reactQuery/constants";
import { useQuery } from "react-query";

async function getAllBeat() {
  let result = userService.get(`${GETALLBEATS}`).then((result) => result?.data);
  return result;
}

export function useAllBeat() {
  const fallback = [];
  const { data = fallback, isLoading } = useQuery(
    queryKeys.AllBeat,
    getAllBeat
  );
  let mediaBeat = data;
  let isLoadingBeat = isLoading;
  return { mediaBeat, isLoadingBeat };
}
