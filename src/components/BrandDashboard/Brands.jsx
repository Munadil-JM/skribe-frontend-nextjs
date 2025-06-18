"use client";

import { useEffect, useState } from "react";
import { BRANDARTICLES } from "../../constants";
import userService from "../../Services/user.service";
import GetFiltersData from "../Filters/GetFiltersData";
import BrandArticle from "./BrandArticle";

const Brands = ({ tab, render }) => {
  const [loader, setLoader] = useState(false);
  const [trackingId, setTrackingId] = useState();
  const [brandArticle, setBrandArticle] = useState([]);
  const [totalCount, setTotalCount] = useState("");
  const [selectedOutlet, setSelectedOutlet] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({ count: 0 });

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateRange, setDateRange] = useState("last6Month"); // Default value
  const [dateStatus, setDateStatus] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setTrackingId(generateUUID());
  }, []);


  // Function to generate UUID
  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  // Function to fetch Brand Articles
  const BrandArticles = async (selectedArray = null) => {
    setLoader(true);
    const bodyData = {
      outlet: selectedArray,
    };
    const BrandUrl = `${BRANDARTICLES}?pageNumber=${currentPage}&StartDate=${startDate}&EndDate=${endDate}&pageSize=20`;

    try {
      const response = await userService.post(BrandUrl, bodyData);
      if (response?.response?.status === "Ok") {
        setBrandArticle(response?.result?.hits?.hits);
        setTotalCount(response?.result?.hits?.total?.value);
      }
    } catch (error) {
      console.log(error?.message);
    } finally {
      setLoader(false);
    }
  };

  // Function to handle Date Range Change
  const handleDateRangeChange = (e) => {
    const range = e.target.value;
    setDateRange(range);
    let calculatedStartDate = "";
    let calculatedEndDate = new Date().toISOString().split("T")[0];
    setEndDate(calculatedEndDate);

    switch (range) {
      case "past24Hours":
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        calculatedStartDate = yesterday.toISOString().split("T")[0];
        setDateStatus(true);
        break;
      case "last3Days":
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
        calculatedStartDate = threeDaysAgo.toISOString().split("T")[0];
        setDateStatus(true);
        break;
      case "last1Week":
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        calculatedStartDate = oneWeekAgo.toISOString().split("T")[0];
        setDateStatus(true);
        break;
      case "last1Month":
        calculatedStartDate = new Date(Date.now() - 30 * 86400000)
          .toISOString()
          .split("T")[0];
        setDateStatus(true);
        break;
      case "last6Month":
        let today = new Date();
        let startDate = new Date(today); // Start with the current date
        startDate.setMonth(today.getMonth() - 6);
        calculatedStartDate = startDate.toISOString().split("T")[0];
        setDateStatus(true);
        break;
      case "customDateRange":
        setDateStatus(false);
        setEndDate("");
        break;
      default:
        setStartDate("");
        setDateStatus(true);
        return;
    }
    setStartDate(calculatedStartDate);
  };

  useEffect(() => {
    // Set the start and end date for "past24Hours"
    handleDateRangeChange({ target: { value: "last6Month" } });
  }, []);

  // Function to build URL for filters
  const urlBuilder = () => {
    if (selectedFilters.Outlet && selectedFilters.Outlet.length > 0) {
      return selectedFilters.Outlet.map((curItem) =>
        curItem.split(" ").slice(1).join(" ")
      );
    } else {
      setSelectedOutlet([]);
      return [];
    }
  };

  // var PageLoad = true;
  useEffect(() => {
    if (selectedFilters) {
      setBrandArticle([]); // Clear existing articles
      setCurrentPage(1); // Reset to page 1
      BrandArticles(urlBuilder());
    }
  }, [selectedFilters]);

  useEffect(() => {
    if (currentPage >= 2) {
      setBrandArticle([]);
      BrandArticles(urlBuilder());
    }
  }, [currentPage]);

  // Effect to handle page changes (unchanged)
  useEffect(() => {
    if (startDate || endDate) {
      BrandArticles(urlBuilder());
    }
  }, [startDate, endDate]);

  const removeSelected = (type, curElem) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      // Remove the filter from the selected filters
      updatedFilters[type] = updatedFilters[type].filter(
        (item) => item !== curElem
      );

      // Reset page to 1 when a filter is removed
      setCurrentPage(1);

      // If the array is empty, remove the filter key
      if (updatedFilters[type].length === 0) {
        delete updatedFilters[type];
      }

      // Update the filter count
      updatedFilters.count = Object.keys(updatedFilters).reduce(
        (total, key) =>
          Array.isArray(updatedFilters[key])
            ? total + updatedFilters[key].length
            : total,
        0
      );

      // Return the updated filters
      return updatedFilters;
    });
  };

  useEffect(() => {
    // Set the current date as the max value on mount
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    document.getElementById("endDateInput").setAttribute("max", today);
    document.getElementById("startDateInput").setAttribute("max", today);
    document.getElementById("endDateInput1").setAttribute("max", today);
    document.getElementById("startDateInput1").setAttribute("max", today);
  }, []);

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    if (new Date(newEndDate) < new Date(startDate)) {
      alert("End date cannot be earlier than start date.");
      return;
    }
    setEndDate(newEndDate);
  };

  return (
    <>
      <div className="flex self-end justify-end flex-col xl:flex-row md:-mt-8 lg:w-96 w-full items-end">
        <div className="flex flex-col gap-2 text-sm md:flex-row">
          <div className="border-[1px] border-black/10 bg-gray-100 rounded-[5px]">
            <select
              className="p-1 px-2 text-xs border cursor-pointer border-gray-200 text-gray-500 rounded-md focus:outline-none"
              placeholder="Select Date Range"
              width={{ base: "100%", xl: "200px" }}
              size={"sm"}
              onChange={handleDateRangeChange}
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
            <div className="border-[1px] border-black/10 bg-gray-100 rounded-[5px]">
              <input
                className="text-black/50 xl:w-[120px] w-full p-1 rounded-md focus:outline-none text-xs"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="Start Date"
                variant="filled"
                sx={{
                  bg: "rgba(51, 51, 51, 0.1)",
                }}
                size={"sm"}
                disabled={dateStatus}
                focusbordercolor="transparent"
                border={"none"}
                id="startDateInput1"
              />
            </div>
            <div className="border-[1px] border-black/10 bg-gray-100 rounded-[5px]">
              <input
                className="text-black/50 text-xs xl:w-[120px] w-full p-1 rounded-md focus:outline-none"
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                placeholder="End Date"
                variant="filled"
                sx={{
                  bg: "rgba(51, 51, 51, 0.1)",
                }}
                size={"sm"}
                disabled={dateStatus}
                focusbordercolor="transparent"
                border={"none"}
                id="endDateInput1"
              />
            </div>
          </div>
        </div>
      </div>
      {Object?.keys(selectedFilters).length > 1 && (
        <div className="w-11/12 pr-0 section">
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-wrap items-center px-2 rounded-md">
              {Object?.keys(selectedFilters)?.map((key, index) => (
                <div key={index} className="flex items-center flex-wrap">
                  {key !== "count" && key + ":"}
                  {selectedFilters[key]?.length > 0 &&
                    selectedFilters[key]?.map((curItem, ind) => {
                      return (
                        <div key={ind}>
                          <div className="flex items-center px-2 m-1 border border-gray-400 rounded-md text-sm">
                            {curItem.split(" ").map((curElem, index) => {
                              if (index !== 0) {
                                const formattedWord =
                                  curElem.charAt(0).toUpperCase() +
                                  curElem.slice(1).toLowerCase();
                                return (
                                  <span key={index} className="text-gray-600">
                                    {formattedWord}&nbsp;
                                  </span>
                                );
                              }
                              return null; // Ensure the function always returns something
                            })}
                            <span
                              onClick={() => removeSelected(key, curItem)}
                              className="pl-1 text-gray-400 rounded-full cursor-pointer material-icons-outlined icon-16 hover:text-gray-800"
                            >
                              close
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="py-6 pt-0 pr-0 w-12/12 section">
        <section className="flex gap-x-6">
          <aside className="flex-col hidden w-4/12 gap-6 md:flex md:w-7/12 lg:w-1/3">
            <fieldset className="self-start w-full px-3 border border-gray-300 rounded-xl ">
              <h3 className="p-3 text-gray-900 uppercase">Filters</h3>
              <div className="w-full p-3">
                <div className="flex flex-wrap gap-2"></div>
                <GetFiltersData
                  trackingId={trackingId}
                  type="Outlet"
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  url={`BrandDashboardArticleFilter`}
                  method="POST"
                />
              </div>
            </fieldset>
          </aside>
          <article className="flex flex-col flex-wrap self-start w-full gap-6">
            <div className="p-2 mb-4 bg-white border border-gray-300 rounded-xl h-[590px]">
              <div className="text-md p-2 text-[#333] font-[500] border-b border-gray-300">
                List of articles that mentioned the Brand
              </div>
              {loader ? (
                <p className="p-3 text-sm">Loading...</p>
              ) : brandArticle?.length > 0 ? (
                <BrandArticle
                  articles={brandArticle}
                  loading={loader}
                  setCurrentPage={setCurrentPage}
                  totalCount={totalCount}
                  currentPage={currentPage}
                />
              ) : (
                <p className="p-3 text-sm">No records found.</p>
              )}
            </div>
          </article>
        </section>
      </div>
    </>
  );
};

export default Brands;
