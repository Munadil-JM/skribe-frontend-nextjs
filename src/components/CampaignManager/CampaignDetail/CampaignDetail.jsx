"use client";

import { useEffect, useState } from "react";
import CampaignStats from "./CampaignStats";
import userService from "../../../Services/user.service";
import {
  CAMPAIGN_STATS,
  CAMPAIGN_TRACKING,
  GET_CAMPAIGN_KEYWORD,
} from "../../../constants";
import CampaignArticles from "./CampaignArticles";
import Link from "next/link";
import { useNotification } from "../../ErrorAlert/ErrorContextNotification";

//{ campaignId = 224134 }
const CampaignDetail = ({ campId }) => {
  const { showNotification } = useNotification();
  // const success = (msg, type) => showNotification(msg, type);
  const warning = (msg, type) => showNotification(msg, type);
  const error = (msg, type) => showNotification(msg, type);
  const [campaignStats, setCampaignStats] = useState({}); // Initialize with an empty object
  const [campaignKeyword, setCampaignKeyword] = useState({});
  const [topics, setTopics] = useState([]);

  const [graphData, setGraphData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setError] = useState();

  const url = `${CAMPAIGN_STATS}?IntCampListId=${campId}`;
  const url1 = `${CAMPAIGN_TRACKING}?CampId=${campId}`;
  const url2 = `${GET_CAMPAIGN_KEYWORD}?CampaignId=${campId}`;

  // let campaignTracking = userService.get(url1);
  // let campKeyword = userService.get(url2);
  const campStats = () => {
    setIsLoading(true);
    setError(null); // Reset any previous errors
    userService
      .get(url)
      .then((stats) => {
        if (stats?.response?.status === "Ok") {
          setCampaignStats(stats.data || {}); // Ensure we always set an object
          setIsLoading(false);
        } else {
          warning("Failed to fetch data for campaign Stats.", "warning");
        }
      })
      .catch((errors) => {
        if (errors?.response?.data?.status === "Error") {
          error("Invalid campaign list iD for Stats", "error");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    // const [data, data1, data2, data3] = await Promise.all([
    //   userService.get(url1),
    //   userService.get(url2),
    // ]);

    // if (data1?.response?.status === "Ok") {
    //   setGraphData(data1?.data);
    // }
    // if (data1?.response?.status === "NoData") {
    //   setGraphData(null);
    // }
    // if (data2?.status === "Success") {
    //   setCampaignKeyword(data2.data);
    // }
    // if (data3?.response?.status === "Ok") {
    //   setTopics(data3.data);
    // }
  };
  const campaignTracking = () => {
    setIsLoading(true);
    setError(null); // Reset any previous errors
    userService
      .get(url1)
      .then((tracking) => {
        if (tracking?.response?.status === "Ok") {
          setGraphData(tracking?.data);
        } else if (tracking?.response?.status === "NoData") {
          warning("No data available for campaign tracking", "warning");
        } else if (tracking?.response?.status === "No Keyword") {
          warning("No Keyword Found For this Campaign", "warning");
        } else if (tracking?.response?.status === "Failed") {
          warning("No Keyword Found For this Campaign", "warning");
        } else {
          warning("Failed to fetch campaign tracking", "warning");
        }
      })
      .catch((errors) => {
        if (errors?.response?.data?.response?.status === "Failed") {
          error("Campaign ID  does not exist for Tracking", "error");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const campKeyword = () => {
    setIsLoading(true);
    setError(null); // Reset any previous errors
    userService
      .get(url2)
      .then((campKeyword) => {
        if (campKeyword?.status === "Success") {
          setCampaignKeyword(campKeyword?.data);
        } else if (campKeyword?.response?.status === "Failed") {
          warning("Campaign id does not exist", "warning");
        } else if (campKeyword?.response?.status === "No Keyword") {
          warning("No Keyword Found For this Campaign", "warning");
        } else {
          warning("Failed to fetch campaign detail", "warning");
        }
      })
      .catch((errors) => {
        if (errors?.response?.data?.response?.status === "Failed") {
          error(errors?.response?.data?.response?.message, "error");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    campStats();
    campaignTracking();
    campKeyword();
  }, [campId]); // Re-fetch data when campaignId changes

  return (
    <>
      <section
        className="sticky bottom-1 left-0 top-[64px] z-10 flex gap-x-8 bg-white"
        style={{ borderBottom: "1px solid rgb(209 213 219)" }}
      >
        <div className="flex flex-wrap items-center justify-between bg-white p-3 pl-8 pr-0">
          <ul className="flex items-center gap-x-1 text-sm text-gray-400">
            <li className="flex items-center">
              Home
              <span className="material-icons-outlined b-font text-gray-400">
                navigate_next
              </span>
            </li>
            <li className="flex items-center">Campaign Summary</li>
          </ul>
        </div>
      </section>
      <div className="w-11/12 pb-6 py-6 pt-0 pr-0 section mx-auto">
        <div className="mt-4">
          <Link
            className="flex items-center text-gray-600 gap-x-1 mb-6 text-sm"
            href="/campaign-summary"
          >
            <span className="material-icons-outlined icon-16 text-gray-400 ">
              arrow_back_ios_new
            </span>{" "}
            Back
          </Link>
        </div>
        <section className="border border-gray-300 mt-4 rounded-lg p-3">
          {/* {errors && <div className="text-red-500">{errors}</div>} */}

          {Object?.keys(campaignStats)?.length > 0 && (
            <CampaignStats data={campaignStats} graphData={graphData} />
          )}

          {/* {Object?.keys(campaignStats)?.length === 0 &&
            !isLoading &&
            !error && <div>No campaign stats available.</div>} */}

          <CampaignArticles
            campaignId={campId}
            topics={topics}
            brandKeywords={campaignKeyword}
            campCreatedDate={campaignStats?.campaign?.dtCampsentdate}
          />
        </section>
      </div>
    </>
  );
};

export default CampaignDetail;
