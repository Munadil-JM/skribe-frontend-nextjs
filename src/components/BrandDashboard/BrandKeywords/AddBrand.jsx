"use client";

import { useState } from "react";
import {
  DEACTIVE_BRAND,
  ADD_BRAND_KEYWORD,
  DEACTIVE_BRAND_KEYWORDS,
} from "../../../constants";
import userService from "../../../Services/user.service";

const AddBrand = ({ data, fun, message, setMessage }) => {
  const [showComp, setShowComp] = useState(false);
  const [compKeyword, setCompKeyword] = useState("");

  const handleKeyDown = (event, id) => {
    if (event.key === "Enter") {
      addKeys(id);
    }
  };

  const addKeys = async (id) => {
    if (compKeyword?.length <= 2) {
      setMessage({
        type: "brandKeyword",
        message: "Please enter minimum 3 letter to add Keyword!",
      });
    } else if (
      data[0]?.keyword
        ?.map((curItem) => curItem?.value?.toLowerCase())
        ?.includes(compKeyword?.toLowerCase())
    ) {
      setMessage({
        type: "brandKeyword",
        message: "The name is already in use. Please choose a different one.",
      });
    } else {
      try {
        let url = `${ADD_BRAND_KEYWORD}?BrandId=${id}&KeyWord=${encodeURIComponent(
          compKeyword
        )}`;
        let [res] = await Promise.all([userService.post(url)]);
        if (res?.response?.status === "Ok") {
          setCompKeyword("");
          fun();
          setMessage({
            type: "brandKeyword",
            message: "Brand keyword added!",
          });
          document.body.classList.add("overflow-hidden");
        } else if (res?.response?.status === "Limit") {
          setCompKeyword("");
          setMessage({
            type: "brandKeyword",
            message: "You can add a maximum of three keywords",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deActiveBrand = async (id) => {
    let url = `${DEACTIVE_BRAND}?BrandId=${id}`;
    let text = "Are you sure, you want delete it?"; // Custom confirmation message

    const isConfirmed = window.confirm(text); // This shows a simple confirm dialog with OK/Cancel buttons

    if (!isConfirmed) {
      return;
    }

    try {
      let [res] = await Promise.all([userService.post(url)]);
      if (res?.response?.status === "deactivated") {
        fun(); // Assuming 'fun()' does something like refreshing the UI or performing some action
        setMessage({ type: "brand", message: "Brand removed!" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      // Optionally, you could clear loading states or handle any final tasks here
    }
  };

  const deActiveBrandKeyowrd = async (id) => {
    let url = `${DEACTIVE_BRAND_KEYWORDS}?KeywordId=${id}`;
    try {
      let [res] = await Promise.all([userService.post(url)]);
      if (res?.response?.status === "deactivated") {
        fun();
        setMessage({ type: "brand", message: "Brand keyword removed!" });
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <div className="relative bg-gray-100 border border-gray-300 rounded-lg mr-2 w-full p-3 shadow-lg shadow-gray-400 mb-[50px]">
      <ul className="flex  gap-x-2 gap-y-2 mb-2 flex-wrap self-start basis-full">
        <li className="absolute -left-[1px] -top-[35px] border border-gray-300 bg-gray-100 border-b-0 text-md text-gray-600  px-6 py-2 rounded-md flex items-center font-medium">
          {data[0]?.value?.toUpperCase()}

          <span
            onClick={() => deActiveBrand(data[0]?.id)}
            className="absolute cursor-pointer -right-[10px] -top-[6px] material-icons-outlined bg-gray-700 icon-14 p-2 text-white rounded-full ml-2"
          >
            close
          </span>
        </li>

        {data[0]?.keyword?.length < 5 ? (
          <li className="text-md text-gray-800 px-1 pt-1  rounded-md flex flex-col">
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
            <span className="text-red-500">You can add 5 keyword max.</span>
          </li>
        )}
      </ul>
      {data[0]?.keyword?.length < 5 && showComp && (
        <div className="flex my-3 gap-x-4 w-full flex-col">
          <label className="flex justify-between items-start flex-col text-gray-700 md:text-left mb-1 md:mb-0 text-sm">
            Enter alternate names the brand may be known by:
          </label>

          <div className="w-6/12 relative">
            <span
              onClick={() => addKeys(data[0]?.id)}
              className="bg-[#002b5b] cursor-pointer absolute right-0 top-0 text-white px-3 h-10 rounded-tr-md rounded-br-md flex items-center text-sm"
            >
              Add
            </span>
            <input
              type="text"
              className="bg-white rounded w-full lg:w-12/12 text-md py-2 px-2 h-10 border border-gray-400 text-gray-700 focus:outline-none focus:bg-white"
              id="inline-full-name"
              placeholder="Enter alternate name"
              name="keyword"
              value={compKeyword}
              onKeyDown={(e) => handleKeyDown(e, data[0]?.id)}
              onChange={(e) => setCompKeyword(e.target.value)}
              maxLength={35}
            />
            <p className="text-xs text-gray-500">
              Charactor limit: {`${compKeyword?.length ?? 0}/35`}
            </p>
            <span className="text-xs text-red-500">
              You can add 5 keyword max.
            </span>
          </div>
          {message?.type === "brandKeyword" && (
            <p className="text-sm">{message?.message}</p>
          )}
        </div>
      )}
      <ul className="flex  gap-x-2 gap-y-2  flex-wrap">
        {data[0]?.keyword?.length > 0 &&
          data[0]?.keyword?.map((curItem, index) => {
            return (
              <li
                key={index}
                className="border text-sm font-medium bg-white border-gray-400 text-gray-600 px-2 py-1 rounded-md flex items-center"
              >
                {curItem?.value?.slice(0, 1)?.toUpperCase()}
                {curItem?.value?.slice(1)?.toLowerCase()}
                {index >= 1 && (
                  <span
                    onClick={() => deActiveBrandKeyowrd(curItem.id)}
                    className="cursor-pointer material-icons-outlined bg-gray-500 icon-10 p-1 text-white rounded-full ml-2"
                  >
                    close
                  </span>
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default AddBrand;
