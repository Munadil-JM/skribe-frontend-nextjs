"use client";

import { BEATFULLARTICLE } from "../../constants";
import { useQuery } from "react-query";
import userService from "../../Services/user.service";

const beatwatchArticle = async (dId) => {
  try {
    let result = userService
      .get(`${BEATFULLARTICLE}${dId}`)
      .then(function (output) {
        return output?.data?.data;
      });
    return result;

    //const token = localStorage.getItem("userToken");
    //const result = await axios.get(`${BEATFULLARTICLE}${dId}`, {
    //headers: {
    // Authorization: `Bearer ${token}`,
    // },
    // });
    //console.log(result.data.data.data, "full article data");
    //return result;
  } catch (error) {
    alert(error);
  }
};

const useBeatWatchFullArticle = (id) => {
  const {
    isError,
    isLoading,
    data = {},
  } = useQuery(["beatArticels", id], () => beatwatchArticle(id));
  // const result = 1;
  const result = data ? data : {};
  // console.log(data?.data[0])
  return { isError, isLoading, result };
};

export default useBeatWatchFullArticle;
