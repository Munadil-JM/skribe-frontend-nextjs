import { GETALLBRANDS } from "../../constants";
import { queryKeys } from "../../reactQuery/constants";
import axios from "axios";
import { useQuery } from "react-query";

async function getAllBrand() {
  let token = localStorage.getItem("userToken");
  let result = await axios.get(GETALLBRANDS, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  let { data } = result.data;
  return data;
}

export function useAllBrand() {
  const fallback = [];
  const { data = fallback, isLoading } = useQuery(
    queryKeys.ALLBRAND,
    getAllBrand
  );
  let brandData = data;
  let isLoadingBrand = isLoading;
  return { brandData, isLoadingBrand };
}
