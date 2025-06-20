"use client";

import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { baseURL, JOURNALISTSUGGESTIONS } from "../../constants";
import userService from "../../Services/user.service";
import noUser from "../assets/noUser.png";

const JournalistSugg = ({ id }) => {
  const [suggestedJour, setSuggestedJour] = useState([]);
  const [loading, setLoading] = useState(true);

  const capitalizeFirstLetter = (str) => {
    if (!str) return "N/A";
    const lowercased = str.toLowerCase();
    return lowercased.charAt(0).toUpperCase() + lowercased.slice(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userService.get(`${JOURNALISTSUGGESTIONS}${id}`);
        setSuggestedJour(response.data);
      } catch (error) {
        console.error("Error fetching journalist suggestions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="px-4">
          <Skeleton height={450} />
        </div>
      ) : (
        <>
          <div className="px-4">
            <p className="text-sm font-[500] text-[#333]">
              Suggested Journalists
            </p>
            <hr className="mt-2 mb-2 border-black/10" />
            <div className="overflow-scroll overflow-x-hidden max-h-[450px] scrollbar lg:w-full">
              {suggestedJour?.length > 0 &&
                suggestedJour?.map((ele, index) => (
                  <div
                    className="flex mx-1 my-6 text-center cursor-pointer "
                    key={ele?.journalistId}
                  >
                    <a
                      target="_blank"
                      href={`/journalist-profile/${ele?.journalistId}`}
                      rel="noreferrer"
                      className="flex items-center w-full gap-4 no-underline"
                    >
                      <div>
                        <img
                          className="w-16 h-16 rounded-full "
                          src={
                            ele?.photo
                              ? ele.photo !== ""
                                ? baseURL + ele?.photo
                                : noUser.src
                              : noUser.src
                          }
                          alt=""
                        />
                      </div>
                      <div className="text-sm text-left">
                        <h2 className="font-[500] text-sm">
                          {ele?.journalistName}
                        </h2>
                        <p className="font-[400] text-xs text-customGray">
                          {(ele?.outlets?.length > 0 &&
                            ele?.outlets
                              ?.map((outlet) => outlet?.outletName)
                              .join(", ")) ||
                            "N/A"}
                        </p>
                        <p className="font-[400] text-[11px] text-customGray">
                          {capitalizeFirstLetter(ele?.city?.city)}
                        </p>
                      </div>
                    </a>
                  </div>
                ))}
            </div>
          </div>{" "}
        </>
      )}
    </>
  );
};

export default JournalistSugg;
