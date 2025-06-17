"use client";

import { useEffect, useRef, useState } from "react";
import GetFiltersData from "../../Filters/GetFiltersData";
// import SearchRecord from "./SearchRecord";
// import { useLeftJournoSearch } from "../../utils/UrlBuilder";
import { ARTICLES_BY_JID } from "../../../constants";
import Link from "next/link";
import userService from "../../../Services/user.service";
import BrandArticle from "./BrandArticle";
import SelectedFilters from "../../SelectedFilters";
import { useNotification } from "../../ErrorAlert/ErrorContextNotification";

const CampaignArticles = ({
  brandKeywords,
  topics,
  campaignId,
  campCreatedDate,
}) => {
  const { showNotification } = useNotification();
  // const success = (msg, type) => showNotification(msg, type);
  const warning = (msg, type) => showNotification(msg, type);
  const error = (msg, type) => showNotification(msg, type);
  const [selectedFilters, setSelectedFilters] = useState({ count: 0 });
  const [articles, setArticles] = useState([]);
  const [selectedKeyword, setSelectedKeyword] = useState([]); // State to track selected item
  const [totalCount, setTotalCount] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  const [spokesPerson, setSpokesPerson] = useState([]);
  const [topic, setTopic] = useState([]);

  //ARTICLE DATE RANGE DROP DOWN STATE
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // const [dateRange, setDateRange] = useState("last6Month");
  // const [dateStatus, setDateStatus] = useState(true);

  const [trackingId, setTrackingId] = useState();
  // const url = `${GETALLJOURNO}`;
  let ARTICLES_BY_ID = `${ARTICLES_BY_JID}`;
  useEffect(() => {
    setTrackingId(generateUUID());
    // Check if brandKeywords are available and initialize selectedKeyword
    if (brandKeywords?.brandKeywords?.length > 0) {
      setSelectedKeyword([brandKeywords?.brandKeywords[0]]); // Initialize with the first keyword if necessary
    }
  }, [brandKeywords]);
  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  const articlesFetch = async () => {
    try {
      setIsLoading(true);
      // setError(null); // Reset any previous errors

      const sendData = {
        campaignId,
        spokespersons: spokesPerson,
        topics: topic,
        keyword: selectedKeyword?.length > 0 ? selectedKeyword : [""],
        pageSize: 10,
        currentPage: currentPage,
      };

      const [data] = await Promise.all([
        userService.post(
          `${ARTICLES_BY_ID}?StartDate=${startDate}&EndDate=${endDate}`,
          sendData
        ),
      ]);

      if (data?.response?.status === "Ok") {
        setArticles(data?.data?.hits?.hits);
        setTotalCount(data?.data?.hits?.total?.value);
        setIsLoading(false);
      } else if (data?.status === "Failed") {
        warning("Campaign id does not exist", "warning");
        setIsLoading(false);
      } else if (data?.status === "No Keyword") {
        warning("No Keyword Found For this Campaign", "warning");
        setIsLoading(false);
      } else {
        warning("Failed to fetch data.", "warning");
      }
    } catch (errors) {
      if (errors?.response?.data?.response?.status === "Failed") {
        error(errors.response.data.response.message, "error");
      }

      // setError("An error occurred while fetching the data.");
    } finally {
      setIsLoading(false);
    }
  };

  //   useEffect(() => {
  //     articlesFetch();
  //   }, [currentPage]);

  // Function to handle Date Range Change
  // const handleDateRangeChange = (e) => {
  //   const range = e.target.value;
  //   setDateRange(range);
  //   let calculatedStartDate = "";
  //   let calculatedEndDate = new Date().toISOString().split("T")[0];
  //   setEndDate(calculatedEndDate);

  //   switch (range) {
  //     case "past24Hours":
  //       calculatedStartDate = new Date(Date.now() - 86400000)
  //         .toISOString()
  //         .split("T")[0];
  //       setDateStatus(true);
  //       break;
  //     case "last3Days":
  //       calculatedStartDate = new Date(Date.now() - 3 * 86400000)
  //         .toISOString()
  //         .split("T")[0];
  //       setDateStatus(true);
  //       break;
  //     case "last1Week":
  //       calculatedStartDate = new Date(Date.now() - 7 * 86400000)
  //         .toISOString()
  //         .split("T")[0];
  //       setDateStatus(true);
  //       break;
  //     case "last1Month":
  //       calculatedStartDate = new Date(Date.now() - 30 * 86400000)
  //         .toISOString()
  //         .split("T")[0];
  //       setDateStatus(true);
  //       break;
  //     case "last6Month":
  //       let today = new Date();
  //       let startDate = new Date(today); // Start with the current date
  //       startDate.setMonth(today.getMonth() - 6);
  //       calculatedStartDate = startDate.toISOString().split("T")[0];
  //       setDateStatus(true);
  //       break;
  //     case "customDateRange":
  //       if (campCreatedDate) {
  //         const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  //         let createdDate = new Date(campCreatedDate)
  //           .toISOString()
  //           .split("T")[0];
  //         setStartDate(createdDate);
  //         setEndDate(today);
  //         setDateStatus(false);
  //         return; // No need to update start date here
  //       } else {
  //         console.error("campCreatedDate is undefined or invalid.");
  //       }
  //       break;

  //     default:
  //       setStartDate("");
  //       setDateStatus(true);
  //       return;
  //   }
  //   setStartDate(calculatedStartDate);
  //   setCurrentPage(1); // Reset page to 1 when date range changes
  // };

  // useEffect(() => {
  //   if (campCreatedDate) {
  //     handleDateRangeChange({ target: { value: "customDateRange" } });
  //   } else {
  //     console.error("campCreatedDate is undefined or invalid.");
  //     handleDateRangeChange({ target: { value: "last6Month" } });
  //   }
  // }, [campCreatedDate]);

  useEffect(() => {
    const updatedSpokesPerson =
      selectedFilters?.["Quoted Spokespeople"]?.length > 0
        ? selectedFilters["Quoted Spokespeople"]
        : [];

    const updatedTopic =
      selectedFilters?.["Topics"]?.length > 0 ? selectedFilters["Topics"] : [];

    setSpokesPerson(updatedSpokesPerson);
    setTopic(updatedTopic);
  }, [selectedFilters]); // This will now react to any changes in selectedFilters

  const isFirstRender = useRef(true); // Track the initial render
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Prevent fetch on initial render
    } else {
      // Check if selectedKeyword has a length greater than 0 before calling the API
      if (selectedKeyword?.length > 0) {
        articlesFetch();
        setArticles([]); // Clear previous articles before fetching new ones
      }
    }
  }, [selectedKeyword, spokesPerson, topic, currentPage, startDate, endDate]);

  useEffect(() => {
    const generateNext30Days = () => {
      if (!campCreatedDate || isNaN(new Date(campCreatedDate))) {
        return;
      }
      const next30Days = [];
      const today = new Date(campCreatedDate);
      for (let i = 1; i <= 30; i++) {
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + i); // Add i days to today
        if (i === 30) {
          next30Days.push(futureDate?.toISOString()?.split("T")[0]); // Format date like "Tue Dec 03 2024 11:48:00 GMT+0530 (India Standard Time)"
        }
      }
      let createdDate = new Date(campCreatedDate).toISOString().split("T")[0];
      setStartDate(createdDate);
      const next30DaysString = next30Days.join(", ");
      setEndDate(next30DaysString);
    };
    generateNext30Days();

    // Set the current date as the max value on mount
    // const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    // if (campCreatedDate) {
    //   let createdDate = new Date(campCreatedDate)?.toISOString()?.split("T")[0];
    //   document
    //     .getElementById("startDateInput")
    //     .setAttribute("max", createdDate);

    // document.getElementById("endDateInput").setAttribute("max", today);
    // }
  }, [campCreatedDate]);

  // const handleStartDateChange = (e) => {
  //   const newStartDate = e.target.value;
  //   if (new Date(newStartDate) < new Date(campCreatedDate)) {
  //     alert("Start date can not be earlier than campaign created date.");
  //     return;
  //   }
  //   setStartDate(newStartDate);
  // };
  // console.log(new Date(campCreatedDate), "chkkkkkkkkk");
  // const handleEndDateChange = (e) => {
  //   const newEndDate = e.target.value;
  //   if (newEndDate < new Date(campCreatedDate)?.toISOString()?.split("T")[0]) {
  //     alert("End date cannot be earlier than start date.");
  //     return;
  //   }
  //   setEndDate(newEndDate);
  // };

  const getBrandData = (brandName) => {
    setSelectedKeyword((prev) => {
      const newSelected = prev.includes(brandName)
        ? prev.filter((item) => item !== brandName)
        : [...prev, brandName];

      // Ensure we don't remove the last value if it's the only one left
      if (newSelected.length === 0 && prev.length === 1) {
        alert("One Brand will be selected by default");
        return prev; // return the previous selection if it's the last item
      }

      return newSelected;
    });
  };

  const createdDate = (date) => {
    const dateObj = new Date(date);
    const dates = dateObj.getDate();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${dates}/${month}/${year}`;
  };

  return (
    <>
      <section className="bg-gray-100 mt-3 p-5 pt-0 rounded-lg">
        <SelectedFilters
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />

        <div className="flex gap-x-8 bg-gray-100 rounded-lg pt-3">
          <aside className="flex flex-col w-4/12 gap-6 mt-1 md:flex md:w-7/12 lg:w-1/3">
            <div className="relative mt-[0px] flex items-center justify-between text-md">
              Articles
            </div>

            <fieldset className="self-start w-full px-3 border border-gray-300 rounded-xl bg-white">
              <h3 className="p-3 text-gray-900 uppercase text-md">Brands</h3>
              <ul className="flex flex-wrap gap-2 pb-3 px-3">
                {brandKeywords?.brandKeywords?.length > 0 &&
                  brandKeywords?.brandKeywords?.map((curItem, index) => {
                    const isSelected = selectedKeyword?.includes(curItem);
                    return (
                      <li className="flex ">
                        <span>
                          <Link
                            href=""
                            onClick={() => getBrandData(curItem)}
                            className={`${
                              isSelected
                                ? "bg-gray-500 text-white"
                                : "bg-gray-200 text-gray-00"
                            } px-4 py-2 rounded-full text-xs`}
                          >
                            {curItem.charAt(0).toUpperCase() +
                              curItem.slice(1).toLowerCase()}
                          </Link>
                        </span>
                      </li>
                    );
                  })}
              </ul>
              <h3 className="p-3 text-gray-900 uppercase text-md">Filters</h3>
              <div className="w-full p-3">
                <GetFiltersData
                  type="Quoted Spokespeople"
                  trackingId={trackingId}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  url={`GetJournalistSpokPerson?intcampid=${campaignId}`}
                />

                <GetFiltersData
                  type="Topics"
                  trackingId={trackingId}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  url={`GetJournalistBrandTopic?intcampid=${campaignId}`}
                  post="UNIQUE_FILTER"
                />
              </div>
            </fieldset>
          </aside>

          <article className="flex flex-col flex-wrap self-start w-full mt-1 ">
            <div className="flex self-end justify-end w-96 mb-4">
              <div className="flex flex-col gap-2 text-sm md:flex-row gap-x-3 pr-0">
                <div className="text-xs text-gray-600 p-2 py-1 border border-gray-300 rounded-md">
                  StartDate: {createdDate(startDate)}
                </div>
                <div className="text-xs text-gray-600  p-2 py-1 border border-gray-300 rounded-md">
                  End Date: {createdDate(endDate)}
                </div>
                {/* <div className="border-[1px] border-[#000] border-opacity-20 rounded-[5px]">
                  <select
                    className="p-1 px-2 border border-gray-200 text-gray-500 rounded-md focus:outline-none"
                    size={"sm"}
                    // onChange={handleDateRangeChange}
                    focusbordercolor="transparent"
                    border={"none"}
                    value={dateRange} // Set the default value here
                  >
                    <option value="">Select Date Range</option>
                    <option value="past24Hours">Past 24 hours</option>
                    <option value="last3Days">Last 3 days</option>
                    <option value="last1Week">Last 1 week</option>
                    <option value="last1Month">Last 1 month</option>
                    <option value="last6Month">Last 6 Months</option>
                    <option value="customDateRange">Custom Date Range</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2 md:flex-row">
                  <div className="border-[1px] border-[#000] border-opacity-20 rounded-[5px]">
                    <input
                      className="text-customGray  xl:w-[120px] w-full p-1 rounded-md focus:outline-none"
                      type="date"
                      value={startDate}
                      //onChange={handleStartDateChange}
                      placeholder="Start Date"
                      variant="filled"
                      sx={{
                        bg: "rgba(51, 51, 51, 0.1)",
                      }}
                      size={"sm"}
                      disabled={dateStatus}
                      focusbordercolor="transparent"
                      border={"none"}
                      id="startDateInput"
                    />
                  </div>
                  <div className="border-[1px] border-[#000] border-opacity-20 rounded-[5px]">
                    <input
                      className="text-customGray  xl:w-[120px] w-full p-1 rounded-md focus:outline-none"
                      type="date"
                      value={endDate}
                      //onChange={handleEndDateChange}
                      placeholder="End Date"
                      variant="filled"
                      sx={{
                        bg: "rgba(51, 51, 51, 0.1)",
                      }}
                      size={"sm"}
                      disabled={dateStatus}
                			focusbordercolor="transparent"
                      border={"none"}
                      id="endDateInput"
                    />
                  </div>
                </div> */}
              </div>
            </div>
            <div className="self-start w-full px-3 border border-gray-300 rounded-xl bg-white  h-[680px] ">
              <div className="flex flex-col justify-between gap-4 py-2 mx-1">
                {/* {isLoading && <p className="p-3">Loading...</p>} */}
                {articles && articles?.length > 0 ? (
                  <BrandArticle
                    articles={articles}
                    loading={isLoading}
                    setCurrentPage={setCurrentPage}
                    totalCount={totalCount}
                    currentPage={currentPage}
                  />
                ) : isLoading ? (
                  <p className="p-3">Loading...</p>
                ) : (
                  <p className="p-3">No Record Found</p>
                )}
              </div>
            </div>

            {/* <div className="flex justify-center mt-2">
          {loadingMore && (
            <p className="px-4 py-1 text-gray-400 whitespace-nowrap">
              Loading journalists...
            </p>
          )}
        </div> */}
          </article>
        </div>
      </section>
    </>
  );
};

export default CampaignArticles;
