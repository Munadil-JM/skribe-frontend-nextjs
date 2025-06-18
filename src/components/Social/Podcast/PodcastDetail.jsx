"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import spotify from "../../assets/spotify_pod.png";
import google from "../../assets/google_pod.png";
import web from "../../assets/web_pod.png";
import email from "../../assets/email-pod.png";
import facebook from "../../assets/facebook.svg";
import instagram from "../../assets/instagram.svg";
import twitter from "../../assets/twitter.svg";
// import linkedin from "../../assets/linkedin.svg";
// import youtube from "../../assets/youtube.svg";
import { PODCASTDETAIL } from "../../../constants";
import userService from "../../../Services/user.service";
import noUser from "../../assets/noUser.png";
import Spinner from "../../../Services/Spinner";
import { useRouter } from "next/navigation";

const PodcastDetail = ({ id }) => {
  const router = useRouter();
  const [dataDetail, setDataDetail] = useState({});
  const [suggetion, setSuggetion] = useState([]);
  const [loading, setLoading] = useState(true);
  let url = `${PODCASTDETAIL}?podcastId=${id}`;

  const PodcastDetail = (url) => {
    userService
      .get(url)
      .then((result) => {
        if (result?.response?.status === "Ok") {
          setDataDetail(result?.data[0]);
          setSuggetion(result?.suggestionsPodcasts);
          setLoading(false);
        }
      })
      .catch((error) => {
        setDataDetail({});
        setSuggetion([]);
      })
      .finally(() => {});
  };

  useEffect(() => {
    PodcastDetail(url);
  }, [id]);

  const goBack = () => {
    router.back();
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
                  Social
                  <span className="material-icons-outlined b-font text-gray-400">
                    navigate_next
                  </span>
                </li>
                <li className="flex items-center">
                  Podcast
                  <span className="material-icons-outlined b-font text-gray-400">
                    navigate_next
                  </span>
                </li>
                <li className="flex items-center">Podcast Details</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {suggetion?.length > 0 ? (
        <>
          <header className="bg-[#F1F1E6]">
            <div className="container m-auto">
              <div className="flex items-center gap-x-8 py-14">
                <div className="flex w-2/12 flex-col items-end gap-y-2">
                  <span onClick={() => goBack()} className="cursor-pointer">
                    <div className="flex items-center gap-x-2 pr-[75px] text-sm">
                      <span className="material-icons-outlined icon-14">
                        arrow_back_ios_new
                      </span>
                      Go Back
                    </div>
                  </span>
                  {dataDetail && (
                    <img
                      src={
                        dataDetail?.imageUrl
                          ? dataDetail?.imageUrl !== ""
                            ? dataDetail?.imageUrl
                            : noUser.src
                          : noUser.src
                      }
                      alt=""
                      className="h-36 w-36 object-cover"
                    />
                  )}
                </div>
                <div className=" w-4/12 ">
                  <h3 className="text-2xl font-semibold text-blue-950">
                    {dataDetail && dataDetail?.title}
                  </h3>

                  <span className="text-sm text-gray-800">
                    By-&nbsp;
                    {dataDetail && dataDetail?.publisher}
                  </span>
                  <ul className="flex flex-col items-start gap-y-4 pt-2">
                    <li className="flex items-center gap-x-6 rounded-xl bg-[#F1F1E6] p-6 py-2 shadow-md">
                      {dataDetail?.spotifyUrl && (
                        <Link
                          target="_blank"
                          href={`${dataDetail && dataDetail?.spotifyUrl}`}
                        >
                          <img
                            src={spotify.src}
                            className="w-8 rounded-full bg-white"
                            alt="img"
                          />
                        </Link>
                      )}
                      {dataDetail?.googleUrl && (
                        <Link
                          target="_blank"
                          href={`${dataDetail && dataDetail?.googleUrl}`}
                        >
                          <img src={google.src} className="w-6" alt="img" />
                        </Link>
                      )}
                      {dataDetail?.websit && (
                        <Link
                          target="_blank"
                          href={`${dataDetail && dataDetail?.websit}`}
                        >
                          <img src={web.src} className="w-6" alt="img" />
                        </Link>
                      )}
                      {dataDetail?.email && (
                        <Link
                          href={`mailto:${dataDetail && dataDetail?.email}`}
                        >
                          <img src={email.src} className="h-6" alt="img" />
                        </Link>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </header>
          <section className="container mx-auto">
            <div className="mx-auto mt-8 flex w-10/12 gap-x-5">
              <div className="w-8/12">
                <div className="flex w-full bg-gray-100 shadow-md shadow-gray-400">
                  <div className="flex basis-2/4 flex-col items-center border-r border-gray-300 py-8">
                    <h4 className="flex  items-center text-sm font-medium text-gray-600">
                      Listen Score &nbsp;
                      <span className="material-icons-outlined icon-16">
                        info
                      </span>
                    </h4>
                    <span className="text-4xl font-bold text-gray-500">
                      {dataDetail && dataDetail?.listenScore}
                      <span className="text-sm font-normal">LS</span>
                    </span>
                  </div>
                  <div className="flex basis-2/4 flex-col items-center py-8">
                    <h4 className="flex  items-center text-sm font-medium text-gray-600">
                      Global Rank &nbsp;
                      <span className="material-icons-outlined icon-16">
                        info
                      </span>
                    </h4>
                    <span className="text-4xl font-bold text-gray-500">
                      {dataDetail && dataDetail?.globalRank}
                      <span className="text-sm font-normal">TOP</span>
                    </span>
                  </div>
                </div>

                <div className="my-5 flex w-full flex-col bg-white p-10 shadow-md shadow-gray-400">
                  <h4 className="text-md font-medium text-gray-600">
                    {dataDetail && dataDetail?.title}
                  </h4>
                  <p className="py-2 pt-0 text-sm leading-7 text-gray-500">
                    {dataDetail && dataDetail?.podcastDescription}
                  </p>
                  <div className="flex">
                    <ul className="mb-5 flex w-full flex-wrap">
                      <li className="text-sm my-3 flex basis-2/4  items-center gap-x-2 text-gray-600">
                        <span className="material-icons-outlined icon-18">
                          language
                        </span>
                        Language: {dataDetail && dataDetail?.language}
                      </li>
                      <li className="text-sm my-3 flex basis-2/4  items-center gap-x-2 text-gray-600">
                        <span className="material-icons-outlined icon-18">
                          mic
                        </span>
                        Total Episodes:{" "}
                        {dataDetail && dataDetail?.totalEpisodes}
                      </li>

                      <li className="text-sm flex basis-2/4  items-center gap-x-2 text-gray-600">
                        <span className="material-icons-outlined icon-18">
                          history
                        </span>
                        Update Frequency: Every{" "}
                        {dataDetail && dataDetail?.updateFrequencyHours} Hours
                      </li>

                      <li className="text-sm flex basis-2/4  items-center gap-x-2 text-gray-600">
                        <span className="material-icons-outlined icon-18">
                          schedule
                        </span>
                        Average audio length:{" "}
                        {dataDetail && dataDetail?.averageAudioLength} minutes
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm pb-2 font-medium text-gray-600">
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {dataDetail &&
                        dataDetail?.tags?.map((curItem, index) => {
                          return (
                            <span
                              key={index}
                              className="rounded-md border border-gray-400 bg-white px-2 py-1 text-xs text-gray-500"
                            >
                              {curItem?.genreName}
                            </span>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-4/12">
                {(dataDetail?.facebook !== "" ||
                  dataDetail?.instagram !== "" ||
                  dataDetail?.twitter !== "") && (
                  <div className="mb-5 flex w-full flex-col bg-white p-5 shadow-md shadow-gray-400">
                    <h4 className="text-md font-medium text-gray-600">
                      Social
                    </h4>
                    <div className="flex gap-x-3 pt-3">
                      {dataDetail?.facebook && (
                        <Link
                          href={dataDetail?.facebook}
                          className="rounded-md bg-[#3B5998]"
                          target="_blank"
                        >
                          <img src={facebook.src} className="w-8" alt="img" />
                        </Link>
                      )}
                      {dataDetail?.instagram && (
                        <Link
                          href={dataDetail?.instagram}
                          className="rounded-md bg-[#C13684]"
                          target="_blank"
                        >
                          <img src={instagram.src} className="w-8" alt="img" />
                        </Link>
                      )}
                      {dataDetail?.twitter && (
                        <Link
                          href={dataDetail?.twitter}
                          className="rounded-md bg-[#000000]"
                          target="_blank"
                        >
                          <img src={twitter.src} className="w-8" alt="img" />
                        </Link>
                      )}
                    </div>
                  </div>
                )}
                <div className="mb-5 flex w-full flex-col bg-white p-5 shadow-md shadow-gray-400">
                  <h4 className="text-md font-medium text-gray-600">
                    Suggestions
                  </h4>
                  <ul className="flex h-[550px] flex-col overflow-y-scroll">
                    {suggetion?.length > 0 &&
                      suggetion?.map((curItem, index) => {
                        return (
                          <li
                            key={index}
                            className="flex items-center gap-5 border-b border-gray-300 py-3"
                          >
                            <div>
                              <Link
                                href={`/podcast-detail/${curItem?.podcastId}`}
                              >
                                <img
                                  src={`${curItem?.imageUrl}`}
                                  alt=""
                                  className="h-24 w-24 rounded-lg"
                                />
                              </Link>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-gray-600">
                                <Link
                                  href={`/podcast-detail/${curItem?.podcastId}`}
                                >
                                  {curItem?.title}
                                </Link>
                              </h5>
                              <p className="text-sm text-gray-600">
                                By
                                <span className="text-xs font-medium text-gray-900">
                                  &nbsp; {curItem?.publisher}
                                </span>
                              </p>
                              <p className="pt-3 text-xs text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {curItem?.totalEpisodes} episode &nbsp;
                                </span>
                                <span>
                                  {curItem?.updateFrequencyHours} Hours
                                </span>
                              </p>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="container mx-auto">
          <div className="mx-auto mt-8 flex w-10/12 gap-x-5">
            <div className="w-8/12">No Record Found</div>
          </div>
        </section>
      )}
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

export default PodcastDetail;
