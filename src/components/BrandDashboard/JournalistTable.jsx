"use client";

import { baseURL } from "../../constants";
import noUser from "../assets/noUser.png";
import Link from "next/link";

const JournalistTable = ({ data, isSelected, disabled, onCheckboxChange }) => {
  return (
    <>
      <div className="flex items-center justify-between px-4">
        <div>
          <input
            type="checkbox"
            name={data?.journalistId}
            id={data?.journalistId}
            className="peer/published  w-4 h-4 accent-[#318fff]"
            value=""
            checked={isSelected}
            disabled={disabled}
            onChange={(e) => onCheckboxChange(e.target, data.journalistId)}
          />
        </div>
        <div className="flex items-center w-1/2 gap-5 px-4 py-2 basis-2/3 border-r border-black/10">
          <div>
            <Link
              href={`/journalist-profile/${data?.journalistId}`}
              target="_blank"
            >
              <img
                src={
                  !!data?.photo && data?.photo
                    ? baseURL + data?.photo
                    : noUser.src
                }
                alt=""
                className="h-14 w-14 rounded-full object-cover"
              />
            </Link>
          </div>
          <div className="flex flex-col">
            <p className="text-[#333333] font-[500] text-[14px] flex gap-x-4">
              <Link
                href={`/journalist-profile/${data?.journalistId}`}
                target="_blank"
                className="hover:text-gray-900"
              >
                {data?.journalistName}
              </Link>
            </p>
            <p className="text-[#666666] font-[500] text-[12px]">
              {data?.journalistOutlet}
            </p>

            {data?.crm && (
              <div className="self-start px-1 text-center text-xs bg-green-600  font-medium text-white">
                Added to CRM
              </div>
            )}
          </div>
        </div>
        <div className="w-1/2 text-center font-[500] text-[14px] text-[#000]">
          {data?.count}
        </div>
      </div>
    </>
  );
};

export default JournalistTable;
