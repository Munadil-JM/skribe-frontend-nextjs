import { queryKeys } from "../../reactQuery/constants";
import axios from "axios";
import { GETALLTOPICS } from "../../constants";
import { useQuery } from "react-query";
// import userService from "../../Services/user.service";

async function getAllTopic() {
  let token = localStorage.getItem("userToken");
  //let result = userService.get(`${GETALLTOPICS}`);
  let result = await axios.get(GETALLTOPICS, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  let { data } = result.data;
  return data;
}

export function useAllTopic() {
  const fallback = [];
  const { data = fallback, isLoading } = useQuery(
    queryKeys.ALLTOPIC,
    getAllTopic
  );
  let topicData = data;
  let isLoadingTopic = isLoading;
  return { topicData, isLoadingTopic };
}

/* import { useEffect, useState } from "react";
import { GETALLTOPICS } from "../../constants";
import axios from "axios";

export const useAllTopics = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    AllTopic(GETALLTOPICS);
  }, []);

  const AllTopic = async (url) => {
    try {
      let token = localStorage.getItem("userToken");
      let data = await axios.get(GETALLTOPICS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTopics(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return topics;
}; */
