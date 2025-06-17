"use client";

import { BiSearch } from "react-icons/bi";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import userService from "../../Services/user.service";
import { useNotification } from "../ErrorAlert/ErrorContextNotification";
import { GET_RECENT_SEARCHES, GET_POPULAR_SEARCHES } from "../../constants";

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

const AdvanceSearch = () => {
  const router = useRouter();
  const { showNotification } = useNotification();

  const [search, setSearch] = useState("");
  const [selectedTab, setSelectedTab] = useState("People");
  const [selectedType, setSelectedType] = useState("Journalist");

  const [recentSearches, setRecentSearches] = useState([]);
  const [popularSearches, setPopularSearches] = useState([]);

  useEffect(() => {
    const fetchRecentAndPopularSearches = async () => {
      const [recentRes, popularRes] = await Promise.all([
        userService.get(
          `${GET_RECENT_SEARCHES}?tab=${selectedTab === "People" ? "AdvancedSearchPeople" : "AdvancedSearchArticle"}`
        ),
        userService.get(
          `${GET_POPULAR_SEARCHES}?tab=${selectedTab === "People" ? "AdvancedSearchPeople" : "AdvancedSearchArticle"}`
        ),
      ]);

      setRecentSearches(recentRes?.data);
      setPopularSearches(popularRes?.data);
    };

    fetchRecentAndPopularSearches();
  }, [selectedTab]);

  return (
    <main className="font-inter pt-5 lg:pt-10">
      <section className="container mx-auto px-5 lg:px-10 flex flex-col xl:w-9/12">
        {/* Tabs */}
        <div className="flex gap-2 sm:gap-3 items-center pt-5">
          <button
            type="button"
            className={`group cursor-pointer flex items-center gap-1 text-sm font-medium sm:font-semibold rounded-t-lg p-2 sm:py-3 sm:px-4 ${selectedTab === "People" ? "bg-[#FFDB43] text-black" : "bg-[#F1F1E6] text-black/40 sm:hover:bg-[#FFDB43BB] sm:hover:text-black/70"}`}
            onClick={() => {
              setSelectedTab("People");
              setSelectedType("Journalist");
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

        {/* Search Box */}
        <div
          className={`flex items-center justify-between py-1 px-2 gap-5 border border-gray-400 rounded-md mt-7 w-full sm:w-2/4`}
        >
          <input
            type="search"
            placeholder={`${selectedTab === "People" ? "Search any Journalist, Beats, Outlets, GEO" : "Search any Companies, Competitors and Products"}`}
            className="w-full font-semibold text-black/80 outline-none text-xs sm:text-sm py-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (search.trim().length < 3) {
                  showNotification("Enter atleast 3 characters", "warning");
                } else {
                  router.push(
                    `/advance-search/q?search=${encodeURIComponent(search)}&tab=${selectedTab}&type=${selectedType}`
                  );
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
                router.push(
                  `/advance-search/q?search=${encodeURIComponent(search)}&tab=${selectedTab}&type=${selectedType}`
                );
              }
            }}
          />
        </div>

        {/* Types */}
        <section className="flex flex-col gap-5 lg:items-center lg:flex-row lg:gap-10 justify-between pb-5 pt-3">
          <div
            className={`flex flex-wrap sm:flex-nowrap items-center gap-y-2 gap-x-4 sm:gap-5 sm:justify-between whitespace-nowrap w-fit`}
          >
            {types[selectedTab].map((item) => {
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
        </section>

        {/* Recent and Popular Searches */}
        {search.trim().length === 0 && (
          <section className="pb-5">
            {recentSearches?.length > 0 &&
              recentSearches
                ?.filter((item) => item.type === selectedType)
                .sort(
                  (a, b) => new Date(b.dtcreateDate) - new Date(a.dtcreateDate)
                ).length > 0 && (
                <div className="grid grid-cols-[auto_1fr] items-start gap-5">
                  <div className="flex gap-1 items-center">
                    <p className="text-sm whitespace-nowrap">Recent Searches</p>

                    <img
                      src="/assets/adv-search-recentsearch.webp"
                      alt="Advance Search - Recent Searches Icon"
                      width={18}
                      height={18}
                    />
                  </div>

                  <div className="flex gap-1 items-center flex-wrap">
                    {recentSearches
                      .filter((item) => item.type === selectedType)
                      .map((search, index) => {
                        return (
                          <button
                            key={index}
                            type="button"
                            className="bg-[#F1F1E6] cursor-pointer text-black/60 px-2 py-1 rounded-md text-xs hover:bg-black/60 hover:text-[#F1F1E6]"
                            onClick={() => {
                              router.push(
                                `/advance-search/q?search=${encodeURIComponent(search.text)}&tab=${selectedTab}&type=${selectedType}`
                              );
                            }}
                          >
                            {search.text}
                          </button>
                        );
                      })}
                  </div>
                </div>
              )}

            {popularSearches?.length > 0 &&
              popularSearches
                ?.filter((item) => item.type === selectedType)
                .sort((a, b) => b.count - a.count).length > 0 && (
                <div className="pt-3 grid grid-cols-[auto_1fr] items-start gap-4">
                  <div className="flex gap-1 items-center">
                    <p className="text-sm whitespace-nowrap">
                      Popular Searches
                    </p>

                    <img
                      src="/assets/adv-search-popularsearch.webp"
                      alt="Advance Search - Popular Searches Icon"
                      width={18}
                      height={18}
                    />
                  </div>

                  <div className="flex gap-1 items-center flex-wrap -mt-[3px]">
                    {popularSearches
                      .filter((item) => item.type === selectedType)
                      .map((search, index) => {
                        return (
                          <button
                            key={index}
                            type="button"
                            className="bg-white cursor-pointer text-[#01438D] border border-[#01438D] px-2 py-1 rounded-md text-xs hover:bg-[#01438D] hover:text-white"
                            onClick={() => {
                              router.push(
                                `/advance-search/q?search=${encodeURIComponent(search.text)}&tab=${selectedTab}&type=${selectedType}`
                              );
                            }}
                          >
                            {search.text}
                          </button>
                        );
                      })}
                  </div>
                </div>
              )}
          </section>
        )}
      </section>
    </main>
  );
};

export default AdvanceSearch;
