"use client";

// import { Input, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SPOKESPERSONARTICLES } from "../../constants";
import userService from "../../Services/user.service";
// import GetFiltersData from "../Filters/GetFiltersData";
import BrandArticle from "./BrandArticle";
import GetFiltersData from "../Filters/GetFiltersData";

const SpokesPerson = ({ render }) => {
  const [loader, setLoader] = useState(false);
  const [trackingId, setTrackingId] = useState();
  const [brandArticle, setBrandArticle] = useState([]);
  const [totalCount, setTotalCount] = useState("");
  const [selectedOutlet, setSelectedOutlet] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({ count: 0 });

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateRange, setDateRange] = useState("last6Month");
  const [currentPage, setCurrentPage] = useState(1);
  const [dateStatus, setDateStatus] = useState(true);

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

  const SpokesArticles = async (selectedArray = null) => {
    setLoader(true);
    const bodyData = {
      outlet: selectedArray,
    };
    try {
      const BrandUrl = `${SPOKESPERSONARTICLES}?pageNumber=${currentPage}&StartDate=${startDate}&EndDate=${endDate}&pageSize=20`;
      const [response] = await Promise.all([
        userService.post(BrandUrl, bodyData),
      ]);

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

  const urlBuilder = () => {
    for (let allKeys in selectedFilters) {
      if (selectedFilters[allKeys].length > 0 && allKeys === "Outlet") {
        //console.log(selectedFilters[allKeys], "check all values");
        let output = selectedFilters[allKeys]?.map((curItem) =>
          curItem.split(" ").slice(1).join(" ")
        );
        return output;
        // console.log(output, "check select and unselect values");
        // setSelectedOutlet(output);
      } else {
        setSelectedOutlet([]);
      }
    }
  };

  useEffect(() => {
    if (selectedFilters) {
      setBrandArticle([]); // Clear existing articles
      setCurrentPage(1); // Reset to page 1
      SpokesArticles(urlBuilder());
    }
  }, [selectedFilters]);

  // useEffect(() => {
  //   SpokesArticles(urlBuilder());
  // }, [currentPage, startDate, endDate, render]);

  useEffect(() => {
    if (currentPage >= 2) {
      setBrandArticle([]);
      SpokesArticles(urlBuilder());
    }
  }, [currentPage]);

  // Effect to handle page changes (unchanged)
  useEffect(() => {
    if (startDate || endDate) {
      SpokesArticles(urlBuilder());
    }
  }, [startDate, endDate]);

  useEffect(() => {
    setTrackingId(generateUUID());
  }, []);

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
    // Set the start and end date for "last1Month"
    handleDateRangeChange({ target: { value: "last6Month" } });
  }, []);
  const loadMoreJourno = () => {
    setCurrentPage(currentPage + 1);
  };

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
    document.getElementById("endDateInput2").setAttribute("max", today);
    document.getElementById("startDateInput2").setAttribute("max", today);
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
          <div className="border border-black/10 bg-gray-100 rounded-[5px]">
            <select
              className="p-1 px-2 text-xs border border-gray-200 text-gray-500 rounded-md focus:outline-none"
              placeholder="Select Date Range"
              width={{ base: "100%", xl: "200px" }}
              size={"sm"}
              onChange={handleDateRangeChange}
              focusbordercolor="transparent"
              border={"none"}
              value={dateRange} // Set the default value here
            >
              <option value="">Select Date Range</option>
              <option value="past24Hours">Past 24 Hours</option>
              <option value="last3Days">Last 3 Days</option>
              <option value="last1Week">Last 1 Week</option>
              <option value="last1Month">Last 1 Month</option>
              <option value="last6Month">Last 6 Months</option>
              <option value="customDateRange">Custom Date Range</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 md:flex-row">
            <div className="border border-black/10 bg-gray-100 rounded-[5px]">
              <input
                className="text-black/50 text-xs  xl:w-[120px] w-full p-1 rounded-md  focus:outline-none"
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
                id="startDateInput2"
              />
            </div>
            <div className="border border-black/10 bg-gray-100 rounded-[5px]">
              <input
                className="text-black/50 text-xs xl:w-[120px] w-full p-1 rounded-md  focus:outline-none"
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
                id="endDateInput2"
              />
            </div>
          </div>
        </div>
      </div>

      {Object?.keys(selectedFilters).length > 1 && (
        <div className="w-11/12 pr-0 section">
          <div className="flex flex-wrap ">
            <div className="flex flex-wrap items-center px-2 rounded-md">
              {Object?.keys(selectedFilters)?.map((key, index) => (
                <div key={index} className="flex items-center flex-wrap">
                  {key !== "count" && key + ":"}
                  {selectedFilters[key]?.length > 0 &&
                    selectedFilters[key]?.map((curItem, ind) => {
                      return (
                        <div key={ind}>
                          <div className="flex items-center text-sm px-2 m-1 border border-gray-400 rounded-md">
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
      <div className="w-12/12  py-6 pt-0  pr-0 section">
        <section className="flex gap-x-6">
          <aside className="flex flex-col hidden w-4/12 gap-6 md:flex md:w-7/12 lg:w-1/3">
            <fieldset className="self-start w-full px-3 border border-gray-300 rounded-xl ">
              <h3 className="p-3 text-gray-900 uppercase text-md">Filters</h3>
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
            <div className="border border-gray-300 rounded-xl p-2 mb-4 bg-white h-[590px]">
              <div className="text-md p-2 text-[#333] font-[500] border-b border-gray-300">
                List of Articles that Mention the Spokes Person
              </div>
              {loader ? (
                <p className="p-3">Loading...</p>
              ) : brandArticle?.length > 0 ? (
                <BrandArticle
                  articles={brandArticle}
                  loading={loader}
                  passData={loadMoreJourno}
                  totalCount={totalCount}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              ) : (
                <p className="p-3">No records found.</p>
              )}
            </div>
          </article>
        </section>
      </div>
    </>
  );
};

export default SpokesPerson;
