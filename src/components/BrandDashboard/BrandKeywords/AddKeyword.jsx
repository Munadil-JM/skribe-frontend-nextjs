"use client";

import { useState } from "react";
import {
  ADDCOMPETITORKEYWORDS,
  DEACTIVE_COMP,
  DEACTIVE_COMP_KEYWORDS,
} from "../../../constants";
import userService from "../../../Services/user.service";

const AddKeyword = ({ data, fun, message, setMessage }) => {
  const [showComp, setShowComp] = useState(false);
  const [compKeyword, setCompKeyword] = useState("");

  const handleKeys = (event, id) => {
    if (event.key === "Enter") {
      addKeys(id);
    }
  };

  const addKeys = async (id) => {
    if (compKeyword?.length <= 2) {
      setMessage({
        type: "compkey",
        message: "Please enter minimum 3 letter to add Brand!",
      });
    } else if (
      data?.keyword
        ?.map((curItem) => curItem?.value?.toLowerCase())
        ?.includes(compKeyword?.toLowerCase())
    ) {
      setMessage({
        type: "compkey",
        message: "The name is already in use. Please choose a different one.",
      });
    } else {
      try {
        let url = `${ADDCOMPETITORKEYWORDS}?CompetitorId=${id}&KeyWord=${encodeURIComponent(
          compKeyword
        )}`;
        let [res] = await Promise.all([userService.post(url)]);
        if (res?.response?.status === "Ok") {
          setCompKeyword("");
          fun();
          setMessage({
            type: "compkey",
            message: "Competitor keyword added!",
          });
        } else if (res?.response?.status === "Limit") {
          setCompKeyword("");
          setMessage({
            type: "compkey",
            message: "You can add a maximum of three keywords",
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    }
  };

  const deActiveComp = async (id) => {
    let url = `${DEACTIVE_COMP}?CompetitorId=${id}`;
    try {
      let [res] = await Promise.all([userService.post(url)]);
      if (res?.response?.status === "deactivated") {
        fun();
        setMessage({ type: "compremove", message: "Competitor removed!" });
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const deActiveComp_keyword = async (id) => {
    let url = `${DEACTIVE_COMP_KEYWORDS}?CompetitorId=${id}`;
    try {
      let [res] = await Promise.all([userService.post(url)]);
      if (res?.response?.status === "deactivated") {
        fun();
        setMessage({
          type: "compkeyremove",
          message: "Competitor keyword removed!",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <div className="relative bg-gray-100 border border-gray-300 rounded-lg mr-2 w-full p-3 shadow-lg shadow-gray-400 mb-[50px]">
      <ul className="flex  gap-x-2 gap-y-2 mb-2 flex-wrap self-start basis-full">
        <li className="absolute font-medium left-0 -top-[35px] border border-gray-300 bg-gray-100 border-b-0 text-md text-gray-800  px-6 py-2 rounded-md flex items-center">
          {data?.value.toUpperCase()}

          <span
            onClick={() => deActiveComp(data?.id)}
            className="absolute cursor-pointer -right-[10px] -top-[6px] material-icons-outlined bg-gray-700 icon-14 p-2 text-white rounded-full ml-2"
          >
            close
          </span>
        </li>

        {data?.keyword?.length < 3 ? (
          <li className="text-md  text-gray-800 px-1 pt-1  rounded-md flex flex-col">
            <span
              className="cursor-pointer underline text-md font-medium"
              onClick={() => {
                setShowComp(true);
              }}
            >
              Add Keyword
            </span>
            <span className="text-gray-600 text-sm">
              Add at least one keyword to proceed
            </span>
          </li>
        ) : (
          <li className="text-sm text-gray-800 px-1 pt-1 rounded-md">
            <span className="text-red-500">You can add 3 keyword max.</span>
          </li>
        )}
      </ul>
      {data?.keyword?.length < 3 && showComp && (
        <div className="flex my-3 gap-x-4 w-full flex-col">
          <label className="flex justify-between items-center text-gray-800 md:text-left mb-1 md:mb-0 text-sm">
            Competitor Keyword :
            <span className="text-sm text-red-500">
              You can add 3 keyword max.
            </span>
          </label>

          <div className="w-6/12 relative">
            <span
              onClick={() => addKeys(data?.id)}
              className="bg-[#002b5b] cursor-pointer absolute right-0 top-0 text-white px-3 h-10 rounded-tr-md rounded-br-md flex items-center"
            >
              Add
            </span>
            <input
              type="text"
              className="bg-white rounded w-full lg:w-12/12 text-md py-2 px-4 h-10 border border-gray-400 text-gray-700 focus:outline-none focus:bg-white"
              id="inline-full-name"
              name="KeyWord"
              value={compKeyword}
              onChange={(e) => setCompKeyword(e.target.value)}
              onKeyDown={(e) => handleKeys(e, data?.id)}
              placeholder="Enter competitor keyword"
              maxLength={35}
            />
            <p className="text-xs text-gray-500 pt-1">
              Charactor limit: {`${compKeyword?.length ?? 0}/35`}
            </p>
          </div>
          {message?.type === "compkeyremove" && (
            <p className="test-sm">{message?.message}</p>
          )}
          {message?.type === "compkey" && (
            <p className="test-sm">{message?.message}</p>
          )}
        </div>
      )}
      <ul className="flex  gap-x-2 gap-y-2  flex-wrap">
        {data?.keyword?.map((curItem, index) => {
          return (
            <>
              <li
                key={index}
                className="border text-sm font-medium bg-white border-gray-400 text-gray-600 px-2 py-1 rounded-md flex items-center"
              >
                {curItem?.value?.slice(0, 1)?.toUpperCase()}
                {curItem?.value?.slice(1)?.toLowerCase()}
                {index >= 1 && (
                  <span
                    onClick={() => deActiveComp_keyword(curItem.id)}
                    className="cursor-pointer material-icons-outlined bg-gray-500 icon-10 p-1 text-white rounded-full ml-2"
                  >
                    close
                  </span>
                )}
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default AddKeyword;
