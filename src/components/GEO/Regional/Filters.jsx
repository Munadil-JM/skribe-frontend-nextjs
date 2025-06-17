"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import userService from "../../../Services/user.service";
import { usePathname } from "next/navigation";
import GetTrackingInfo from "../../Filters/GetTrackingInfo";

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
  const [selectedCities, setSelectCities] = useState([]);
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
  // const [searchInput, setSearchInput] = useState("");
  const pathname = usePathname();
  const userId = JSON.parse(localStorage.getItem("userInfo"));
  let pathvalue = pathname.split("/").filter((part) => part !== "");
  let urlRead = pathvalue[0];
  const mediaTypeRef = useRef(null);

  const handleClickOutside = (event) => {
    if (mediaTypeRef.current && !mediaTypeRef.current.contains(event.target)) {
      setActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleMouseLeave = () => setActive(false);

    const node = mediaTypeRef.current;
    if (node) node.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (node) node.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

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
          if (checked && !updatedFilters[type].includes(id)) {
            updatedFilters[type].push(id + " " + value); // Add value
          } else if (!checked) {
            updatedFilters[type] = updatedFilters[type].filter(
              (item) => item !== id + " " + value
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
    },
    [selectedFilters, setSelectedFilters]
  );

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
  const callSelectedAPI = (e, url, city) => {
    const dataType = e.target.dataset.name;
    if (dataType.includes(type) && !active && !apiHitState && city !== "city") {
      filterApi(url, method);
      setApiHitState(false);
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

  let selectCity = JSON.parse(localStorage.getItem("cities"));
  useEffect(() => {
    if (selectCity?.length > 0) {
      setSelectCities(selectCity);
    }
  }, []);
  return (
    <>
      {type !== "Cities" ? (
        <>
          <div ref={mediaTypeRef} className="relative w-full">
            <div
              className="flex items-center cursor-pointer bg-[#FFFDF6] py-1 w-full rounded-md border border-[#00000033]"
              onClick={(e) => callSelectedAPI(e, url)}
              data-name={type}
            >
              <h3
                data-name={type}
                className="px-2 relative basis-full flex items-center justify-between bg-[#FFFDF6] rounded-md text-sm text-gray-500"
              >
                {type}
                <span
                  data-name={type}
                  className={`material-icons-outlined cursor-pointer transition-all ${
                    active ? "-rotate-180" : "rotate-0"
                  }`}
                >
                  expand_more
                </span>
              </h3>
            </div>

            <div
              className={`z-30 absolute top-full -mt-[4px] max-h-60 overflow-y-auto bg-white border border-gray-300 shadow-xl rounded-bl-lg rounded-br-lg pr-0 ${
                active ? "my-2 mt-0 pb-3 pl-2 w-full pt-2" : "hidden"
              }`}
            >
              <ul
                className="space-y-2"
                style={{ display: `${active ? "block" : "none"}` }}
              >
                {filters
                  ? filters.length > 0
                    ? filters?.map((curItem, index) => (
                        <li key={index}>
                          {curItem?.value === `No ${type} Exist` ? (
                            `No ${type} Exist`
                          ) : (
                            <label className="text-sm text-gray-400 flex justify-between">
                              <span>
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
                              </span>{" "}
                              <input
                                type="checkbox"
                                className="peer/published w-4 h-4 accent-[#318fff] mr-2"
                                id={curItem.id}
                                value={curItem.value}
                                checked={selectedFilters[type]?.includes(
                                  curItem.id.toString() +
                                    " " +
                                    curItem.value.toString()
                                )}
                                onChange={handleCheckboxChange}
                              />
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
          </div>
        </>
      ) : (
        <>
          <div ref={mediaTypeRef} className="relative w-full">
            <div
              className="flex items-center cursor-pointer bg-[#FFFDF6] py-1 w-full rounded-md border border-[#00000033]"
              onClick={(e) => callSelectedAPI(e, url, "city")}
              data-name={type}
            >
              <h3
                data-name={type}
                className="px-2 relative basis-full flex items-center justify-between bg-[#FFFDF6] rounded-md text-sm text-gray-500"
              >
                {type}
                <span
                  data-name={type}
                  className={`material-icons-outlined cursor-pointer transition-all ${
                    active ? "-rotate-180" : "-rotate-0"
                  }`}
                >
                  expand_more
                </span>
              </h3>
            </div>

            <div
              className={`z-30 absolute top-full -mt-[4px] max-h-60 overflow-y-auto bg-white border border-gray-300 shadow-xl rounded-bl-lg rounded-br-lg pr-0 ${
                active ? "my-2 mt-0 pb-3 pl-2 w-full pt-2" : "hidden"
              }`}
            >
              <ul
                className="space-y-2"
                style={{ display: `${active ? "block" : "none"}` }}
              >
                {selectedCities
                  ? selectedCities.length > 0
                    ? selectedCities?.map((curItem, index) => (
                        <li key={index}>
                          {curItem?.vchCity === `No ${type} Exist` ? (
                            `No ${type} Exist`
                          ) : (
                            <label className="text-sm text-gray-400 flex justify-between">
                              <span>
                                {curItem?.vchCity
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
                              </span>{" "}
                              <input
                                type="checkbox"
                                className="peer/published w-4 h-4 accent-[#318fff] mr-2"
                                id={curItem.intCityid}
                                value={curItem.vchCity}
                                checked={selectedFilters[type]?.includes(
                                  curItem.intCityid.toString() +
                                    " " +
                                    curItem.vchCity.toString()
                                )}
                                onChange={handleCheckboxChange}
                              />
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
          </div>
        </>
      )}
    </>
  );
});

export default GetFiltersData;
