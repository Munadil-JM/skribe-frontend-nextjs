// import { useStatStyles } from "@chakra-ui/stat";
import userService from "../../Services/user.service";
import { GETALLCOMPETITORS } from "../../constants";
// import { queryKeys } from "../../reactQuery/constants";
// import axios from "axios";
// import { useQuery } from "react-query";
import { useState } from "react";
// import { useEffect } from "react";

export async function useAllCompetitor() {
  const [isLoadingCompetitor, setIsLoadingCompetitor] = useState(false);
  //let token = localStorage.getItem("userToken");
  let output = userService.get(`${GETALLCOMPETITORS}`).then((result) => {
    let competitorData = result?.data;
    if (competitorData) {
      setIsLoadingCompetitor(true);
    }

    return { competitorData };
  });
  let { competitorData } = output;
  return { competitorData, isLoadingCompetitor };
}
// let result = await axios.get(GETALLCOMPETITORS, {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });
// let { data } = result.data;
// return data;

// export function useAllCompetitor() {
//   const fallback = [];
//   const { data = fallback, isLoading } = useQuery(
//     queryKeys.ALLCOMPETITOR,
//     getAllCompetitor
//   );
//   let competitorData = data;
//   let isLoadingCompetitor = isLoading;
//   console.log(competitorData, "comppppppppp");
//   return { competitorData, isLoadingCompetitor };
//}
