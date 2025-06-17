"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SOCIALCATEGOARY } from "../../../constants";
import { useLeftJournoSearch } from "../../utils/UrlBuilder";
import useInfiniteScroll from "../../utils/useInfiniteScroll";
import Spinner from "../../../Services/Spinner";

const Podcast = ({ id }) => {
  const router = useRouter();
  const [searchDeps, setSearchDeps] = useState(id);
  const [active, setActive] = useState(id);
  const [getId, setGetId] = useState(id);
  const [data, setData] = useState([]);

  useEffect(() => {
    setGetId(id);
  }, [id]);

  const url = `${SOCIALCATEGOARY}?genreId=${getId}&pageSize=24`;
  useEffect(() => {
    if (searchDeps !== id) {
      setSearchDeps(getId);
    }
  }, [getId]);

  const { isdata, loading, loadMore, loadingMore, noMore } =
    useLeftJournoSearch(null, null, url, searchDeps);
  useEffect(() => {
    setData(isdata?.list);
  }, [isdata]);

  useInfiniteScroll(loadMore);

  const goBack = () => {
    router.back();
  };

  const searchRecord = (searchParam) => {
    let data = isdata?.list?.filter((curParam) => {
      return curParam?.title
        ?.toLowerCase()
        ?.includes(searchParam.toLowerCase());

      //curItem?.journoName?.toLowerCase()?.includes(sVal.toLowerCase());
    });
    setData(data);
  };

  return (
    <div>
      <section
        className="sticky bottom-1 left-0 top-[64px] z-10 flex gap-x-8 bg-white"
        style={{ borderBottom: "1px solid rgb(209 213 219)" }}
      >
        <div className="section flex w-11/12 gap-x-6">
          <div className=" flex w-full flex-col flex-wrap gap-6 self-start">
            <div className="flex flex-wrap items-center justify-between bg-white p-3 pl-8 pr-0">
              <ul className="flex items-center gap-x-1 text-sm text-gray-400">
                <li className="flex items-center">
                  Home
                  <span className="material-icons-outlined b-font text-gray-400">
                    navigate_next
                  </span>
                </li>
                <li className="flex items-center">
                  Social
                  <span className="material-icons-outlined b-font text-gray-400">
                    navigate_next
                  </span>
                </li>

                <li className="flex items-center">Podcast</li>
              </ul>

              <div className="relative flex gap-x-3">
                <div className="flex items-center rounded-lg border border-gray-300 bg-white  pl-2">
                  <span className="material-icons-outlined text-sm text-gray-300">
                    search
                  </span>
                  <input
                    type="text"
                    className="text-md w-full rounded-lg bg-white px-3 py-1 text-gray-400 focus:outline-none"
                    placeholder="Search By Name"
                    onKeyUp={(e) => searchRecord(e.target.value)}
                    //   onKeyUp={optimizedSearchRecords}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto">
        <div className="mx-auto mt-8 w-11/12">
          <div
            className="flex cursor-pointer items-center  gap-x-2 text-sm"
            onClick={() => goBack()}
          >
            <span className="material-icons-outlined icon-14">
              arrow_back_ios_new
            </span>
            Go Back
          </div>
          <h2 className="text-md flex items-center font-medium text-gray-500 mt-4">
            Explore by Genre &nbsp;
            <span className="material-icons-outlined icon-16">info</span>
          </h2>
          <div className="border-gray-2 00 mt-3 flex flex-wrap gap-2   border-b pb-6">
            {isdata?.podcastGenre?.map((curItem) => (
              <Link
                key={curItem?.intGenreId}
                href={`/podcast-listing/${curItem?.intGenreId}`}
                onClick={() => setActive(curItem?.intGenreId)}
                className={
                  curItem?.intGenreId === active
                    ? "text-xs rounded-md border border-[#6521AD] px-4  py-1 text-[#6521AD]"
                    : "text-xs rounded-md border border-gray-400 px-4 py-1 text-gray-400 hover:border-[#6521AD] hover:text-[#6521AD]"
                }
              >
                {curItem?.vchGenre}
              </Link>
            ))}
          </div>
        </div>
        <div className="mx-auto my-4 w-11/12">
          <h2 className="text-md mb-3 flex items-center font-medium text-gray-500">
            {isdata?.list?.length > 0 && isdata?.list[0]?.genreName}
            {isdata?.list?.length > 0 && " (" + isdata?.total + ")"}
          </h2>
          <div className="grid grid-cols-4 gap-5 pb-10">
            {/* {!data?.length && "No Record Found"} */}
            {data?.length > 0
              ? data?.map((curItem) => {
                  return (
                    <div
                      key={curItem?.podcastId}
                      className="relative rounded-lg  shadow-2xl"
                    >
                      <Link href={`/podcast-detail/${curItem?.podcastId}`}>
                        <div className="obje h-56 overflow-hidden rounded-tl-lg rounded-tr-lg">
                          <img
                            src={curItem?.imageUrl}
                            className="object-cover"
                            alt="img"
                          />
                        </div>
                        <div className="relative p-5 pt-2 text-gray-400">
                          <span className="absolute -top-7 left-2 rounded-sm bg-gray-300 px-2 py-1 text-xs font-medium text-gray-600">
                            Language : {curItem?.language}
                          </span>
                          <h3 className=" text-sm font-medium text-gray-500">
                            {curItem?.title}
                          </h3>
                          <p className="text-xs font-normal">
                            {curItem?.description.slice(0, 70) + "..."}
                          </p>
                          {curItem?.podcastGenre?.length > 0 && (
                            <ul className="mt-5 flex flex-wrap gap-2">
                              {curItem?.podcastGenre?.map((val, index) => {
                                return (
                                  <li
                                    key={index}
                                    className="text-xs rounded-md border border-gray-300 px-2  text-gray-400"
                                  >
                                    {val}
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>
                      </Link>
                    </div>
                  );
                })
              : data
                ? "No Record Found"
                : "No Record Found"}
          </div>
          <div className="mt-2 flex justify-center">
            {loadingMore && (
              <p className="whitespace-nowrap px-4  py-1 text-gray-400">
                Loading journalists...
              </p>
            )}
          </div>
        </div>
      </section>
      {loading && (
        <div>
          <div className="opegue-4 absolute inset-0 z-50  max-h-screen bg-gray-600">
            <div className="lft50 absolute">
              <Spinner status={true} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Podcast;
