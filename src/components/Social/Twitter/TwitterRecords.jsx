"use client";

import { useEffect, useState } from "react";
import { baseURL } from "../../../constants";
import noUser from "../../assets/noUser.png";
import Link from "next/link";

const TwitterRecords = ({ data, onCheckboxChange, isSelected, disabled }) => {
  const [convertNumber, setConvertNumber] = useState("");

  useEffect(() => {
    const number = data?.vchTwitterFollow;
    if (number >= 1_000_000) {
      // Convert to millions and format with 'M'
      let output = (number / 1_000_000).toFixed(1) + "M";
      setConvertNumber(output);
    } else if (number >= 1_000) {
      // Convert to thousands and format with 'k'
      let output = (number / 1_000).toFixed(1) + "k";
      setConvertNumber(output);
    } else {
      // Return the number as is if it's less than 1,000
      let output = number;
      setConvertNumber(output);
    }
  }, [data?.vchTwitterFollow]);

  return (
    <div className="relative flex w-1/4 flex-shrink flex-grow flex-col overflow-hidden rounded-lg border border-gray-300 p-3  py-3 pb-5 pt-9 lg:w-1/3  xl:w-1/4">
      <figure className="relative mb-1 flex flex-1 flex-col items-center">
        <input
          type="checkbox"
          name={data?.intJournalistId}
          id={data?.intJournalistId}
          className="peer/published absolute -top-5 right-3 h-4 w-4 accent-[#318fff]"
          value="abc"
          checked={isSelected}
          disabled={disabled}
          onChange={(e) => onCheckboxChange(e.target, data.intJournalistId)}
        />
        {/* <Link href={`/insta-detail/${data?.intJournalistId}`}> */}
        <Link
          href={`/journalist-profile/${data?.intJournalistId}`}
          target="_blank"
        >
          <img
            src={
              data?.vchPhotoPath
                ? data.vchPhotoPath !== ""
                  ? baseURL + data?.vchPhotoPath
                  : noUser.src
                : noUser.src
            }
            alt=""
            className="h-28 w-28 rounded-full object-cover"
          />
        </Link>
        <figcaption className="text-sm flex flex-col items-center pt-4 text-gray-900">
          <div className="text-md line-clamp-2 max-h-12 overflow-hidden text-center font-medium text-[#002b5b]">
            {/* <Link href={`/insta-detail/${data?.instagram_id}`}> */}
            <Link
              href={`/journalist-profile/${data?.intJournalistId}`}
              target="_blank"
            >
              {data?.vchJournalistName === "" && "Name N/A"}
              {data?.vchJournalistName?.slice(0, 1).toUpperCase()}
              {data?.vchJournalistName?.slice(1).toLowerCase()}
            </Link>
          </div>
          <span className="pt-2 text-center text-xs font-medium leading-none text-gray-600">
            {data?.vchOutletName?.slice(0, 1).toUpperCase()}
            {data?.vchOutletName?.slice(1).toLowerCase()}
          </span>
          <div className="text-sm line-clamp-2 h-8 leading-4 overflow-hidden text-center text-gray-400">
            {data?.vchBeat}
          </div>
          <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap text-sm leading-6">
            {data?.vchCity?.slice(0, 1).toUpperCase()}
            {data?.vchCity?.slice(1).toLowerCase()}
          </div>
          <span className="pt-2 text-gray-700 font-semibold text-center text-sm  leading-none ">
            <Link
              href={`https://www.x.com/${data?.vchTwitterLink}`}
              target="_blank"
            >
              {" "}
              {data?.vchTwitterLink === "" ? "N/A" : data?.vchTwitterLink}
            </Link>
          </span>
          <div className="mt-1">
            <div className="relative left text-center text-sm leading-none text-gray-900 font-medium">
              Followers: {convertNumber}
            </div>
          </div>
        </figcaption>
      </figure>
    </div>
  );
};

export default TwitterRecords;
