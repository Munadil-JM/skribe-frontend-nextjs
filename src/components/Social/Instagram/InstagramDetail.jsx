"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import parse from "html-react-parser";
import { Text } from "@visx/text";
import { scaleLog } from "@visx/scale";
import Wordcloud from "@visx/wordcloud/lib/Wordcloud";

import noUser from "../../assets/noUser.png";
import { instaDetail, searchByNames } from "../../../constants";
import userService from "../../../Services/user.service";
import { AreaChart } from "./AreaChart";
import PodcastTooltip from "../../Tooltip/PodcastTooltip";
import Spinner from "../../../Services/Spinner";
// import LockTooktip from "../../Tooltip/LockTooltip";
// import LockTooltip from "../../Tooltip/LockTooltip";

const InstagramDetail = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [influBio, setInfluBio] = useState([]);
  const [tags, setTags] = useState([]);
  const [brandMention, setBrandMention] = useState([]);
  const [growthData, setGrowthData] = useState([]);
  const [followData, setFollowData] = useState([]);
  const [words, setWords] = useState([]);

  //SEARCH API STORE INPUT DATA
  const [instaSearch, setInstaSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const [suggetion, setSuggetion] = useState([]);
  const suggestDD = useRef();
  const [storeId, setStoreId] = useState("");
  const router = useRouter();

  const fontScale = scaleLog({
    domain: [
      Math.min(...words.map((w) => w.value)),
      Math.max(...words.map((w) => w.value)),
    ],
    range: [10, 100],
  });

  const fontSizeSetter = (datum) => fontScale(datum.value);

  const colors = ["#143059", "#2F6B9A", "#82a6c2"];

  useEffect(() => {
    if (storeId) {
      setVisible(false);
      setInstaSearch("");
      router.push(`/insta-detail/${storeId}`);
    }
  }, [storeId]);
  //search by name in input search start
  const outSideClick = (e) => {
    if (suggestDD.current && !suggestDD.current.contains(e.target)) {
      setVisible(false);
      setInstaSearch("");
    }
  };

  useEffect(() => {
    window.addEventListener("click", outSideClick);
    return () => {
      document.removeEventListener("click", outSideClick);
    };
  });

  useEffect(() => {
    if (instaSearch?.length > 0) {
      const searchUrl = `${searchByNames}?srtxt=${instaSearch}`;
      let timer = setTimeout(() => {
        userService
          .get(searchUrl)
          .then((result) => {
            if (result?.response?.status === "Ok") {
              if (result?.data?.length > 0) {
                setSuggetion(result?.data);
                setVisible(true);
              } else {
                setSuggetion([{ fullname: "No Record Exist" }]);
              }
            }
          })
          .catch((error) => console.log(error, "check error"))
          .finally(() => {});
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    } else {
      setSuggetion("");
    }
  }, [instaSearch]);

  useEffect(() => {
    if (tags) {
      const words = tags.slice(1).map(([text, value]) => ({ text, value }));
      setWords(words);
    }
  }, [tags]);

  useEffect(() => {
    const url = `${instaDetail}?ID=${id}`; //347717746 //544032892 //1117796349
    setLoading(true);
    userService
      .get(url)
      .then((result) => {
        if (result?.response?.status === "Ok") {
          setInfluBio(result?.data?.influBio);
          setBrandMention(
            result?.data?.engagementBrandMention?.[0]?.brand_mentions
          );
          setGrowthData(result?.data?.engagementGrowthData);
          setFollowData(result?.data?.followData);
          setTags(result?.data?.tags);
        }
      })
      .catch((error) => console.log(error, "check error"))
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  // const goBack = () => {
  //   router.back();
  // };

  return (
    <div>
      <section
        className="sticky bottom-1 left-0 top-[64px] z-10 flex gap-x-8 bg-white"
        style={{ borderBottom: "1px solid rgb(209 213 219)" }}
      >
        <div className="section flex w-11/12 gap-x-6">
          <div className=" flex w-full flex-col flex-wrap gap-6 self-start">
            <div className="flex flex-wrap items-center justify-between bg-white p-3 pl-8 pr-0">
              <ul className="flex items-center gap-x-1 text-xs text-gray-400">
                <li className="flex items-center">
                  Social
                  <span className="material-icons-outlined b-font text-gray-400">
                    navigate_next
                  </span>
                </li>
                <li className="flex items-center">
                  Instagram
                  <span className="material-icons-outlined b-font text-gray-400">
                    navigate_next
                  </span>
                </li>
                <li className="flex items-center">Influencer Profile</li>
              </ul>
              {/* <h2 className="text-sm font-medium text-gray-600">
            All Journalists */}
              {/* {isdata?.total} */}
              {/* </h2> */}
              <div className="relative flex gap-x-3">
                <div className="flex items-center rounded-lg border border-gray-300 bg-white  pl-2">
                  <span className="material-icons-outlined text-sm text-gray-300">
                    search
                  </span>
                  <input
                    type="text"
                    className="text-sm w-full rounded-lg bg-white px-3 py-1 text-gray-400 focus:outline-none"
                    placeholder="Search By Name"
                    value={instaSearch}
                    onChange={(e) => setInstaSearch(e.target.value)}
                    //onKeyUp={optimizedSearchRecords}
                  />
                </div>
                {visible && (
                  <div
                    ref={suggestDD}
                    className="p-3 bg-white absolute right-0 top-[37px] w-full max-h-40 overflow-scroll overflow-x-hidden"
                  >
                    <ul>
                      {suggetion?.length > 0 &&
                        suggetion?.map((curItem, ind) => {
                          return (
                            <li key={ind}>
                              <Link
                                href=""
                                onClick={() => setStoreId(curItem.instagram_id)}
                                className="block p-2 border-b border-gray-200  hover:text-gray-700 hover:bg-gray-200 text-gray-500"
                              >
                                {curItem.fullname.slice(0, 1).toUpperCase()}
                                {curItem.fullname.slice(1).toLowerCase()}
                              </Link>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <header className="bg-[#F1F1E6]">
        {influBio?.length > 0 &&
          influBio?.map((curItem, index) => {
            return (
              <div key={index} className="container m-auto">
                <div className="flex gap-x-8 py-5">
                  <div className="w-1/12">
                    {/* <span
                      onClick={() => goBack()}
                      className="flex w-28 cursor-pointer items-center text-sm font-normal text-gray-700 hover:border-gray-400 hover:text-gray-800"
                    >
                      <span className="material-icons-outlined icon-16">
                        arrow_back_ios_new
                      </span>
                      Go Back
                    </span> */}
                  </div>
                  <div className="flex w-2/12 justify-end pt-4">
                    <div>
                      <img
                        src={
                          curItem?.profile_picture_url
                            ? curItem.profile_picture_url !== ""
                              ? curItem?.profile_picture_url
                              : noUser.src
                            : noUser.src
                        }
                        alt=""
                        className="h-32 w-32 rounded-full bg-[#F1F1E6] object-cover p-2 shadow-2xl"
                      />
                    </div>
                  </div>
                  <div className=" w-4/12 py-5 pb-16">
                    <h3 className="text-2xl font-bold leading-[22px] text-blue-950">
                      {curItem?.fullname === ""
                        ? "Name : N/A"
                        : curItem?.fullname}
                    </h3>
                    <Link
                      href={`https://www.instagram.com/${curItem?.instagram_username}`}
                      target="_blank"
                      className="text-sm text-gray-800"
                    >
                      Username :{" "}
                      {curItem?.instagram_username.slice(0, 1).toUpperCase()}
                      {curItem?.instagram_username.slice(1)}
                    </Link>
                    <ul className="flex flex-col gap-y-4 pt-2">
                      <li className="flex items-start gap-x-2">
                        <span className="material-icons-outlined text-gray-600">
                          place
                        </span>
                        <span className="text-gray-800">
                          {" "}
                          {curItem?.city}, {curItem?.country}
                        </span>
                      </li>
                      <li className="flex items-start gap-x-2">
                        <span className="material-icons-outlined text-gray-600">
                          person
                        </span>
                        <span className="text-gray-800">
                          {parse(curItem?.biography)}
                        </span>
                      </li>

                      <li className="flex items-start gap-x-2">
                        <span className="text-gray-600">Label</span>
                        <div className="flex gap-x-3 text-nowrap">
                          {curItem?.categories?.map((curCat, index) => {
                            return (
                              <span
                                key={index}
                                className="border border-gray-600 px-2 text-sm text-nowrap"
                              >
                                {curCat}
                              </span>
                            );
                          })}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
      </header>

      <section className="container mx-auto">
        <div className="-mt-14 flex gap-x-8">
          <div className="w-1/12"></div>
          <div className="flex w-2/12 justify-end pt-4"></div>
          <div className="w-8/12">
            {influBio?.length > 0 &&
              influBio?.map((curItem, index) => {
                return (
                  <ul key={index} className="grid grid-cols-4 gap-x-5">
                    <li className="flex flex-col bg-gray-100 p-4 shadow-xl shadow-gray-300">
                      <h3 className="flex items-center text-lg font-medium text-gray-500">
                        Followers &nbsp;
                        {/* <LockTooltip
                          left="-right-[25px]"
                          top="-top-[2px]"
                          leftPosition="-left-[0px]"
                          topPosititon="top-[38px]"
                          content="This is the total followers on this account."
                        /> */}
                        <PodcastTooltip content="This is the total followers on this account." />
                      </h3>
                      <span className="pt-2 text-2xl font-bold text-gray-500">
                        {curItem?.instagram_follower_count}
                      </span>
                      <span className="text-sm text-gray-500">Followers</span>
                    </li>
                    <li className="flex flex-col bg-gray-100 p-4 shadow-xl shadow-gray-300">
                      <h3 className="flex items-center text-lg font-medium text-gray-500">
                        Average Likes &nbsp;
                        <PodcastTooltip content="This is the average number of likes per post." />
                      </h3>
                      <span className="pt-2 text-2xl font-bold text-gray-500">
                        {curItem?.instagram_average_like}
                      </span>
                      <span className="text-sm text-gray-500">
                        Likes Per Post
                      </span>
                    </li>

                    <li className="flex flex-col bg-gray-100 p-4 shadow-xl shadow-gray-300">
                      <h3 className="flex items-start font-medium text-gray-500">
                        Average Comments &nbsp;
                        <PodcastTooltip content="This is the average number of comments per post." />
                      </h3>
                      <span className="pt-2 text-2xl font-bold text-gray-500">
                        {curItem?.instagram_average_comment}
                      </span>
                      <span className="text-sm text-gray-500">
                        Comments Per Post
                      </span>
                    </li>

                    <li className="flex flex-col bg-gray-100 p-4 shadow-xl shadow-gray-300">
                      <h3 className="flex items-center text-lg font-medium text-gray-500">
                        Engagement Rate &nbsp;
                        <PodcastTooltip content="Engagement Rate measures how actively followers are engaging with each post. The rate is calculated by getting the average interactions per post and then dividing this figure by the total reach on the account. The algorithm analyzes numerous posts on the account to find the average interactions (likes + comments)." />
                      </h3>
                      <span className="pt-2 text-2xl font-bold text-blue-500">
                        {curItem?.instagram_engagement_rate}
                      </span>
                      <span className="text-sm text-gray-500">
                        Percentage Average
                      </span>
                    </li>
                  </ul>
                );
              })}
            <div className="my-8 grid grid-cols-2 gap-5">
              <div className="bg-white shadow-xl">
                <h3 className="text-md flex items-center bg-gray-200 p-3 font-medium text-gray-500">
                  Engagemenst Over Time &nbsp;
                  <PodcastTooltip
                    content="Tracks the engagement rate over by 1w, 4w, 3m.This tool allows brands to track 
                                                that this account is maintaining a healthy engagement rate which is either growing 
                                                or declining. It also showcases spurts in engagement rate around certain event periods."
                  />
                </h3>
                <div className="flex h-64 items-center justify-center w-full">
                  {growthData?.length > 0 ? (
                    <AreaChart data={growthData} />
                  ) : (
                    "No data Available"
                  )}
                </div>
              </div>
              <div className="bg-white shadow-xl">
                <h3 className="text-md flex items-center bg-gray-200 p-3 font-medium text-gray-500">
                  Follower Growth &nbsp;
                  <PodcastTooltip content="Tracks the growth and/or decline of this account's followers over time by 1w, 4w, 3m." />
                </h3>
                <div className="flex h-64 items-center justify-center w-full text-center">
                  {followData?.length > 0 ? (
                    <AreaChart data={followData} />
                  ) : (
                    "No data Available"
                  )}
                </div>
              </div>

              <div className="bg-white shadow-xl">
                <h3 className="text-md flex items-center bg-gray-200 p-3 font-medium text-gray-500">
                  Brand Mention &nbsp;
                  <PodcastTooltip content="This shows Brands which have been mentioned by the account. Credible brands being mentioned indicates the account has been working with other brands and is a healthy influencer choice. Influencers also tag brands who they'd like to show their content to which could indicate quality content creation." />
                </h3>
                <div className="flex h-64 items-center justify-center">
                  <div className="overflow-x-hidden overflow-scroll h-64 p-4 pr-0 w-full">
                    <table
                      cellPadding="0"
                      cellSpacing="3"
                      border="0"
                      width="100%"
                    >
                      <tbody>
                        {brandMention?.length > 0 ? (
                          brandMention?.map((curItem, ind) => {
                            return (
                              <tr
                                key={ind}
                                className="border-b  border-gray-300"
                              >
                                <td width="80" valign="top" className="py-3">
                                  <Link
                                    href={`https://www.instagram.com/${curItem?.instagram_username}`}
                                  >
                                    <img
                                      src={curItem?.profile_picture_url}
                                      className="w-[64px] h-[64px] rounded-full self-start"
                                    />
                                  </Link>
                                </td>
                                <td width="140" valign="top" className="py-3">
                                  <Link
                                    target="_blank"
                                    href={`https://www.instagram.com/${curItem?.instagram_username}`}
                                    className="text-blue-600 font-semibold"
                                  >
                                    @{curItem?.instagram_username}
                                  </Link>
                                  <br />
                                  <span className="font-semibold text-gray-500 text-sm">
                                    Mentions: {curItem?.mentions_count}
                                  </span>
                                </td>
                                <td className="py-3 text-gray-500">
                                  {curItem?.biography}
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td className="text-center">No Data Available</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-xl">
                <h3 className="text-md flex items-center bg-gray-200 p-3 font-medium text-gray-500">
                  Hash Tags &nbsp;
                  <PodcastTooltip content="The hashtags that this account uses measured by occurrences." />
                </h3>
                <div className="flex h-64 items-center justify-center w-full text-center">
                  {words?.length > 0 ? (
                    <Wordcloud
                      words={words}
                      width={350}
                      height={250}
                      padding={2}
                      spiral={"archimedean"}
                      fontSize={fontSizeSetter}
                      rotate={0}
                      font={"Impact"}
                      random={Math.random}
                    >
                      {(cloudWords) =>
                        cloudWords.map((w, i) => (
                          <Text
                            key={i}
                            fill={colors[i % colors.length]}
                            textAnchor={"middle"}
                            transform={`translate(${w.x}, ${w.y})`}
                            fontSize={w.size}
                            fontFamily={w.font}
                          >
                            {w.text}
                          </Text>
                        ))
                      }
                    </Wordcloud>
                  ) : (
                    "No Data Available"
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {loading && (
          <div>
            <div className="opegue-4 fixed inset-0 z-50  max-h-screen bg-gray-600">
              <div className="lft50 absolute">
                <Spinner status={true} />
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default InstagramDetail;
