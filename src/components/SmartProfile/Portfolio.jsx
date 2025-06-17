"use client";

import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import userService from "../../Services/user.service";
import { JOURNALISTPORTFOLIOBYID } from "../../constants";
import "../Dashboard2/TrendingJournalist.css";

const ReadMore = ({ content, date, url }) => {
  const words = content?.split(" ") || [];

  // if (words.length <= 35) {
  //   return (
  //     <>
  //       <div className="flex gap-x-2">
  //         <p className="text-[12px] font-[400] text-customGray64 w-[90%]">
  //           {content}...
  //           <a
  //             target="_blank"
  //             className="cursor-pointer text-[#333333] font-[500] text-[12px]"
  //             href={url}
  //             rel="noreferrer"
  //           >
  //             Read more
  //           </a>
  //         </p>

  //         <span className="text-[12px] text-customGray50"> {date}</span>
  //       </div>
  //     </>
  //   );
  // }

  const visibleContent =
    content?.length > 0 && words?.slice(0, 35).join(" ") + "...";

  return (
    <div className="flex gap-x-2">
      <p className="text-[12px] font-[400] text-black/50 w-full">
        {visibleContent}
        <>
          {content?.length > 0 && (
            <a
              target="_blank"
              className="cursor-pointer text-[#333333] font-[500]"
              href={url}
              rel="noreferrer"
            >
              Read more
            </a>
          )}
        </>
      </p>
      <span className="text-[12px] text-black/50"> {date}</span>
    </div>
  );
};

const Portfolio = ({ id }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateRange, setDateRange] = useState("last6Month");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState("");
  const [dateStatus, setDateStatus] = useState(true);

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
        break;
      default:
        setStartDate("");
        setDateStatus(true);
        return;
    }
    setStartDate(calculatedStartDate);
    setCurrentPage(1);
  };

  const handlePagination = (operation) => {
    setCurrentPage((prevPage) => {
      if (operation === "increment" && articles.length === 10) {
        return prevPage + 1;
      } else if (operation === "decrement" && prevPage > 1) {
        return prevPage - 1;
      }
      return prevPage;
    });
  };

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await userService.get(
        `${JOURNALISTPORTFOLIOBYID}?Jid=${id}&pageSize=10&CurrentPage=${currentPage}&StartDate=${startDate}&EndDate=${endDate}`
      );
      if (response?.response?.status === "Ok") {
        const apiData = response?.data.hits.hits.map((hit) => ({
          heading: hit?._source?.vchtitle,
          content: hit?._source?.mtxtarticlesummary,

          date: new Date(hit._source.dtmpublishdate).toLocaleDateString(
            "en-GB",
            {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }
          ),
          sentiment: hit._source.vchsentiment,
          url: hit._source.vchurl,
        }));
        setTotalPages(Math.ceil(response.data.hits.total.value / 10));
        setArticles(apiData);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleDateRangeChange({ target: { value: "last6Month" } });
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      fetchArticles();
    }
  }, [id, startDate, endDate, dateRange, currentPage]);

  return (
    <>
      <div className="flex flex-col mx-2 mt-4 md:items-center md:justify-between md:flex-row md:mx-10">
        <p className="font-[400] text-[#333333] text-[15px] mt-4">Articles</p>
        <div className="flex flex-col gap-2 mt-2 mb-2 text-sm md:justify-end md:flex-row">
          <div className="border-[1px] border-black/10 bg-gray-100 rounded-[5px]">
            <select
              className="p-1 px-2 border border-gray-200 text-gray-500 rounded-md focus:outline-none"
              placeholder=""
              width={{ base: "100%", xl: "200px" }}
              size={"sm"}
              onChange={handleDateRangeChange}
              focusbordercolor="transparent"
              border={"none"}
              value={dateRange}
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
            <div className="border bg-gray-100 border-black/10 rounded-[5px]">
              <input
                className="text-black/40 xl:w-[120px] w-full p-1 rounded-md"
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
              />
            </div>
            <div className="border bg-gray-100 border-black/10 rounded-[5px]">
              <input
                className="text-black/40 xl:w-[120px] w-full p-1 rounded-md"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="End Date"
                variant="filled"
                sx={{
                  bg: "rgba(51, 51, 51, 0.1)",
                }}
                size={"sm"}
                disabled={dateStatus}
                focusbordercolor="transparent"
                border={"none"}
              />
            </div>
          </div>
        </div>
      </div>

      <fieldset
        className={`border border-black/10 rounded-[10px] mb-4 bg-white mt-4 md:mx-10 mx-2 px-4 ${articles?.length > 0 && "h-[520px]"}`}
      >
        <legend className="pl-4 pr-4 text-sm text-black/40">Portfolio</legend>

        {loading ? (
          <div className="p-8">
            <Skeleton count={5} height="100%" className="w-[90%]" />
          </div>
        ) : (
          <>
            <div
              className={`overflow-y-auto ${articles?.length > 0 && "h-[480px]"} scrollbar`}
            >
              {!loading && articles?.length > 0 ? (
                articles?.map(
                  (article, index) =>
                    article?.heading !== "" &&
                    article?.content !== "" && (
                      <div key={index}>
                        <div className="flex items-center justify-between gap-4 mt-2 mb-2 ml-4 mr-4">
                          <div className="w-[85%] flex flex-col">
                            <h2 className="font-[500] text-[14px] text-[#333333]">
                              {article.heading}
                            </h2>
                            <ReadMore
                              className="text-customGray64"
                              content={article?.content}
                              date={article?.date}
                              url={article?.url}
                            />
                          </div>
                          <div className="ml-2 mr-2">
                            {(article?.sentiment === "positive" ||
                              article?.sentiment === "Positive") && (
                              <div className="w-20 py-1 px-2 tracking-wider text-center rounded-[2px] border border-green-600 text-green-600">
                                <p className="text-[11px]  font-semibold">
                                  {article?.sentiment?.toUpperCase()}
                                </p>
                              </div>
                            )}

                            {(article?.sentiment === "neutral" ||
                              article?.sentiment === "Neutral") && (
                              <div className="w-20 py-1 px-2 tracking-wider text-center rounded-[2px]  border border-yellow-500 text-yellow-500">
                                <p className="text-[11px] font-semibold">
                                  {article?.sentiment?.toUpperCase()}
                                </p>
                              </div>
                            )}
                            {(article?.sentiment === "negative" ||
                              article?.sentiment === "Negative") && (
                              <div className="w-20 py-1 px-2 tracking-wider text-center rounded-[2px] font-[500] border border-red-500 text-red-500">
                                <p className="text-[11px]  font-semibold">
                                  {article?.sentiment?.toUpperCase()}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <hr className="mt-4 mb-4 ml-4 mr-4 text-black/10" />
                        </div>
                      </div>
                    )
                )
              ) : loading ? (
                <p className="p-3">Loading...</p>
              ) : (
                <p className="p-3">No Articles Found</p>
              )}
              {totalPages > 1 && (
                <div className="flex items-center justify-center my-2 text-center text-[15px] gap-4">
                  <div
                    className={`p-2 pt-2 pb-1 rounded-[5px] border-[#333333] border-[1px] ${
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
                    {currentPage} / {totalPages}
                  </div>
                  <div
                    className={`p-2 pt-2 pb-1 rounded-[5px] border-[#333333] border-[1px] ${
                      articles.length === 10
                        ? "cursor-pointer"
                        : "cursor-not-allowed opacity-50"
                    }`}
                    onClick={() =>
                      articles.length === 10 && handlePagination("increment")
                    }
                  >
                    <span className="icon-16 text-sm  text-[#333333] material-icons-outlined">
                      arrow_forward
                    </span>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </fieldset>
    </>
  );
};

export default Portfolio;
