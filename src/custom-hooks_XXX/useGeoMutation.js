import { useMutation, useQueryClient } from "react-query";
import { queryKeys } from "../reactQuery/constants";
import { useToast } from "@chakra-ui/react";
import { USERPREFERENCESPOST } from "../constants";
import axios from "axios";

async function setGeo(arr) {
  //const userId = localStorage.getItem("userId");
  //const token = localStorage.getItem("userToken");
  let { id } = JSON.parse(localStorage.getItem("userInfo"));
  const { accessToken } = JSON.parse(localStorage.getItem("user"));
  let data = {
    clientId: 0,
    userIds: [
      {
        userId: id,
      },
    ],
    remove: [
      {
        media: [
          {
            intMediaId: 0,
          },
        ],
        beat: [
          {
            intBeatId: 0,
          },
        ],
        geo: arr[1],
        competitor: [
          {
            intCompetitorId: 0,
          },
        ],
        topic: [
          {
            intTopicId: 0,
          },
        ],
        spokesperson: [
          {
            intSpokespersonId: 0,
          },
        ],
        brand: [
          {
            intBrandId: 0,
          },
        ],
      },
    ],
    add: [
      {
        media: [
          {
            intMediaId: 0,
          },
        ],
        beat: [
          {
            intBeatId: 0,
          },
        ],
        geo: arr[0],
        competitor: [
          {
            intCompetitorId: 0,
          },
        ],
        topic: [
          {
            intTopicId: 0,
          },
        ],
        spokesperson: [
          {
            intSpokespersonId: 0,
          },
        ],
        brand: [
          {
            intBrandId: 0,
          },
        ],
      },
    ],
  };

  await axios.post(USERPREFERENCESPOST, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export function useGeoMutation() {
  let queryClient = useQueryClient();
  let toast = useToast();

  const { mutate } = useMutation((arr) => setGeo(arr), {
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryKeys.selected], {
        exact: true,
      });

      toast.closeAll();
      toast({
        title: "Geo Updated.",
        position: "top",
        description: "We've successfully updated geo/location.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },

    onError: () => {
      toast.closeAll();
      toast({
        title: "Geo didn't updated.",
        position: "top",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  return mutate;
}
