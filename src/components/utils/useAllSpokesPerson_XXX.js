// import userService from "../../Services/user.service";
import { GETALLSPOKES } from "../../constants";
import { queryKeys } from "../../reactQuery/constants";
import axios from "axios";
import { useQuery } from "react-query";

async function getAllSpokesperson() {
  let token = localStorage.getItem("userToken");
  //let result = userService.get(`${GETALLSPOKES}`);
  let result = await axios.get(GETALLSPOKES, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  let { data } = result.data;
  return data;
}

export function useAllSpokesperson() {
  const fallback = [];
  const { data = fallback, isLoading } = useQuery(
    queryKeys.ALLSPOKESPERSON,
    getAllSpokesperson
  );
  let spokespersonData = data;
  let isLoadingSpokesperson = isLoading;
  return { spokespersonData, isLoadingSpokesperson };
}
