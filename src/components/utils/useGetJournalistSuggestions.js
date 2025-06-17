import userService from "../../Services/user.service";
import { JOURNALISTSUGGESTIONS } from "../../constants";
import { queryKeys } from "../../reactQuery/constants";
import { useQuery } from "react-query";

async function getJournalistSuggestions(id) {
  //let token = localStorage.getItem("userToken");
  let result = userService
    .get(`${JOURNALISTSUGGESTIONS}${id}`)
    .then((result) => result?.data);
  return result;
}

export function useGetJournalistSuggestions(id) {
  const fallback = [];
  const { data = fallback, isLoading } = useQuery(
    [queryKeys.journoSuggestions, id],
    () => getJournalistSuggestions(id)
  );
  let suggestionData = data;
  let isLoadingSuggestion = isLoading;
  return { suggestionData, isLoadingSuggestion };
}
