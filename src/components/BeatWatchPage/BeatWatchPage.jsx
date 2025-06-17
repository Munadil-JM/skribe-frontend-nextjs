"use client";

import { useState, useEffect, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import userService from "../../Services/user.service";
import { BEATWATCH } from "../../constants";
import AllBeatsModal from "./AllBeatsModal";
import "./TrendingJournalist.css";
import Nodata from "../utils/Nodata";

const ReadMore = ({ content, date, url }) => {
  const visibleContent = content?.slice(0, 100) + "...";

  return (
    <div className="flex gap-x-2">
      <p className="text-[12px] text-black/50 w-full">
        <>
          {visibleContent}
          <a
            target="_blank"
            className="cursor-pointer text-[#333333] font-weight-500"
            href={url}
            rel="noreferrer"
          >
            Read More
          </a>
        </>
      </p>
      <span className="text-[12px] text-black/50"> {date}</span>
    </div>
  );
};

const BeatWatch = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateRange, setDateRange] = useState("last6Month");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBeats, setSelectedBeats] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateStatus, setDateStatus] = useState(true);

  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10; // Assuming 10 articles per page
  const totalPages = Math.ceil(totalCount / articlesPerPage);
  const handlePagination = (operation) => {
    setCurrentPage((prevPage) => {
      if (
        operation === "increment" &&
        currentPage * articlesPerPage < totalCount
      ) {
        return prevPage + 1;
      } else if (operation === "decrement" && prevPage > 1) {
        return prevPage - 1;
      }
      return prevPage;
    });
  };

  const handleBeat = () => {
    setIsModalOpen(true);
  };

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
      case "customDateRange":
        setDateStatus(false);
        setEndDate("");
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
      default:
        setStartDate("");
        setDateStatus(true);
        return;
    }
    setStartDate(calculatedStartDate);
  };

  const fetchBeatData = async () => {
    try {
      setLoading(true);
      const beatData = await userService.post(BEATWATCH, {
        startDate: startDate,
        endDate: endDate,
        pageSize: 20,
        currentPage: currentPage,
        beats: selectedBeats,
      });
      setTotalCount(beatData?.data?.hits?.total?.value);
      setArticles(beatData?.data?.hits?.hits?.map((hit) => hit?._source) || []);
    } catch (error) {
      console.error("Error fetching beat data:", error);
    } finally {
      setLoading(false);
    }
  };
  const isFirstRender = useRef(true); // Track the initial render
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Prevent fetch on initial render
    } else {
      fetchBeatData();
    }

    // Set the current date as the max value on mount
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    document.getElementById("endDateInput").setAttribute("max", today);
    document.getElementById("startDateInput").setAttribute("max", today);
  }, [startDate, endDate, dateRange, selectedBeats, currentPage]);
  useEffect(() => {
    if (currentPage >= 2) {
      setCurrentPage(1); // Reset to page 1
    }
  }, [startDate, endDate, dateRange]);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    // Set the start and end date for "last6months"
    handleDateRangeChange({ target: { value: "last6Month" } });
  }, []);
  const handleBeatsSelection = (beats) => {
    setSelectedBeats(beats);
  };

  const handleRemoveBeat = (beat) => {
    setSelectedBeats((prevBeats) => prevBeats.filter((b) => b !== beat));
  };

  // useEffect(() => {
  //   if (currentPage >= 2) {
  //     fetchBeatData();
  //   }
  // }, [currentPage]);

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    // Check if the selected end date is before the start date
    if (new Date(newEndDate) < new Date(startDate)) {
      // Optionally, you can show an alert or reset the end date
      alert("End date cannot be earlier than start date.");
      return;
    }
    setEndDate(newEndDate);
  };

  return (
    <>
      <AllBeatsModal
        open={isModalOpen}
        onClose={handleModalClose}
        onSelectBeats={handleBeatsSelection}
      />

      <fieldset className="border-2 border-black/10 rounded-[10px] p-2 bg-white sm:w-11/12 my-5 mr-5 ml-5 sm:mr-0">
        <legend className="pl-4 pr-4 text-sm text-[#333] font-[500]">
          Beat Watch
        </legend>
        <div className="flex flex-row flex-wrap items-center lg:justify-end gap-2 mx-2 mt-2 mb-2 text-sm">
          <div
            onClick={handleBeat}
            className="xl:w-[110px] cursor-pointer w-fit px-2 rounded-md text-xs py-1 bg-[#fac540] text-[#002B5D] text-center"
          >
            Select Beat
          </div>
          <div className="border border-black/10 bg-gray-100 rounded-[5px]">
            <select
              className="p-1 px-2 border-0 text-xs cursor-pointer text-gray-500 rounded-md"
              placeholder="Select Date Range"
              width={{ base: "100%", xl: "200px" }}
              onChange={handleDateRangeChange}
              sx={{
                fontSize: "14px",
              }}
              border={"none"}
              value={dateRange}
            >
              <option value="past24Hours">Past 24 Hours</option>
              <option value="last3Days">Last 3 Days</option>
              <option value="last1Week">Last 1 Week</option>
              <option value="last1Month">Last 1 Month</option>
              <option value="last6Month">Last 6 Months</option>
              <option value="customDateRange">Custom Date Range</option>
            </select>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <div className="border border-black/10 bg-gray-100 rounded-[5px]">
              <input
                className="text-black/50 text-xs xl:w-[120px] w-full p-1 rounded-md"
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
                border={"none"}
                id="startDateInput"
              />
            </div>
            <div className="border items-center border-black/10 bg-gray-100 rounded-[5px]">
              <input
                className="text-black/50 text-xs xl:w-[120px] w-full p-1 rounded-md"
                type="date"
                value={endDate}
                onChange={handleEndDateChange} // Update this line to call the handler
                placeholder="End Date"
                variant="filled"
                sx={{
                  bg: "rgba(51, 51, 51, 0.1)",
                }}
                size={"sm"}
                disabled={dateStatus}
                border={"none"}
                id="endDateInput"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mx-2 mt-2 mb-2">
          {selectedBeats?.map((beat, index) => (
            <div
              key={index}
              sx={{ bg: "rgba(101, 33, 173, 0.04)" }}
              className="flex items-center justify-center p-2 mt-1"
              variant="unstyled"
            >
              <div align="center">
                <div className="text-customGray text-sm">{beat}</div>
                <div as="button" ml={2} onClick={() => handleRemoveBeat(beat)}>
                  <span className="icon-16 text-gray-500 material-icons-outlined">
                    close
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <hr className="mt-4 mb-4 ml-2 mr-2 text-black/10" />
        <div className="overflow-y-auto h-[480px] scrollbar">
          {loading ? (
            <div className="p-4">
              <Skeleton count={5} height={100} className="w-full" />
            </div>
          ) : articles?.length > 0 ? (
            articles?.map((ele, index) => (
              <div key={index}>
                <div className="flex flex-col justify-between gap-4 mx-2 mt-2 mb-2 xl:items-center xl:flex-row">
                  <div className="xl:w-[85%]">
                    <div className="flex gap-2">
                      <h2 className="text-gray-700 text-xs font-medium">
                        {ele?.vchtitle}
                        {ele?.vchbeat && (
                          <span className="text-xs ml-2 rounded-sm text-nowrap text-gray-600 px-2 bg-gray-200 font-normal">
                            {ele?.vchbeat}
                          </span>
                        )}
                      </h2>
                    </div>

                    <ReadMore
                      className="text-gray-600 text-sm"
                      content={
                        ele?.mtxtarticlesummary === null
                          ? "N/A"
                          : ele?.mtxtarticlesummary
                      }
                      date={new Date(ele?.dtmpublishdate).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }
                      )}
                      url={ele?.vchurl}
                    />
                  </div>
                  <div className="xl:mx-2">
                    {ele?.vchsentiment === "positive" && (
                      <div className="w-20 py-1 px-2 tracking-wider text-center rounded-[2px] border border-green-600 text-green-600">
                        <p className="text-[10px]  font-normal">
                          {ele?.vchsentiment?.toUpperCase()}
                        </p>
                      </div>
                    )}

                    {ele?.vchsentiment === "neutral" && (
                      <div className="w-20 py-1 px-2 tracking-wider text-center rounded-[2px]  border border-yellow-500 text-yellow-500">
                        <p className="text-[10px] font-normal">
                          {ele?.vchsentiment?.toUpperCase()}
                        </p>
                      </div>
                    )}
                    {ele?.vchsentiment === "negative" && (
                      <div className="w-20 py-1 px-2 tracking-wider text-center rounded-[2px] font-[500] border border-red-500 text-red-500">
                        <p className="text-[10px]  font-normal">
                          {ele?.vchsentiment?.toUpperCase()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <hr className="mt-4 mb-4 ml-4 mr-4 h-[1px] before-0 text-[#D0D0D0]" />
                </div>
              </div>
            ))
          ) : (
            <Nodata topic={"Beat watch"} height={380} />
          )}

          <div className="flex items-center">
            {articles?.length > 0 && articles.length < totalCount && (
              <div className="flex items-center justify-center my-2 text-center text-[15px] gap-4">
                <div
                  className={`p-2 pt-2 pb-1 rounded-[5px] border-[#333333] items-center justify-center border-[1px] ${
                    currentPage === 1
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                  }`}
                  onClick={() =>
                    currentPage > 1 && handlePagination("decrement")
                  }
                >
                  <span className="icon-16 text-sm  text-[#333333] material-icons-outlined">
                    arrow_back
                  </span>
                </div>
                <div className="font-[500]">
                  {currentPage + "/" + totalPages}
                </div>

                {currentPage !== totalPages && (
                  <div
                    className={`p-2 pt-2 pb-1 rounded-[5px] border-[#333333] items-center justify-center border-[1px] ${
                      articles.length > 9
                        ? "cursor-pointer"
                        : "cursor-not-allowed opacity-50"
                    }`}
                    onClick={() =>
                      articles.length > 9 && handlePagination("increment")
                    }
                  >
                    <span className="icon-16 text-sm  text-[#333333] material-icons-outlined">
                      arrow_forward
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </fieldset>
    </>
  );
};

export default BeatWatch;
