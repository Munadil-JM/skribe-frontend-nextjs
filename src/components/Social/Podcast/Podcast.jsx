"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Spinner from "../../../Services/Spinner";
import { PODCASTHOME } from "../../../constants";
import userService from "../../../Services/user.service";
import PodcastTooltip from "../../Tooltip/PodcastTooltip";

const Podcast = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = `${PODCASTHOME}`;
  const fetchPodcast = () => {
    //shimmer effect call here
    userService
      .get(url)
      .then((result) => {
        if (result?.response?.status === "Ok") {
          setData(result);
          setLoading(false);
        }
      })
      .catch((error) => {
        setData([]);
      })
      .finally(() => {
        //shimmer effect will remove
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPodcast();
  }, []);

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
                  Social
                  <span className="material-icons-outlined b-font text-gray-400">
                    navigate_next
                  </span>
                </li>

                <li className="flex items-center">Podcast</li>
              </ul>

              {/* <div className="relative flex gap-x-3">
                <div className="flex items-center rounded-lg border border-gray-300 bg-white  pl-2">
                  <span className="material-icons-outlined text-sm text-gray-300">
                    search
                  </span>
                  <input
                    type="text"
                    className="text-md w-full rounded-lg bg-white px-3 py-1 text-gray-400 focus:outline-none"
                    placeholder="Search By Name"
                    //onKeyUp={(e) => searchRecord(e.target.value)}
                    //   onKeyUp={optimizedSearchRecords}
                  />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto">
        <div className="mx-auto mt-8 w-11/12">
          <h2 className=" text-md flex items-center font-medium text-gray-500">
            Explore by Genre &nbsp;
            <PodcastTooltip
              title="Welcome to Podcast"
              content="Podcast Description"
            />
          </h2>
          <ul className="border-gray-2 00 my-3 flex flex-wrap gap-2  border-b pb-6">
            {data?.data?.length > 0 &&
              data?.data?.map((curItem) => {
                return (
                  <Link
                    key={curItem?.intGenreId}
                    href={`/podcast-listing/${curItem?.intGenreId}`}
                    className="text-xs rounded-md border border-gray-400 px-4 py-1 text-gray-400 hover:border-[#6521AD] hover:text-[#6521AD]"
                  >
                    {curItem?.vchGenre}
                  </Link>
                );
              })}
          </ul>
        </div>

        <div className="mx-auto w-11/12">
          {data?.podcast && data?.podcast?.length > 0
            ? data?.podcast?.map((curItem, index) => {
                return (
                  <div className="pb-5" key={index}>
                    <h2 className="text-md mb-3 flex items-center font-medium text-gray-500">
                      {curItem?.genre}
                    </h2>
                    <div className="grid grid-cols-6 gap-3">
                      {curItem?.podcast?.slice(0, 9)?.map((curElem, index) => {
                        return (
                          <div key={index}>
                            {/* col-span-2 row-span-2 */}
                            {index === 0 ? (
                              <div className="relative col-span-2 row-span-2">
                                <Link
                                  href={`/podcast-detail/${curElem?.podcastId}`}
                                >
                                  <img
                                    src={curElem?.imageUrl}
                                    className="object-cover"
                                    alt="img"
                                  />
                                  <div className="absolute bottom-0 left-0 w-full  bg-gray-900 bg-opacity-70 p-3 text-white">
                                    <h3 className="text-sm font-bold">
                                      {curElem?.publisher}
                                    </h3>
                                    <p className="text-sm font-normal">
                                      {curElem?.title}
                                    </p>
                                  </div>
                                </Link>
                              </div>
                            ) : (
                              <div className="relative">
                                <Link
                                  href={`/podcast-detail/${curElem?.podcastId}`}
                                >
                                  <img
                                    src={curElem?.imageUrl}
                                    className="object-cover"
                                    alt="img"
                                  />
                                  <div className="absolute bottom-0 left-0 w-full  bg-gray-900 bg-opacity-70 p-3 text-white">
                                    <h3 className="text-sm font-bold">
                                      {curElem?.publisher.substring(0, 13) +
                                        "..."}
                                    </h3>
                                    <p className="text-sm font-normal">
                                      {curElem?.title?.substring(0, 15) + "..."}
                                    </p>
                                  </div>{" "}
                                </Link>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            : loading
              ? "Loading..."
              : "No Record Found"}
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
