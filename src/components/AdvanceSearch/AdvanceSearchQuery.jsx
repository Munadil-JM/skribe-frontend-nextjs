"use client";

import axios from "axios";
import { BiSearch } from "react-icons/bi";
import { useState, useEffect, useRef } from "react";
import { RxTriangleDown } from "react-icons/rx";
import { useSearchParams, useRouter } from "next/navigation";
import ArticleCard from "./ArticleCard";
import ProfileCard from "./ProfileCard";
import JournalistCard from "./JournalistCard";
import BuildCampaign from "../Campaign/BuildCampaign";
import userService from "../../Services/user.service";
import tokenService from "../../Services/token.service";
import { useNotification } from "../ErrorAlert/ErrorContextNotification";
import {
  GET_PEOPLE_JOUR_AND_BEAT,
  GET_PEOPLE_TOPIC_AND_KEYWORD,
  GET_ARTICLES_ALL_TYPES,
  journalist_API,
  PRECRM_POSTDATA,
  POST_INSERT_TRACKING,
  STATICCOUNT,
} from "../../constants";

const types = {
  People: [
    {
      id: 1,
      name: "Journalist",
    },
    {
      id: 2,
      name: "Beat",
    },
    {
      id: 3,
      name: "Topic",
    },
    {
      id: 4,
      name: "Keyword",
    },
  ],
  Articles: [
    {
      id: 1,
      name: "Brand",
    },
    {
      id: 2,
      name: "Topic",
    },
    {
      id: 3,
      name: "Keywords",
    },
  ],
};

const sortingOrderList = [
  {
    id: 1,
    name: "Recency",
    value: "Recency",
  },
  {
    id: 2,
    name: "Relevancy",
    value: "Relevancy",
  },
  {
    id: 3,
    name: "Sort by A-Z",
    value: "ATOZ",
  },
  {
    id: 4,
    name: "Sort by Z-A",
    value: "ZTOA",
  },
];

const AdvanceSearchQuery = () => {
  const { showNotification } = useNotification();

  const router = useRouter();
  const searchParams = useSearchParams();

  function updateSearchParams(paramValues) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(paramValues).forEach(([param, value]) => {
      params.set(param, value);
    });

    router.push(`?${params.toString()}`);
  }

  const [search, setSearch] = useState(() => searchParams.get("search"));
  const [selectedTab, setSelectedTab] = useState(() => searchParams.get("tab"));
  const [selectedType, setSelectedType] = useState(() =>
    searchParams.get("type")
  );
  const [highlightedTerm, setHighlightedTerm] = useState(() =>
    searchParams.get("search")
  );

  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataEmpty, setIsDataEmpty] = useState(false);

  const sortingOrderRef = useRef(null);
  const [sortingOrder, setSortingOrder] = useState("Relevancy");
  const [isSortingDropDownOpen, setIsSortingDropDownOpen] = useState(false);
  const [selectedSortingOrder, setSelectedSortingOrder] = useState("Relevancy");

  const [totalResult, setTotalResult] = useState(0);
  const [nextPageToken, setNextPageToken] = useState("");
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalArticlesCount, setTotalArticlesCount] = useState(0);

  const [profileData, setProfileData] = useState();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const calculateLast6MonthsStartDate = () => {
    const today = new Date();
    today.setMonth(today.getMonth() - 6);
    return today.toISOString().split("T")[0];
  };
  const lastDate = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(() =>
    calculateLast6MonthsStartDate()
  );
  const [endDate, setEndDate] = useState(lastDate);

  const [dateStatus, setDateStatus] = useState(true);
  const [dateRange, setDateRange] = useState("Last6Month");

  const [selectAllLabel, setSelectAllLabel] = useState("Select All");
  const [selectedJournalistsId, setSelectedJournalistsId] = useState([]);
  const [isMediaListDialogOpen, setIsMediaListDialogOpen] = useState(false);

  const getJournalistAndBeatsData = async (token = "") => {
    setIsError(false);
    setIsLoading(true);

    try {
      const res = await userService.get(
        `${GET_PEOPLE_JOUR_AND_BEAT}?Type=${selectedType}&searchText=${search}&PageSize=20&Sort=${sortingOrder}&token=${token}`
      );

      if (res?.data?.length === 0 || res?.response?.status === "NoData") {
        setIsDataEmpty(true);
        setData([]);
      } else {
        setIsDataEmpty(false);
        setData((prev) => {
          if (data?.length === 0) {
            return res?.data;
          }
          return [...prev, ...res?.data];
        });

        setNextPageToken(encodeURIComponent(res?.nextPageToken?.token));
        setTotalResult(res?.nextPageToken?.totalResult);
      }
    } catch (err) {
      console.error(
        "Error while fetching People - Journalist and Beat type Data: ",
        err
      );
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const getTopicsAndKeywordsData = async (token = "") => {
    setIsError(false);
    setIsLoading(true);

    try {
      const res = await userService.get(
        `${GET_PEOPLE_TOPIC_AND_KEYWORD}?Type=${selectedType}&Text=${search}&PageSize=20&Sort=${sortingOrder}&token=${token}`
      );

      if (res?.data?.length === 0 || res?.response?.status === "NoData") {
        setIsDataEmpty(true);
        setData([]);
      } else {
        setIsDataEmpty(false);
        setData((prev) => {
          if (data?.length === 0) {
            return res?.data;
          }
          return [...prev, ...res?.data];
        });

        setNextPageToken(encodeURIComponent(res?.nextPageToken?.token));
        setTotalResult(res?.nextPageToken?.totalResult);
      }
    } catch (err) {
      console.error(
        "Error while fetching People - Topics and Keywords type Data: ",
        err
      );
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const getArticlesData = async (pageNumber = currentPageNumber) => {
    setIsError(false);
    setIsLoading(true);

    try {
      const res = await userService.get(
        `${GET_ARTICLES_ALL_TYPES}?Type=${selectedType}&Text=${search}&PageSize=20&pageNumber=${pageNumber}&StartDate=${startDate}&EndDate=${endDate}`
      );

      if (res?.response?.status === "NoData") {
        setIsDataEmpty(true);
        setData([]);
      } else {
        setIsDataEmpty(false);
        setData((prev) => {
          if (data?.length === 0) {
            return res?.data?.hits?.hits;
          }
          return [...prev, ...res?.data?.hits?.hits];
        });
        setTotalArticlesCount(res?.data?.hits?.total?.value);
      }
    } catch (err) {
      console.error("Error while fetching Articles data: ", err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const sendTrackingData = async () => {
    try {
      await axios.post(
        POST_INSERT_TRACKING,
        {
          tab:
            selectedTab === "People"
              ? "AdvancedSearchPeople"
              : "AdvancedSearchArticle",
          type: selectedType,
          text: search,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenService.getLocalAccessToken()}`,
          },
        }
      );
    } catch (err) {
      console.error(
        "Error while sending tracking data in advance search: ",
        err
      );
    }
  };

  const handleSearch = async () => {
    setData([]);
    setNextPageToken("");
    setCurrentPageNumber(1);
    setIsDataEmpty(false);

    try {
      if (
        selectedTab === "People" &&
        (selectedType === "Journalist" || selectedType === "Beat")
      ) {
        getJournalistAndBeatsData();
      } else if (
        selectedTab === "People" &&
        (selectedType === "Topic" || selectedType === "Keyword")
      ) {
        getTopicsAndKeywordsData();
      } else {
        getArticlesData(1);
      }

      await sendTrackingData();
    } catch (err) {
      console.error("Search error: ", err);
    }
  };

  const fetchProfileData = async (id) => {
    try {
      const res = await userService.get(`${journalist_API}${id}`);

      setIsProfileOpen(true);
      setProfileData(res?.data);
    } catch (err) {
      console.error("Error while fetching User Profile details: ", err);
    }
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
    let calculatedStartDate = "";
    const calculatedEndDate = new Date().toISOString().split("T")[0];
    setEndDate(calculatedEndDate);

    switch (range) {
      case "Past24Hours":
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        calculatedStartDate = yesterday.toISOString().split("T")[0];
        setDateStatus(true);
        break;
      case "Last1Week":
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        calculatedStartDate = oneWeekAgo.toISOString().split("T")[0];
        setDateStatus(true);
        break;
      case "Last1Month":
        calculatedStartDate = new Date(Date.now() - 30 * 86400000)
          .toISOString()
          .split("T")[0];
        setDateStatus(true);
        break;
      case "Last6Month":
        const today = new Date();
        today.setMonth(today.getMonth() - 6);
        calculatedStartDate = today.toISOString().split("T")[0];
        setDateStatus(true);
        break;
      case "CustomDateRange":
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

  const handleSelect = (journalistId) => {
    setSelectedJournalistsId((prev) =>
      prev.includes(journalistId)
        ? prev.filter((id) => id !== journalistId)
        : [...prev, journalistId]
    );
  };

  const addToCRM = async () => {
    if (selectedJournalistsId.length === 0) {
      showNotification(
        "Please select atleast One Journalist to add",
        "warning"
      );
      return;
    } else if (selectedJournalistsId.length > 5) {
      showNotification(
        "You cannot add more than 5 Journalists at a time",
        "warning"
      );
      return;
    }

    const { id } = JSON.parse(localStorage.getItem("userInfo"));

    try {
      const res = await axios.post(
        PRECRM_POSTDATA,
        {
          clientId: 0,
          userId: id,
          jourId: selectedJournalistsId,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenService.getLocalAccessToken()}`,
          },
        }
      );

      if (res.data?.response?.status === "ReachedLimit") {
        showNotification(
          "CRM account limit reached. You cannot add more than 50 journalists into your CRM",
          "warning"
        );
      } else if (res.data?.response?.status === "Ok") {
        showNotification(
          `Added ${res.data?.insertedCount} journalists to your CRM!`,
          "success"
        );

        setData((prev) =>
          prev.map((item) =>
            selectedJournalistsId.includes(item.id)
              ? { ...item, crmStatus: true }
              : item
          )
        );
      }
    } catch (err) {
      console.error("Error while adding Journalists to CRM: ", err);
    } finally {
      setSelectedJournalistsId([]);
    }
  };

  const handleSelectAll = () => {
    if (selectAllLabel === "Select All") {
      setSelectAllLabel("Unselect All");
      setSelectedJournalistsId(data?.map((i) => i.id));
    } else {
      setSelectAllLabel("Select All");
      setSelectedJournalistsId([]);
    }
  };

  const handleLoadMore = () => {
    if (nextPageToken.trim().length > 0) {
      if (
        selectedTab === "People" &&
        (selectedType === "Journalist" || selectedType === "Beat")
      ) {
        getJournalistAndBeatsData(nextPageToken);
      } else if (
        selectedTab === "People" &&
        (selectedType === "Topic" || selectedType === "Keyword")
      ) {
        getTopicsAndKeywordsData(nextPageToken);
      }
    }
  };

  const handleAddToMediaList = () => {
    if (selectedJournalistsId.length === 0) {
      showNotification("Select atleast one journalist", "warning");
      return;
    }

    setIsMediaListDialogOpen(true);
    document.body.classList.add("overflow-hidden");
  };

  // useEffect(() => {
  //   if (selectedTab === "Articles") {
  //     handleDateRangeChange("Last6Month");
  //   }
  // }, [selectedTab]);

  useEffect(() => {
    setSelectAllLabel("Select All");
    setTotalResult(0);
  }, [search, sortingOrder, selectedTab]);

  useEffect(() => {
    handleSearch();
  }, [selectedTab, selectedType, startDate, endDate]);

  useEffect(() => {
    setSortingOrder(() =>
      selectedType === "Topic" || selectedType === "Keyword"
        ? "Recency"
        : "Relevancy"
    );

    setSelectedSortingOrder(() =>
      selectedType === "Topic" || selectedType === "Keyword"
        ? "Recency"
        : "Relevancy"
    );
  }, [selectedType]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        sortingOrderRef.current &&
        !sortingOrderRef.current.contains(e.target)
      ) {
        setIsSortingDropDownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <main className="font-inter pt-5 lg:pt-10">
      <section className="container mx-auto px-5 lg:px-10 flex flex-col xl:w-9/12">
        {/* Search Box & Dates */}
        <section className="flex items-center gap-5 flex-wrap md:flex-nowrap lg:gap-10 justify-between my-3">
          <div
            className={`flex items-center justify-between py-1 px-2 gap-5 border border-gray-400 rounded-md w-full sm:w-2/4`}
          >
            <input
              type="search"
              placeholder={`${selectedTab === "People" ? "Search any Journalist, Beats, Outlets, GEO" : "Search any Companies, Competitors and Products"}`}
              className="w-full font-semibold text-black/80 outline-none text-sm py-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (search.trim().length < 3) {
                    showNotification("Enter atleast 3 characters", "warning");
                  } else {
                    setHighlightedTerm(search);
                    updateSearchParams({ search: search });
                    handleSearch();
                  }
                }
              }}
            />

            <BiSearch
              className="text-black/70 cursor-pointer"
              size={25}
              onClick={() => {
                if (search.trim().length < 3) {
                  showNotification("Enter atleast 3 characters", "warning");
                } else {
                  setHighlightedTerm(search);
                  updateSearchParams({ search: search });
                  handleSearch();
                }
              }}
            />
          </div>

          {selectedTab === "Articles" && (
            <div className="flex gap-2 items-center flex-wrap md:flex-nowrap">
              <select
                className="py-2 px-1 cursor-pointer text-sm border border-black/20 bg-[#F5F5F5] text-black/50 rounded-md focus:outline-none w-full sm:w-fit"
                onChange={(e) => handleDateRangeChange(e.target.value)}
                value={dateRange}
              >
                <option value="Select Range">Select Range</option>
                <option value="Past24Hours">Past 24 Hours</option>
                <option value="Last1Week">Last 1 Week</option>
                <option value="Last1Month">Last 1 Month</option>
                <option value="Last6Month">Last 6 Months</option>
                <option value="CustomDateRange">Custom Date Range</option>
              </select>

              <input
                className="text-black/40 border border-black/20 p-1 flex-1 rounded-md disabled:cursor-not-allowed"
                type="date"
                max={lastDate}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                disabled={dateStatus}
              />

              <input
                className="text-black/40 border border-black/20 p-1 flex-1 rounded-md disabled:cursor-not-allowed"
                type="date"
                max={lastDate}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                disabled={dateStatus}
              />
            </div>
          )}
        </section>

        {/* Tabs */}
        <div className="flex gap-2 sm:gap-3 items-center pt-5">
          <button
            type="button"
            className={`group cursor-pointer flex items-center gap-1 text-sm font-medium sm:font-semibold rounded-t-lg p-2 sm:py-3 sm:px-4 ${selectedTab === "People" ? "bg-[#FFDB43] text-black" : "bg-[#F1F1E6] text-black/40 sm:hover:bg-[#FFDB43BB] sm:hover:text-black/70"}`}
            onClick={() => {
              setSelectedTab("People");
              setSelectedType("Journalist");
              setData([]);
              updateSearchParams({ tab: "People", type: "Journalist" });
            }}
          >
            <img
              src="/assets/adv-search-people.webp"
              alt="Advance Search - People Icon"
              className={`${selectedTab !== "People" && "opacity-50 sm:group-hover:opacity-70"} w-[14px] h-[14px] sm:w-5 sm:h-5`}
              width={20}
              height={20}
            />
            People
          </button>

          <button
            type="button"
            className={`group cursor-pointer flex items-center gap-1 text-sm font-medium sm:font-semibold rounded-t-lg p-2 sm:py-3 sm:px-4 ${selectedTab === "Articles" ? "bg-[#FFDB43] text-black" : "bg-[#F1F1E6] text-black/40 sm:hover:bg-[#FFDB43BB] sm:hover:text-black/70"}`}
            onClick={() => {
              setSelectedTab("Articles");
              setSelectedType("Brand");
              setData([]);
              updateSearchParams({ tab: "Articles", type: "Brand" });
            }}
          >
            <img
              src="/assets/adv-search-articles.webp"
              alt="Advance Search - Articles Icon"
              className={`${selectedTab !== "Articles" && "opacity-50 sm:group-hover:opacity-70"} w-[14px] h-[14px] sm:w-5 sm:h-5`}
              width={20}
              height={20}
            />
            Articles
          </button>

          <button
            type="button"
            className={`whitespace-nowrap flex items-center cursor-not-allowed gap-1 text-sm font-medium sm:font-semibold rounded-t-lg p-2 sm:py-3 sm:px-4 ${selectedTab === "Media Outlets" ? "bg-[#FFDB43] text-black" : "bg-[#F1F1E6] text-black/40"}`}
            // onClick={() => setSelectedTab("Media Outlets")}
            disabled
          >
            <img
              src="/assets/adv-search-media-outlets.webp"
              alt="Advance Search - Media Outlets Icon"
              className={`w-[14px] h-[14px] sm:w-5 sm:h-5`}
              width={20}
              height={20}
            />
            Media Outlets
          </button>
        </div>

        <hr className="bg-gray-300 border-0 h-[1.5px]" />

        {/* Types and CTAs */}
        <section className="flex flex-col gap-5 lg:items-center lg:flex-row lg:gap-10 justify-between pb-5 pt-3">
          <div
            className={`flex flex-wrap sm:flex-nowrap items-center gap-y-2 gap-x-4 sm:gap-5 sm:justify-between whitespace-nowrap w-fit`}
          >
            {types[selectedTab]?.length > 0 &&
              types[selectedTab]?.map((item) => {
                return (
                  <div key={item.id}>
                    <input
                      type="radio"
                      className="accent-[#002B5B] cursor-pointer align-middle h-6"
                      name="type"
                      id={item.name}
                      checked={selectedType === item.name}
                      value={item.name}
                      onChange={(e) => {
                        setSelectedType(e.target.value);
                        setSelectAllLabel("Select All");
                        setSelectedJournalistsId([]);
                        updateSearchParams({ type: item.name });
                      }}
                    />

                    <label
                      htmlFor={item.name}
                      className="text-[#002B5B] ml-1 cursor-pointer text-sm"
                    >
                      {item.name}
                    </label>
                  </div>
                );
              })}
          </div>

          {data.length !== 0 && selectedTab === "People" && (
            <div
              className={`relative flex items-center gap-3 flex-wrap md:flex-nowrap`}
            >
              <button
                type="button"
                className="cursor-pointer flex items-center whitespace-nowrap border border-[#01438D] rounded-[4px] p-1 text-[#01438D] text-sm px-3"
                onClick={handleSelectAll}
              >
                {selectAllLabel}

                {selectedJournalistsId.length !== 0 &&
                  selectAllLabel === "Unselect All" && (
                    <span
                      id="selectCount"
                      className="absolute flex h-9 w-9 items-center justify-center rounded-2xl bg-[#fac540] text-center align-middle text-xs font-bold text-[#002b5b]"
                    >
                      {selectAllLabel === "Unselect All" &&
                      STATICCOUNT < totalResult
                        ? STATICCOUNT
                        : totalResult}
                    </span>
                  )}
              </button>

              <button
                type="button"
                className="flex items-center gap-1 whitespace-nowrap cursor-pointer border border-[#01438D] bg-white text-[#01438D] p-1 rounded-[4px] text-sm px-3"
                onClick={addToCRM}
              >
                <img
                  src="/assets/adv-search-bookmark.png"
                  alt="Advance Search - Bookmark icon"
                  width={20}
                  height={20}
                />
                Add to CRM
              </button>

              <button
                type="button"
                className="flex gap-1 cursor-pointer items-center p-1 whitespace-nowrap rounded-[4px] border border-[#01438D] bg-[#01438D] text-white text-sm px-3"
                onClick={handleAddToMediaList}
              >
                <img
                  src="/assets/adv-search-addtomedialist.webp"
                  alt="Advance Search - Add to MediaList icon"
                  width={20}
                  height={20}
                />
                Add to Media List
              </button>

              <div
                ref={sortingOrderRef}
                className="w-fit relative inline-flex flex-col text-sm"
              >
                <div
                  className="relative cursor-pointer flex items-center bg-[#F5F5F5] gap-2 p-1 rounded-[4px] border border-black/20"
                  aria-label="Select Sorting Order"
                  role="button"
                  onClick={() => setIsSortingDropDownOpen((p) => !p)}
                >
                  <span className="text-black/40">
                    {selectedSortingOrder || "Sort"}
                  </span>

                  <RxTriangleDown size={18} className="-mt-[2px]" />
                </div>

                {isSortingDropDownOpen && (
                  <div className="absolute top-full -mt-[3px] w-full border border-black/20 rounded-b-lg z-10">
                    {sortingOrderList
                      .filter(
                        (item) =>
                          !(
                            item.name === "Recency" &&
                            (selectedType === "Journalist" ||
                              selectedType === "Beat")
                          )
                      )
                      .map((item) => {
                        return (
                          <p
                            key={item.id}
                            className={`p-1 last:rounded-b-lg cursor-pointer hover:bg-[#EDEDED] hover:text-black text-black/40 bg-white`}
                            role="button"
                            onClick={() => {
                              setIsSortingDropDownOpen(false);
                              setSortingOrder(item.value);
                              setSelectedSortingOrder(item.name);
                              handleSearch();
                            }}
                          >
                            {item.name}
                          </p>
                        );
                      })}
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      </section>

      {isLoading && data?.length === 0 ? (
        <div className="animate-pulse text-black text-lg font-medium flex items-center justify-center h-[30dvh] w-full">
          Loading...
        </div>
      ) : isDataEmpty ? (
        <div className="flex items-center justify-center gap-2 pt-20 flex-col px-5 lg:px-10 ">
          <p className="text-black/50 text-xl text-center font-semibold">
            Hmm... we came up empty.
          </p>

          <p className="text-black/50 text-center">
            No matches this time. Maybe tweak your search?
          </p>
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center gap-2 pt-20 flex-col px-5 lg:px-10 ">
          <p className="text-black/50 text-xl font-semibold text-center">
            We ran into an error.
          </p>

          <p className="text-black/50 text-center">
            Looks like there was a hiccup while searching. We're on it — try
            refreshing or searching again.
          </p>

          <button
            type="button"
            className="cursor-pointer bg-[#002B5B] p-2 rounded-md text-white"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </div>
      ) : (
        data?.length > 0 && (
          <section className="bg-[#F5F5F5] py-5 flex items-center justify-center">
            <section className="flex items-center flex-col w-full xl:w-9/12">
              <div className="container mx-auto px-5 flex flex-col gap-5 lg:px-10 ">
                {data?.map((item) =>
                  selectedTab === "People" ? (
                    <JournalistCard
                      key={item.id}
                      {...item}
                      open={() => fetchProfileData(item.id)}
                      search={highlightedTerm}
                      selectedType={selectedType}
                      handleCase={item.shutShop?.id}
                      isSelected={selectedJournalistsId.includes(item.id)}
                      handleSelect={() => handleSelect(item.id)}
                      disabled={selectAllLabel === "Unselect All"}
                    />
                  ) : (
                    <ArticleCard key={item._id} {...item} />
                  )
                )}
              </div>

              {nextPageToken !== undefined &&
                nextPageToken.trim().length > 0 &&
                selectAllLabel !== "Unselect All" && (
                  <button
                    className="bg-[#01438D] w-fit text-white p-2 rounded-[4px] text-sm font-medium text-center my-5 cursor-pointer"
                    type="button"
                    onClick={handleLoadMore}
                  >
                    Load more
                  </button>
                )}

              {totalArticlesCount > data?.length &&
                selectedTab === "Articles" && (
                  <button
                    className="bg-[#01438D] w-fit text-white p-2 rounded-[4px] text-sm font-medium text-center my-5 cursor-pointer"
                    type="button"
                    onClick={() => {
                      const nextPageNumber = currentPageNumber + 1;
                      setCurrentPageNumber(nextPageNumber);
                      getArticlesData(nextPageNumber);
                    }}
                  >
                    Load more
                  </button>
                )}
            </section>
          </section>
        )
      )}

      {isProfileOpen && (
        <div className="fixed inset-0 bg-black/15 z-[500]">
          <ProfileCard
            data={profileData}
            close={() => setIsProfileOpen(false)}
          />
        </div>
      )}

      {isMediaListDialogOpen && (
        <BuildCampaign
          onClose={() => {
            setIsMediaListDialogOpen(false);
            document.body.classList.remove("overflow-hidden");
          }}
          advanceSearch="advSearch"
          selectedType={selectedType}
          sortBy={sortingOrder}
          searchBy={search}
          open={isMediaListDialogOpen}
          selectAllLabel={selectAllLabel}
          selectedJournalists={selectedJournalistsId}
        />
      )}
    </main>
  );
};

export default AdvanceSearchQuery;
