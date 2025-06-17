"use client";

import React, { useState, useEffect, useCallback } from "react";
import userService from "../../Services/user.service";
import { usePathname } from "next/navigation";
import GetTrackingInfo from "./GetTrackingInfo";

const GetFiltersData = React.memo(function GetFiltersData({
  type,
  selectedFilters,
  setSelectedFilters,
  url,
  trackingId,
  geoData,
  method,
  post,
}) {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiHitState, setApiHitState] = useState(false);
  const [allData, setAllData] = useState([]);
  const [filters, setFilters] = useState([]);
  const [rangeFilters, setRangeFilters] = useState([]);
  const [followerCount] = useState([
    {
      id: "0-25k",
      value: "<25k",
    },
    { id: "25k-50k", value: ">25k<50k" },
    {
      id: "50k-1M",
      value: ">50k<1M",
    },
    {
      id: "Above-1M",
      value: ">1M",
    },
  ]);
  const [searchInput, setSearchInput] = useState("");
  const pathname = usePathname();
  const userId = JSON.parse(localStorage.getItem("userInfo"));
  let pathvalue = pathname.split("/").filter((part) => part !== "");
  let urlRead = pathvalue[0];

  useEffect(() => {
    if (geoData) {
      setFilters(geoData);
      setAllData(geoData);
    }
  }, [geoData]);

  const handleCheckboxChange = useCallback(
    (e) => {
      const { id, value, name, checked } = e.target;
      if (name === "Followers") {
        // Update selectedFilters based on checkbox change
        setSelectedFilters((prevFilters) => {
          const updatedFilters = { ...prevFilters };

          // Initialize the array if it doesn't exist
          if (!updatedFilters[type]) {
            updatedFilters[type] = [];
          }

          // Add or remove the value based on checkbox state
          if (!updatedFilters[type].includes(value)) {
            updatedFilters[type] = [];
            updatedFilters[type].push(value); // Add value
          }
          // Remove the key if the array is empty
          if (updatedFilters[type].length === 0) {
            delete updatedFilters[type];
          }

          // Optionally, update count or any other properties
          updatedFilters.count = Object.keys(updatedFilters).reduce(
            (total, key) => {
              if (Array.isArray(updatedFilters[key])) {
                return total + updatedFilters[key].length;
              }
              return total;
            },
            0
          );

          return updatedFilters;
        });
      } else {
        GetTrackingInfo(type, id, urlRead, userId.id, trackingId);

        // Update selectedFilters based on checkbox change
        setSelectedFilters((prevFilters) => {
          const updatedFilters = { ...prevFilters };

          // Initialize the array if it doesn't exist
          if (!updatedFilters[type]) {
            updatedFilters[type] = [];
          }

          // Add or remove the value based on checkbox state
          // if (checked && !updatedFilters[type].includes(id)) {
          //   updatedFilters[type].push(id + " " + value); // Add value
          // } else if (!checked) {
          //   updatedFilters[type] = updatedFilters[type].filter(
          //     (item) => item !== id + " " + value
          //   ); // Remove value
          // }
          // Add or remove the value based on checkbox state
          if (checked) {
            const combinedValue = id + " " + value;
            if (!updatedFilters[type].includes(combinedValue)) {
              updatedFilters[type].push(combinedValue);
            }
          } else {
            updatedFilters[type] = updatedFilters[type].filter(
              (item) => item !== id + " " + value
            );
          }

          // Remove the key if the array is empty
          if (updatedFilters[type].length === 0) {
            delete updatedFilters[type];
          }

          // Optionally, update count or any other properties
          updatedFilters.count = Object.keys(updatedFilters).reduce(
            (total, key) => {
              if (Array.isArray(updatedFilters[key])) {
                return total + updatedFilters[key].length;
              }
              return total;
            },
            0
          );

          return updatedFilters;
        });
      }
    },
    [selectedFilters, setSelectedFilters]
  );

  const searchResult = (e, name) => {
    const { value: val } = e.target;
    let result = allData?.filter((curItem) =>
      curItem?.value?.toLowerCase().includes(val?.toLowerCase())
    );
    if (result.length > 0) {
      setFilters(result);
    } else {
      setFilters([{ value: `No ${type} Exist` }]);
    }
  };
  const clearButton = () => {
    setSearchInput("");
    setFilters(allData);
  };

  const filterApi = async (url, method) => {
    setLoading(true);
    //pre define data for Twitter follower filter only
    if (url === "preDefineData") {
      setRangeFilters(followerCount);
    } else if (method === "POST") {
      await userService
        .post(url)
        .then((response) => {
          if (response?.response?.status === "Ok") {
            setFilters(
              response?.result?.aggregations?.distinct_websites?.buckets
            );
            setAllData(
              response?.result?.aggregations?.distinct_websites?.buckets
            );
          }
        })
        .catch((error) => {
          console.error("Error fetching filters:", error.response);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      await userService
        .get(url)
        .then((response) => {
          // console.log(response, "check response here...");
          if (response.data) {
            setFilters(response.data);
            setAllData(response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching filters:", error.response);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    setLoading(false);
  };

  const callSelectedAPI = (e, url) => {
    const dataType = e.target.dataset.name;
    if (dataType.includes(type) && !active && !apiHitState) {
      filterApi(url, method);
      setApiHitState(true);
    }
    // else {
    //   setFilters(followerCount);
    // }

    setActive((prev) => !prev);
  };

  //FOLLLWING FUNCTION USE FOR QUOTES SPOKES PERSON FILTER ON CAMPAIGN DETAIL PAGE
  const handleCheckboxChangeFor = (e) => {
    const { id, value, name, checked } = e.target;

    if (name === "Followers") {
      // Update selectedFilters based on checkbox change
      setSelectedFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters };

        // Initialize the array if it doesn't exist
        if (!updatedFilters[type]) {
          updatedFilters[type] = [];
        }

        // Add or remove the value based on checkbox state
        if (!updatedFilters[type].includes(value)) {
          updatedFilters[type] = [];
          updatedFilters[type].push(value); // Add value
        }
        // Remove the key if the array is empty
        if (updatedFilters[type].length === 0) {
          delete updatedFilters[type];
        }

        // Optionally, update count or any other properties
        updatedFilters.count = Object.keys(updatedFilters).reduce(
          (total, key) => {
            if (Array.isArray(updatedFilters[key])) {
              return total + updatedFilters[key].length;
            }
            return total;
          },
          0
        );

        return updatedFilters;
      });
    } else {
      GetTrackingInfo(type, id, urlRead, userId.id, trackingId);

      // Update selectedFilters based on checkbox change
      setSelectedFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters };

        // Initialize the array if it doesn't exist
        if (!updatedFilters[type]) {
          updatedFilters[type] = [];
        }

        // Add or remove the value based on checkbox state
        if (checked && !updatedFilters[type].includes(value)) {
          updatedFilters[type].push(value); // Add value
        } else if (!checked) {
          updatedFilters[type] = updatedFilters[type].filter(
            (item) => item !== value
          ); // Remove value
        }

        // Remove the key if the array is empty
        if (updatedFilters[type].length === 0) {
          delete updatedFilters[type];
        }

        // Optionally, update count or any other properties
        updatedFilters.count = Object.keys(updatedFilters).reduce(
          (total, key) => {
            if (Array.isArray(updatedFilters[key])) {
              return total + updatedFilters[key].length;
            }
            return total;
          },
          0
        );

        return updatedFilters;
      });
    }
  };

  //FOLLLWING SEARCH FUNCTION USE FOR QUOTES SPOKES PERSON FILTER ON CAMPAIGN DETAIL PAGE
  const searchResultSpokes = (e, name) => {
    const { value: val } = e.target;
    let result = allData?.filter((curItem) =>
      curItem?.value?.toLowerCase().includes(val?.toLowerCase())
    );
    if (result.length > 0) {
      setFilters(result);
    } else {
      setFilters([{ value: `No ${type} Exist` }]);
    }
  };

  return (
    <>
      {/* [ALL FILTER WILL BE HERE START]  */}
      <div className="flex flex-wrap gap-2"></div>
      {type !== "Followers" &&
        type !== "Quoted Spokespeople" &&
        post !== "UNIQUE_FILTER" && (
          <>
            <h3
              onClick={(e) => callSelectedAPI(e, url)}
              data-name={type}
              className="flex cursor-pointer items-center justify-between pb-2 text-sm font-medium text-gray-600 hover:text-gray-800"
            >
              {type}
              <span
                data-name={type}
                className={
                  active
                    ? "material-icons-outlined cursor-pointer transition-all"
                    : "material-icons-outlined -rotate-90 cursor-pointer transition-all"
                }
              >
                expand_more
              </span>
            </h3>
            <div
              className={`scroll max-h-60 overflow-y-auto border-l border-[#6521AD] bg-[#f1f1f1]  pr-0 ${
                active && "my-4 mt-0 pb-3 pl-4 pt-0 "
              }`}
            >
              <div
                style={{ display: `${active ? "block" : "none"}` }}
                className="my-3 mb-2 mr-3"
              >
                <div className=" flex items-center   rounded-md border border-gray-200 bg-zinc-50 pl-2 xl:w-full ">
                  <span className="material-icons-outlined text-sm text-gray-600">
                    search
                  </span>
                  <input
                    type="text"
                    onKeyUp={(e) => searchResult(e, type)}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e?.target?.value)}
                    className="w-full rounded-lg bg-zinc-50 px-3 py-2 text-sm text-gray-400 focus:outline-none"
                    placeholder={`Search ${
                      type?.charAt(0)?.toUpperCase() + type?.slice(1)
                    }`}
                  />

                  {searchInput?.length > 0 && (
                    <span
                      onClick={clearButton}
                      className="material-icons-outlined icon-14 cursor-pointer pr-2 text-xs uppercase text-gray-700 hover:text-gray-900  hover:no-underline"
                    >
                      close
                    </span>
                  )}
                </div>
              </div>

              {}

              <ul
                className="space-y-1"
                style={{ display: `${active ? "block" : "none"}` }}
              >
                {filters
                  ? filters.length > 0
                    ? filters?.map((curItem, index) => (
                        <li key={index}>
                          {curItem?.value === `No ${type} Exist` ? (
                            `No ${type} Exist`
                          ) : (
                            <label className="text-sm text-gray-400 ">
                              <input
                                type="checkbox"
                                className="peer/published w-3 h-3 accent-[#318fff] mr-2"
                                id={curItem.id}
                                value={curItem.value}
                                checked={(
                                  selectedFilters[type] || []
                                )?.includes(
                                  curItem.id.toString() +
                                    " " +
                                    curItem.value.toString()
                                )}
                                onChange={handleCheckboxChange}
                              />{" "}
                              {curItem?.value
                                ?.split(" ")
                                ?.map((word, index) => {
                                  if (index === 0) {
                                    if (
                                      word === "CSR" ||
                                      word === "BFSI" ||
                                      word === "B2B"
                                    ) {
                                      return word;
                                    } else {
                                      return (
                                        <span key={index}>
                                          {word?.charAt(0)?.toUpperCase() +
                                            word?.slice(1).toLowerCase()}
                                        </span>
                                      );
                                    }
                                  } else {
                                    return (
                                      <span key={index}>
                                        {" " +
                                          word?.charAt(0)?.toUpperCase() +
                                          word?.slice(1)?.toLowerCase()}{" "}
                                      </span>
                                    );
                                  }
                                })}
                            </label>
                          )}
                        </li>
                      ))
                    : loading
                      ? "Loading..."
                      : "No Filter Exist"
                  : "No Filter Exist"}
              </ul>
            </div>
          </>
        )}
      {/* [/ALL FILTER WILL BE HERE END]  */}

      {/*[FOLLOWER FILTER WILL START ]*/}
      {type === "Followers" && (
        <>
          <h3
            onClick={(e) => callSelectedAPI(e, url)}
            data-name={type}
            className="flex cursor-pointer items-center justify-between pb-2 text-sm font-normal text-gray-600 hover:text-gray-700"
          >
            {type}
            <span
              data-name={type}
              className={
                active
                  ? "material-icons-outlined cursor-pointer transition-all"
                  : "material-icons-outlined -rotate-90 cursor-pointer transition-all"
              }
            >
              expand_more
            </span>
          </h3>
          <div
            className={`scroll max-h-60 overflow-y-auto border-l border-[#6521AD] bg-[#f1f1f1]  pr-0 ${
              active && " mt-0 py-3 pb-0 pt-0 "
            }`}
          >
            {loading && "Loading..."}
            <div style={{ display: `${active ? "block" : "none"}` }}>
              <select
                name="Followers"
                onChange={handleCheckboxChange}
                className="p-1 px-2 border border-gray-200 text-gray-500 rounded-md w-full"
              >
                <option value="">Please select Followers</option>
                {rangeFilters?.length > 0 &&
                  rangeFilters?.map((curItem) => {
                    return (
                      <>
                        <option value={curItem.id + " " + curItem.value}>
                          {curItem.value}
                        </option>
                      </>
                    );
                  })}
              </select>
            </div>
          </div>
        </>
      )}
      {/*[FOLLOWER FILTER WILL END ]*/}

      {/* [/CAMPAIGN DETAIL PAGE LEFT SIDE FILTER START FOR QUOTED SPOKES PEOPLE]  */}
      {(type === "Quoted Spokespeople" ||
        (type === "Topics" && post === "UNIQUE_FILTER")) && (
        <>
          <h3
            onClick={(e) => callSelectedAPI(e, url)}
            data-name={type}
            className="flex cursor-pointer items-center justify-between pb-2 text-sm font-normal text-gray-600 hover:text-gray-700"
          >
            {type}
            <span
              data-name={type}
              className={
                active
                  ? "material-icons-outlined cursor-pointer transition-all"
                  : "material-icons-outlined -rotate-90 cursor-pointer transition-all"
              }
            >
              expand_more
            </span>
          </h3>
          <div
            className={`scroll max-h-60 overflow-y-auto border-l border-[#6521AD] bg-[#f1f1f1]  pr-0 ${
              active && "my-4 mt-0 pb-3 pl-4 pt-0 "
            }`}
          >
            <div
              style={{ display: `${active ? "block" : "none"}` }}
              className="my-3 mb-2 mr-3"
            >
              <div className=" flex items-center   rounded-md border border-gray-200 bg-zinc-50 pl-2 xl:w-full ">
                <span className="material-icons-outlined text-sm text-gray-600">
                  search
                </span>
                <input
                  type="text"
                  onKeyUp={(e) => searchResultSpokes(e, type)}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e?.target?.value)}
                  className="w-full rounded-lg bg-zinc-50 px-3 py-2 text-sm text-gray-400 focus:outline-none"
                  placeholder={`Search ${
                    type?.charAt(0)?.toUpperCase() + type?.slice(1)
                  }`}
                />

                {searchInput?.length > 0 && (
                  <span
                    onClick={clearButton}
                    className="material-icons-outlined icon-14 cursor-pointer pr-2 text-xs uppercase text-gray-700 hover:text-gray-900 hover:no-underline"
                  >
                    close
                  </span>
                )}
              </div>
            </div>

            {}

            <ul
              className="space-y-1"
              style={{ display: `${active ? "block" : "none"}` }}
            >
              {filters
                ? filters.length > 0
                  ? filters?.map((curItem, index) => (
                      <li key={index}>
                        {curItem?.value === `No ${type} Exist` ? (
                          `No ${type} Exist`
                        ) : (
                          <label className="text-sm  text-gray-400 ">
                            <input
                              type="checkbox"
                              className="peer/published w-3 h-3 accent-[#FF3EA5] hover:accent-[#FF3EA5] mr-1"
                              id={curItem.value}
                              value={curItem.value}
                              checked={selectedFilters[type]?.includes(
                                curItem.value.toString()
                              )}
                              onChange={handleCheckboxChangeFor}
                            />{" "}
                            {curItem?.value?.split(" ")?.map((word, index) => {
                              if (index === 0) {
                                if (
                                  word === "CSR" ||
                                  word === "BFSI" ||
                                  word === "B2B"
                                ) {
                                  return word;
                                } else {
                                  return (
                                    <span key={index}>
                                      {word?.charAt(0)?.toUpperCase() +
                                        word?.slice(1).toLowerCase()}
                                    </span>
                                  );
                                }
                              } else {
                                return (
                                  <span key={index}>
                                    {" " +
                                      word?.charAt(0)?.toUpperCase() +
                                      word?.slice(1)?.toLowerCase()}{" "}
                                  </span>
                                );
                              }
                            })}
                          </label>
                        )}
                      </li>
                    ))
                  : loading
                    ? "Loading..."
                    : "No Filter Exist"
                : "No Filter Exist"}
            </ul>
          </div>
        </>
      )}
      {/* [/CAMPAIGN DETAIL PAGE LEFT SIDE FILTER END]  */}
    </>
  );
});

export default GetFiltersData;
