import userService from "../../Services/user.service";
import { GETMEDIATYPE } from "../../constants";
import { queryKeys } from "../../reactQuery/constants";
import { useQuery } from "react-query";

async function getAllMedia() {
  //let token = localStorage.getItem("userToken");
  let result = userService
    .get(`${GETMEDIATYPE}`)
    .then((result) => result?.data);
  return result;
}

export function useAllMedia() {
  const fallback = [];
  const { data = fallback, isLoading } = useQuery(
    queryKeys.allMediaType,
    getAllMedia
  );
  let mediaData = data;
  let isLoadingMedia = isLoading;
  return { mediaData, isLoadingMedia };
}
