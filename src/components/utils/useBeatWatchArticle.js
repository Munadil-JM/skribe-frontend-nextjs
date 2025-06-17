import { REPORTSAPI } from "../../constants";
import axios from "axios";
import { useQuery } from "react-query";
// GET ARTICLES FOR BEAT SECTION

const smallArticle = async (beatName) => {
  try {
    let token = localStorage.getItem("userToken");
    let val = encodeURIComponent(beatName)
      .replace(/'/g, "%27")
      .replace(/"/g, "%22");
    const passLink = await axios.get(REPORTSAPI + `?Beat=${val}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (passLink?.data?.articles?.data) {
      const output = passLink?.data?.articles?.data;
      return output;
    } else {
      return [];
    }
  } catch (error) {
    //dispatch(ErrorAlert(error.response.data.message));
  }
};
const useBeatWatchArticle = (beatName) => {
  const {
    isError,
    isLoading,
    data = [],
  } = useQuery(["beatWatch_SmallArticle", beatName], () =>
    smallArticle(beatName)
  );
  return { isError, isLoading, data };
};

export default useBeatWatchArticle;
