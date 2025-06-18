"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { ALLBEATS } from "../../constants";
import { useSelector } from "react-redux";
import { get_Articles_ByBeat } from "../../Redux/Action/Settings";

const BeatNav = ({ active, currentTab }) => {
  const [selctedBeats, setSelectedBeats] = useState([]);

  const token = useSelector((state) => state.auth.authToken);
  // const dispatch = useDispatch();

  const getActiveBeats = async (ALLBEATS) => {
    await axios
      .get(ALLBEATS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setSelectedBeats(result.data.data);
      });
  };

  const beatLoad = (bId) => {
    get_Articles_ByBeat(token, bId);
    active(bId);
  };

  useEffect(() => {
    getActiveBeats(ALLBEATS);
  }, []);

  useEffect(() => {
    if (selctedBeats.length > 0) {
      selctedBeats.filter((curItem) => {
        if (curItem.status > 0) {
          active(curItem.beatId);
        }
      });
    }
  }, [selctedBeats]);

  return (
    <>
      {selctedBeats.length > 0 &&
        selctedBeats.map((data) => {
          if (data.status === true) {
            return (
              <li key={data.beatId}>
                <Link
                  href={""}
                  onClick={() => beatLoad(data.beatId)}
                  className={
                    currentTab === data.beatId
                      ? "flex bg-gray-600 bg-opacity-60 px-4 py-2 text-sm  text-gray-500"
                      : "flex bg-teal-50 bg-opacity-60 px-4 py-2 text-sm text-gray-500 hover:bg-gray-400 hover:text-white"
                  }
                >
                  {data.beatName}
                </Link>
              </li>
            );
          }
        })}
    </>
  );
};

export default BeatNav;
