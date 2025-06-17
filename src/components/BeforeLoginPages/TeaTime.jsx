"use client";

import { useEffect, useState } from "react";
import BeforeLoginHeader from "./BeforeLoginHeader";
import TeaTimeRecord from "./TeaTimeRecord";
import { useLeftJournoSearch } from "../utils/UrlBuilder";
import { SKRIBEEXTRA } from "../../constants";
import axios from "axios";
import useInfiniteScroll from "../utils/useInfiniteScroll";
import Link from "next/link";
import Spinner from "../../Services/Spinner";
import parse from "html-react-parser";

const TeaTime = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const url = SKRIBEEXTRA;
  const [filterData, setFilterData] = useState({ count: 0 });
  const [loadingData, setLoadingData] = useState(false);
  const [searchDeps, setSearchDeps] = useState(0);
  const [leftData, setLeftData] = useState([]);
  const [rightData, setRightData] = useState([]);
  const { isdata, loadMore, loadingMore, noMore, loading } =
    useLeftJournoSearch(
      filterData,
      filterData["count"],
      url + "?pageSize=10",
      searchDeps
    );

  const getSection = async () => {
    axios.get(url + "?pageSize=10").then((output) => {
      if (output?.data?.data?.rightData?.length > 0) {
        setLoadingData(true);
        setLeftData(output?.data?.data?.leftData);
        setRightData(output?.data?.data?.rightData);
      }
    });
  };

  useEffect(() => {
    getSection();
  }, []);

  useInfiniteScroll(loadMore);

  useEffect(() => {
    const teaTimeScroll = () => {
      const elements = document.querySelectorAll(".img-wrap");
      const windowTop = window.scrollY || window.pageYOffset;

      elements.forEach((el) => {
        const offsetTop = el.offsetTop;
        // const windowHeight = window.innerHeight;

        if (
          offsetTop - windowTop < 300.265625 &&
          offsetTop - windowTop > 120.265625
        ) {
          const id = el.getAttribute("aid");
          const title = el.getAttribute("hed");
          const urlHash = `?id=${id}&t=${title}`.split(" ").join("-");

          if (window.history.pushState) {
            window.history.pushState(null, null, urlHash);
          }
        }
      });
    };

    window.addEventListener("scroll", teaTimeScroll);

    return () => {
      window.removeEventListener("scroll", teaTimeScroll);
    };
  }, []);

  return (
    <>
      <div className="bg-slate-100">
        {/* <MetaTags>
          <title>
            Chai Times | PR Industry Insights: What You Need to Know
          </title>
          <meta
            name="description"
            content="Stay updated with the latest trends and insights in the PR industry. Explore news, analysis, and expert opinions to enhance your public relations strategies"
          />
          <meta property="og:title" content="MyApp" />
          <meta property="og:image" content="path/to/image.jpg" />
        </MetaTags> */}
        {!userInfo?.name && !userInfo?.email && (
          <header className="header-bg md:pb-32">
            <div>
              <div className="w-12/12 mx-auto md:w-11/12">
                <BeforeLoginHeader />
              </div>
            </div>
          </header>
        )}

        <div
          className={`container mx-auto mb-16 ${!userInfo?.name && !userInfo?.email ? "md:-mt-24" : "md:pt-10"}`}
        >
          <section className="section mx-auto flex w-11/12 flex-col gap-x-6 lg:flex-row">
            <div className="section w-12/12 order-1 mx-auto md:relative lg:w-3/12">
              <div className="top-[100px] mb-6 mt-20 rounded-xl bg-white p-3 shadow-xl md:sticky md:mt-0">
                <h3 className="text-md mb-2 font-medium text-gray-500">
                  Podium
                </h3>
                <div className="border border-gray-300 p-2">
                  <h2 className="text-sm font-medium leading-none text-gray-400">
                    {leftData?.intBlogType}
                  </h2>
                  <h3 className="text-md m-0 pb-1 font-medium text-gray-600">
                    {leftData?.vchHeading}
                  </h3>
                  <figure>
                    <figcaption>
                      <h2 className="pb-1 text-sm font-medium text-gray-600">
                        {leftData?.vchSubHeading}
                      </h2>
                      <div className="edit-style h-48 overflow-scroll overflow-x-hidden break-words pb-3 text-xs leading-4 text-gray-400">
                        {leftData?.vchContent?.length > 0 &&
                          parse(leftData?.vchContent)}
                        {leftData?.vchReadMoreLink !== "" && (
                          <Link
                            className="break-words text-xs text-[#6521AD]"
                            href={leftData?.vchReadMoreLink || ""}
                          >
                            Read More...
                          </Link>
                        )}
                      </div>
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>

            <div className="section order-3 mx-auto w-full lg:order-2 lg:w-6/12">
              {isdata?.list?.length > 0 &&
                isdata?.list?.map((curRecord, ind) => (
                  <TeaTimeRecord key={ind} {...curRecord} />
                ))}
            </div>
            <div className="section order-2  mx-auto w-full md:relative lg:order-3  lg:w-3/12">
              <div className="top-[100px]  mb-6 rounded-xl bg-white p-3 shadow-xl md:sticky">
                <h3 className="text-md mb-2 font-medium text-gray-500">
                  Editor's picks
                </h3>
                <ul className="flex flex-col gap-y-3">
                  {!!rightData?.length &&
                    rightData?.map((curItem) => (
                      <li
                        key={curItem?.bgBlogId}
                        className="border-b border-gray-200 py-2 text-sm text-gray-500 last:border-none"
                      >
                        <p className="">{curItem?.vchHeading}</p>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            {loading && (
              <div>
                <div className="opegue-4 absolute inset-0 z-10  max-h-screen bg-gray-600">
                  <div className="lft50 absolute">
                    <Spinner status={true} />
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default TeaTime;
