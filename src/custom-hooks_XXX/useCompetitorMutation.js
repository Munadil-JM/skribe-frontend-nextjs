import { useMutation, useQueryClient } from "react-query";
import { queryKeys } from "../reactQuery/constants";
import { useToast } from "@chakra-ui/react";
import { USERPREFERENCESPOST } from "../constants";
import userService from "../Services/user.service";

async function setCompetitor(sv) {
  const { id } = JSON.parse(localStorage.getItem("userInfo"));
  //const token = localStorage.getItem("userToken");
  let data = {
    clientId: 0,
    userIds: [
      {
        userId: id,
      },
    ],
    remove: [
      {
        media: [{ intMediaId: 0 }],
        beat: [{ intBeatId: 0 }],
        geo: [{ intGeoId: 0 }],
        competitor: [{ intCompetitorId: 0 }],
        topic: [{ intTopicId: 0 }],
        spokesperson: [{ intSpokespersonId: 0 }],
        brand: [{ intBrandId: 0 }],
      },
    ],
    add: [
      {
        media: [{ intMediaId: 0 }],
        beat: [{ intBeatId: 0 }],
        geo: [{ intGeoId: 0 }],
        competitor: [{ intCompetitorId: sv }],
        topic: [{ intTopicId: 0 }],
        spokesperson: [{ intSpokespersonId: 0 }],
        brand: [{ intBrandId: 0 }],
      },
    ],
  };
  userService.post(USERPREFERENCESPOST, data);
  // await axios.post(USERPREFERENCESPOST, data, {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });
}

async function removeCompetitor(sv) {
  const { id } = JSON.parse(localStorage.getItem("userInfo"));
  // const token = localStorage.getItem("userToken");
  let data = {
    clientId: 0,
    userIds: [
      {
        userId: id,
      },
    ],
    remove: [
      {
        media: [{ intMediaId: 0 }],
        beat: [{ intBeatId: 0 }],
        geo: [{ intGeoId: 0 }],
        competitor: [{ intCompetitorId: sv }],
        topic: [{ intTopicId: 0 }],
        spokesperson: [{ intSpokespersonId: 0 }],
        brand: [{ intBrandId: 0 }],
      },
    ],
    add: [
      {
        media: [{ intMediaId: 0 }],
        beat: [{ intBeatId: 0 }],
        geo: [{ intGeoId: 0 }],
        competitor: [{ intCompetitorId: 0 }],
        topic: [{ intTopicId: 0 }],
        spokesperson: [{ intSpokespersonId: 0 }],
        brand: [{ intBrandId: 0 }],
      },
    ],
  };
  userService.post(USERPREFERENCESPOST, data);
  // await axios.post(USERPREFERENCESPOST, data, {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });
}

export function useCompetitorAMutation() {
  let queryClient = useQueryClient();
  let toast = useToast();

  const { mutate } = useMutation((sv) => setCompetitor(sv), {
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryKeys.selected], {
        exact: true,
      });

      toast.closeAll();
      toast({
        title: "Competitor Updated.",
        position: "top",
        description: "We've successfully updated Competitor.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },

    onError: () => {
      toast.closeAll();
      toast({
        title: "Competitor didn't updated.",
        position: "top",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  return mutate;
}

export function useCompetitorRMutation() {
  let queryClient = useQueryClient();
  let toast = useToast();

  const { mutate } = useMutation((sv) => removeCompetitor(sv), {
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryKeys.selected], {
        exact: true,
      });

      toast.closeAll();
      toast({
        title: "Competitor Updated.",
        position: "top",
        description: "We've successfully updated Competitor.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },

    onError: () => {
      toast.closeAll();
      toast({
        title: "Competitor didn't updated.",
        position: "top",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  return mutate;
}
