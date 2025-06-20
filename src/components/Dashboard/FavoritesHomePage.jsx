"use client";

import React, { useEffect, useRef, useState } from "react";
import userService from "../../Services/user.service";
import { FAVOURITEJOURNALISTS } from "../../constants";
// import noUser from "../assets/noUser.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./TrendingJournalist.css";
import Nodata from "../utils/Nodata";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ReadMore = ({ content, date, url }) => {
  const visibleContent = content.slice(0, 220) + "...";

  return (
    <>
      <p className="text-sm font-[400] text-black/50 w-full">
        {visibleContent}
        <a
          target="_blank"
          className="cursor-pointer font-[500] text-[#333333]"
          href={url}
          rel="noreferrer"
        >
          Read More
        </a>
      </p>
      <span className="text-[12px] text-black/50"> {date}</span>
    </>
  );
};

const FavoritesHomePage = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateRange, setDateRange] = useState("last6Month");
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10; // Assuming 10 articles per page
  const totalPages = Math.ceil(totalCount / articlesPerPage);
  const [dateStatus, setDateStatus] = useState(true);
  const [trackingId, setTrackingId] = useState();
  const router = useRouter();

  const goBack = () => {
    router.back();
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

  // const handleShare = (url) => {
  //   if (navigator.share) {
  //     navigator
  //       .share({
  //         title: "Check out this article!",
  //         url: url,
  //       })
  //       .then(() => console.log("Article shared successfully"))
  //       .catch((error) => console.error("Error sharing article:", error));
  //   } else {
  //     console.warn("Web Share API is not supported in your browser.");
  //   }
  // };

  const fetchArticles = async () => {
    setLoading(true);

    try {
      const res = await userService.get(
        `${FAVOURITEJOURNALISTS}?pageSize=${articlesPerPage}&CurrentPage=${currentPage}&StartDate=${startDate}&EndDate=${endDate}`
      );
      setArticles(res.data?.hits?.hits?.map((hit) => hit._source) || []);
      setTotalCount(res?.data?.hits?.total?.value);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePagination = (operation) => {
    setCurrentPage((prevPage) => {
      if (operation === "increment" && articles.length > 9) {
        return prevPage + 1;
      } else if (operation === "decrement" && prevPage > 1) {
        return prevPage - 1;
      }
      return prevPage;
    });
  };

  const isFirstRender = useRef(true); // Track the initial render
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Prevent fetch on initial render
    } else {
      fetchArticles();
    }

    // Set the current date as the max value on mount
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    document.getElementById("endDateInput").setAttribute("max", today);
    document.getElementById("startDateInput").setAttribute("max", today);
  }, [startDate, endDate, dateRange, currentPage]);

  useEffect(() => {
    setTrackingId(generateUUID());
  }, []);

  useEffect(() => {
    if (currentPage >= 2) {
      setCurrentPage(1); // Reset to page 1
    }
  }, [startDate, endDate, dateRange]);

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

  const filteredArticles = articles.filter((article) =>
    article?.vchtitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    // Set the start and end date for "last6months"
    handleDateRangeChange({ target: { value: "last6Month" } });
  }, []);

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
      <div className="px-8 pb-2 xl:w-11/12 w-12/12 xl:pl-8 section text-[14px] font-poppins">
        <div className="flex flex-col mt-4 ml-4">
          <ul className="flex items-center text-sm text-gray-400 gap-x-1">
            <li className="flex items-center">
              <Link href="/dashboard">Home</Link>
              <span className="items-center text-gray-400 material-icons-outlined b-font">
                navigate_next
              </span>
            </li>
            <li className="flex items-center">Favorites</li>
          </ul>
        </div>
      </div>
      <hr className="mt-2 mb-4 text-black/10" />
      <div className="px-8 pb-6 xl:w-11/12 w-12/12 xl:pl-8 section text-[14px] font-poppins">
        <div className="ml-4 ">
          <span
            onClick={() => goBack()}
            className="flex items-center text-sm font-normal text-gray-700 cursor-pointer w-28 hover:border-gray-400 hover:text-gray-800"
          >
            <span className="material-icons-outlined icon-16">
              arrow_back_ios_new
            </span>
            Go Back
          </span>
        </div>
        <p className="mt-4 ml-4 text-xl font-medium">Favorites</p>
        <p className="mb-4 ml-4 font-[400] text-black/50 text-[14px]">
          Stay Updated with Latest Articles from Your Favorite Journalists
        </p>
        <div className="w-full mx-4 mt-4">
          <div className="border-2 border-black/10 p-2 rounded-[10px]">
            <div className="flex flex-col justify-end gap-2 mt-2 mb-2 ml-4 mr-4 text-sm md:flex-row">
              <div className="flex items-center rounded-lg border border-gray-300 bg-white pl-2">
                <span className="material-icons-outlined text-sm text-gray-300">
                  search
                </span>

                <input
                  type="search"
                  placeholder="Search journalist..."
                  className="text-md w-full rounded-lg bg-white px-3 py-1 text-gray-600 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  focusbordercolor="transparent"
                  border={"none"}
                />
              </div>
              <div className="border-[1px] border-black/20 bg-gray-100 rounded-[5px]">
                <select
                  className="p-1 px-2 border border-gray-200 text-gray-500 rounded-md focus:outline-none md:w-[200px] w-full"
                  placeholder="Select Date Range"
                  // width={{ base: "100%", xl: "200px" }}
                  onChange={handleDateRangeChange}
                  size={"sm"}
                  focusbordercolor="transparent"
                  border={"none"}
                  value={dateRange}
                >
                  <option value="past24Hours">Past 24 Hours</option>
                  <option value="last3Days">Last 3 dDays</option>
                  <option value="last1Week">Last 1 Week</option>
                  <option value="last1Month">Last 1 Month</option>
                  <option value="last6Month">Last 6 Months</option>
                  <option value="customDateRange">Custom Date Range</option>
                </select>
              </div>

              <div className="flex flex-col gap-2 md:flex-row">
                <div className="border-[1px] border-black/20 bg-gray-100 rounded-[5px]">
                  <input
                    className="text-black/50 xl:w-[120px] w-full p-1 rounded-md focus:outline-none"
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
                    id="startDateInput"
                  />
                </div>
                <div className="border-[1px] border-black/10 bg-gray-100 rounded-[5px]">
                  <input
                    className="text-black/50 xl:w-[120px] w-full p-1 rounded-md focus:outline-none"
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange} // Update this line to call the handler
                    // onChange={(e) => setEndDate(e.target.value)}
                    placeholder="End Date"
                    variant="filled"
                    sx={{
                      bg: "rgba(51, 51, 51, 0.1)",
                    }}
                    size={"sm"}
                    focusbordercolor="transparent"
                    border={"none"}
                    disabled={dateStatus}
                    id="endDateInput"
                  />
                </div>
              </div>
            </div>
            <hr className="mx-4 my-4 text-black/10" />
            <div>
              {loading ? (
                <div className="w-full p-4">
                  <Skeleton count={12} height={70} className="w-full" />
                </div>
              ) : filteredArticles.length > 0 && !loading ? (
                filteredArticles.map((ele, index) => (
                  <React.Fragment key={index}>
                    <div className="flex flex-col justify-between gap-4 mx-2 mt-2 mb-2 xl:items-center xl:flex-row">
                      {/* <div className="xl:w-1/12"> */}
                      {/* <Link href={ele?.vchurl} target="_blank">
                          {" "}
                          <img
                            className="w-10 h-10 rounded-full"
                            src={
                              ele?.photo
                                ? ele.photo !== ""
                                  ? baseURL + ele?.photo
                                  : noUser.src
                                : noUser.src
                            }
                            alt=""
                          />
                        </Link> */}
                      {/* <div className="text-[13px] font-[500] mt-2">
                          {ele.vchauthor || "N/A"}
                        </div> */}
                      {/* <div className="text-[13px] font-[400] text-customGray mt-2">
                          {ele.vchwebsite || "N/A"}
                        </div>
                      </div> */}
                      <div className="xl:w-[85%]">
                        <div className="flex flex-col gap-2">
                          <h2 className="font-[500] text-[15px]">
                            {ele?.vchtitle}
                          </h2>
                          <div className="flex gap-x-2">
                            <ReadMore
                              content={ele?.mtxtarticlesummary || ""}
                              date={new Date(
                                ele?.dtmpublishdate
                              ).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              })}
                              url={ele?.vchurl || "#"}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="xl:mx-2">
                        <div
                          className={`bg-white text-${
                            ele.vchsentiment === "Positive"
                              ? "[#85B502]"
                              : ele.vchsentiment === "Neutral"
                                ? "customGray"
                                : "red-500"
                          } border ${
                            ele.vchsentiment === "Positive"
                              ? "border-[#85B502]"
                              : ele.vchsentiment === "Neutral"
                                ? " customGray"
                                : "border-red-500"
                          } w-20 py-1 px-2 tracking-wider text-center rounded-[2px] font-[500]`}
                        >
                          <p className="text-[11px] font-[500]">
                            {ele?.vchsentiment?.toUpperCase()}
                          </p>
                        </div>

                        {/* <div
                          width="30px"
                          className="flex items-center justify-between p-1 border-2"
                          onClick={() => handleShare(ele?.vchurl)}
                        >
                          <span className="icon-16 text-sm font-[300] text-[#333333] material-icons-outlined">
                            share
                          </span>
                        </div> */}
                      </div>
                    </div>
                    <div>
                      <hr className="mt-4 mb-4 ml-4 mr-4 text-black/10" />
                    </div>
                  </React.Fragment>
                ))
              ) : (
                <Nodata topic={"Favorites"} height={200} />
              )}
            </div>
            {filteredArticles.length > 0 && (
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
                  {currentPage}/{totalPages}
                </div>
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
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FavoritesHomePage;
