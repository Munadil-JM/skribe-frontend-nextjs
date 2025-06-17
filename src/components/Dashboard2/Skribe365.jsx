"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DOMPurify from "dompurify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import userService from "../../Services/user.service";
import { SKRIBE365, Freebies } from "../../constants";
import "./TrendingJournalist.css";
import tokenService from "../../Services/token.service";
import { usePopup } from "../Header/CreatePopup";

const ReadMore = ({ content }) => {
  const sanitizedContent = DOMPurify.sanitize(content);
  const words = sanitizedContent.split(" ");
  if (words.length <= 12) {
    return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
  }
  const visibleContent = words.slice(0, 12).join(" ") + "...";
  return (
    <div className="flex">
      <div>
        <div
          className="text-xs text-gray-500 mt-1"
          dangerouslySetInnerHTML={{ __html: visibleContent }}
        />
        <Link
          href={`/view-skribe365`}
          className="text-gray-900 cursor-pointer font-[500] text-[12px]"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};
const Skribe365 = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showPopup } = usePopup();
  const [roleType, setRoleType] = useState("");

  useEffect(() => {
    setRoleType(tokenService.getLocalRole());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userService.get(SKRIBE365);
        if (response?.response?.status === "Ok") {
          const fetchedArticles = response?.data?.flatMap((item) =>
            item?.category?.map((category) => ({
              primaryBeat: item.primaryBeat,
              ...category,
            }))
          );
          setArticles(fetchedArticles);
        } else {
          console.error("Failed to fetch data:", response?.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    roleType?.length > 0 && !roleType?.includes(Freebies) && fetchData();
  }, [roleType]);
  const groupedArticles = articles.reduce((acc, article) => {
    acc[article.primaryBeat] = acc[article.primaryBeat] || [];
    acc[article.primaryBeat].push(article);
    return acc;
  }, {});
  return (
    <fieldset className="h-[510px] p-1 border-2 border-black/10 rounded-[10px] bg-white relative">
      <legend className="pl-3 pr-2 text-sm font-[500] text-[#333]">
        Skribe 365
      </legend>
      <div className="p-3 text-black/40">
        <p className="text-[12.5px]">
          365 - Journalist/Influencer Moves And Changes
        </p>
        <hr className="mt-2 text-black/10" />
      </div>
      {roleType?.includes(Freebies) ? (
        <>
          <div className="blur-sm">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="">
                <Skeleton width="70%" height={20} className="mb-2" />
                <Skeleton width="80%" height={15} className="mb-2" />
                <Skeleton width="90%" height={15} className="mb-2" />
              </div>
            ))}
          </div>
          <div className="absolute left-1/2 w-full top-1/2 px-10 -translate-x-1/2 -translate-y-1/2">
            <h2 className="text-lg font-semibold pb-2 text-center">
              Unlock More with Premium
            </h2>
            <p className="text-center pb-2 text-balance">
              Upgrade to a paid plan to view the latest media movements
              {/* Explore Exclusive tools and advanced features designed to elevate
              your experience. Ready to take the next step? */}
            </p>
            <Link
              // to=""
              href={""}
              onClick={() => showPopup()}
              className="cursor-pointer flex justify-center items-center gap-x-2 mx-4 bg-[#002b5b] py-2 rounded-lg text-center text-white text-md"
            >
              Updgrade to View
              {/* <span class="material-icons-outlined cursor-pointer text-[#eab621]">
                lock
              </span> */}
            </Link>
          </div>
          {/* <AccessBlocked /> */}
          {/* <div className="premium-content text-center">
            <div className="blurred-content">
              <div className="blurred-text">
                {articles.slice(0, 5).map((article, index) => (
                  <div key={index} className="blurred-item">
                    <p className="blurred-text">{article.outletname}</p>
                  </div>
                ))}
              </div>
              <div className="lock-icon">
                <span className="material-icons-outlined">lock</span>
                <p>Unlock the full list with premium</p>
                <button className="premium-btn">Try Premium</button>
              </div>
            </div>
            <button class="bg-gradient-to-r m-[6px] from-yellow-400 via-red-500 to-pink-500 text-white font-bold py-2 px-6 rounded-full hover:from-yellow-500 hover:via-red-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-300 transition ease-in-out duration-300">
              Buy
            </button>
          </div> */}
        </>
      ) : (
        <div className="backdrop-blur-sm">
          <div className="overflow-y-auto scrollbar h-[380px]">
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="m-4">
                    <Skeleton width="70%" height={20} className="mb-2" />
                    <Skeleton width="80%" height={15} className="mb-2" />
                    <Skeleton width="90%" height={15} className="mb-2" />
                  </div>
                ))
              : Object.keys(groupedArticles).map((category, catIndex) => (
                  <div key={catIndex}>
                    <h3 className="ml-4 font-medium text-sm text-gray-500 leading-normal">
                      {category}
                    </h3>
                    {groupedArticles[category]?.map((article, artIndex) => (
                      <div
                        key={artIndex}
                        className="flex items-center justify-between mb-1 ml-4 mr-4 text-sm"
                      >
                        <div className="w-full">
                          <div className="flex justify-between">
                            <h2 className="font-[500] text-sm text-[#002b5b] mt-1">
                              {article.outletname}
                            </h2>
                            <h3 className="text-right text-black/40 text-[12px]">
                              {new Date(article.createdDate).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                }
                              )}
                            </h3>
                          </div>
                          <ReadMore
                            className="text-customGray64"
                            content={article.description}
                          />
                          <hr className="mx-1 my-1 text-black/10" />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
          </div>
          <Link href="/view-skribe365" className="block text-center">
            <p className="flex items-center justify-center gap-1 m-2 text-[#318fff] text-sm">
              View All{" "}
              <span className="text-sm icon-16 material-icons-outlined">
                arrow_forward
              </span>
            </p>
          </Link>
        </div>
      )}
    </fieldset>
  );
};
export default Skribe365;
