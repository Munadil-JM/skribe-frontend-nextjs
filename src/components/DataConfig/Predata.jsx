import { useEffect } from "react";
import { useQueryClient } from "react-query";
import axios from "axios";
import {
  GETMEDIATYPE,
  GETALLBEATS,
  ALLGEO,
  USERPREFERENCES,
} from "../../constants";
import { queryKeys } from "../../reactQuery/constants";

const Predata = () => {
  let token = localStorage.getItem("userToken");
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    Promise.all([prefetchSettings()]);
  });

  const queryClient = useQueryClient();

  async function getAllGeo() {
    let token = localStorage.getItem("userToken");
    let result = await axios.get(ALLGEO, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let { data } = result.data;
    return data;
  }

  async function getSelectedGeo() {
    let result = await axios.get(`${USERPREFERENCES}?userid=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let { userGeoPref } = result.data.data;
    let { userMediaPrefs } = result.data.data;
    let { userBeatPrefs } = result.data.data;
    return { userGeoPref, userMediaPrefs, userBeatPrefs };
  }

  async function prefetchSettings() {
    const key = [queryKeys.allGeo, queryKeys.selectedGeo];
    const arr = [];
    for (let i in key) {
      switch (key[i]) {
        case queryKeys.allGeo: {
          arr.push(await queryClient.prefetchQuery(key[i], getAllGeo));
          break;
        }

        case queryKeys.selectedGeo: {
          arr.push(await queryClient.prefetchQuery(key[i], getSelectedGeo));
          break;
        }

        default:
      }
    }
    return arr;
  }

  return <></>;

  async function mediaType() {
    let result = await axios.get(GETMEDIATYPE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let { data } = result.data;
    return data;
  }

  async function allBeats() {
    let result = await axios.get(GETALLBEATS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let { data } = result.data;

    return data;
  }
};
export default Predata;
