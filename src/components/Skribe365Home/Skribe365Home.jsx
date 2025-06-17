"use client";

import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import userService from "../../Services/user.service";
import { SKRIBE365 } from "../../constants";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Skribe365Home = () => {
  const [trackingId, setTrackingId] = useState();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTrackingId(generateUUID());
  }, []);

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

  const ReadMore = ({ content }) => {
    const sanitizedContent = DOMPurify.sanitize(content);
    return (
      <div
        className="text-[12px] mt-2 font-[400] text-[#7c7c7c] w-full"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    );
  };

  const goBack = () => {
    router.back();
  };

  const fetchData = async (token = null, isLoadMore = false) => {
    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      let url = SKRIBE365;
      if (token) {
        const separator = SKRIBE365.includes("?") ? "&" : "?";
        url = `${SKRIBE365}${separator}token=${encodeURIComponent(token)}`;
      }

      const response = await userService.get(url);

      if (response.response?.status === "Ok") {
        const fetchedArticles =
          response.data?.flatMap((item) =>
            item.category?.map((category) => ({
              primaryBeat: item.primaryBeat,
              ...category,
            }))
          ) || [];

        if (isLoadMore) {
          // Append new articles to existing ones
          setArticles((prevArticles) => [...prevArticles, ...fetchedArticles]);
        } else {
          // Set articles for initial load
          setArticles(fetchedArticles);
        }

        // Handle pagination token
        if (response.nextPageToken?.token) {
          setNextPageToken(response.nextPageToken.token);
          setHasMore(true);
        } else {
          setNextPageToken(null);
          setHasMore(false);
        }
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      if (isLoadMore) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLoadMore = () => {
    if (nextPageToken && !loadingMore) {
      fetchData(nextPageToken, true);
    }
  };

  const groupedArticles =
    articles?.reduce((acc, article) => {
      acc[article.primaryBeat] = acc[article.primaryBeat] || [];
      acc[article.primaryBeat].push(article);
      return acc;
    }, {}) || {};

  return (
    <>
      <div className="px-8 pb-2 xl:w-11/12 w-12/12  xl:pl-8 section text-[14px] font-poppins">
        <div className="flex flex-col mt-4 ml-4">
          <ul className="flex items-center text-xs text-gray-400 gap-x-1">
            <li className="flex items-center">
              <Link href="/dashboard">Home</Link>
              <span className="items-center text-gray-400 material-icons-outlined b-font">
                navigate_next
              </span>
            </li>
            <li className="flex items-center">Skribe 365</li>
          </ul>
        </div>
      </div>
      <hr className="mt-2 mb-4 text-black/10" />
      <div className="px-8 pb-6 xl:w-11/12 w-12/12  xl:pl-8 section text-[14px] font-poppins">
        <div className="ml-4">
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
        <p className="mt-4 ml-4 text-[20px] font-[600]">
          Welcome to 365 from Skribe
        </p>
        <p className="mt-1 mb-2 ml-4 text-[14px] font-[400] text-[#999999]">
          SKRIBE 365 is an alert reporting journalist moves and changes, direct
          into your inbox every Monday, Wednesday and Friday.
        </p>
        <div className="gap-4 mt-4 ml-4 md:flex">
          <div className="w-full">
            <div variant="outline" className="mr-2" boxshadow="base" p={4}>
              <div className="mt-2 overflow-y-auto">
                {loading ? (
                  <div className="p-4">
                    <Skeleton count={5} height={100} className="w-full" />
                  </div>
                ) : (
                  <>
                    {Object.keys(groupedArticles).map((category, catIndex) => (
                      <div key={catIndex}>
                        <h3 className="ml-4 font-[500] text-[16px] tracking-wider text-[#2F4F69]">
                          {category}
                        </h3>
                        {groupedArticles[category]?.map((article, artIndex) => (
                          <div
                            key={`${category}-${article.skribe365ContentId}-${artIndex}`}
                            className="flex items-center justify-between mt-2 mb-2 ml-4 mr-4 text-sm "
                          >
                            <div className="w-full">
                              <div className="flex justify-between ">
                                <h2 className="font-[500] text-[14px] text-[#002b5b]">
                                  {article.outletname}
                                </h2>
                                <h3 className="text-right text-[#666666] font-[500] text-[12px]">
                                  {new Date(
                                    article.createdDate
                                  ).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                  })}
                                </h3>
                              </div>
                              <ReadMore content={article.description} />
                              <hr className="mt-2 ml-2 mr-2 text-[#D0D0D0]" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </>
                )}

                {hasMore && !loading && (
                  <div className="flex justify-center">
                    <button
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className={`cursor-pointer my-5 rounded-md bg-[#002b5b] text-white px-3 py-2 text-sm font-normal  md:w-auto md:border-0 ${
                        loadingMore ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {loadingMore ? "Loading..." : "Load more"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Skribe365Home;
