"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SummaryRecord from "./SummaryRecord";
import userService from "../../../Services/user.service";
import {
  DELETE_CAMPAIGN,
  GETEMAILQUOTA,
  GET_ALL_CAMPAIGNS,
} from "../../../constants";
import { useNotification } from "../../ErrorAlert/ErrorContextNotification";

const CampaignSummary = () => {
  const { showNotification } = useNotification();
  const success = (msg, type) => showNotification(msg, type);
  // const warning = (msg, type) => showNotification(msg, type);
  const error = (msg, type) => showNotification(msg, type);
  const [allCampaign, setAllCampaign] = useState([]);
  const [campaignData, setCampaignData] = useState([]);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Remaining email quota
  const [remainingQuota, setRemainingQuota] = useState("");

  // Search input state
  const [searchInput, setSearchInput] = useState("");
  const [noRecord, setNoRecord] = useState(false);

  let url = `${GET_ALL_CAMPAIGNS}?pageSize=20`;

  // Fetch campaigns
  const getCampaign = () => {
    setIsLoading(true);
    userService
      .get(url)
      .then((data) => {
        if (data?.response?.status === "Ok") {
          setAllCampaign((prev) => {
            if (allCampaign?.length > 0) {
              return [...prev, ...data?.campaigns];
            }
            return [...data?.campaigns];
          });
          setCampaignData((prev) => {
            if (campaignData?.length > 0) {
              return [...prev, ...data?.campaigns];
            }
            return [...data?.campaigns];
          });
          // setAllCampaign((prevCampaigns) => [
          //    ...prevCampaigns,
          //   ...data?.campaigns,
          // ]);
          // setCampaignData((prevCampaigns) => [
          //    ...prevCampaigns,
          //   ...data?.campaigns,
          // ]);
          setToken(data?.nextPageToken?.token || null);
        }
      })
      .catch((errors) => {
        error(errors, "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Fetch remaining email quota
  const getMailQuota = () => {
    userService
      .get(GETEMAILQUOTA)
      .then((result) => {
        if (result?.response?.status === "Ok") {
          setRemainingQuota(result?.data?.remainingQuota);
        }
      })
      .catch((errors) => {
        error(errors?.message, "error");
      });
  };

  // Search campaign
  const searchCampaign = (value) => {
    const filteredCampaigns = campaignData.filter((campaign) =>
      campaign?.vchCampaignName.toLowerCase().includes(value.toLowerCase())
    );
    setAllCampaign(filteredCampaigns);
    setNoRecord(filteredCampaigns.length === 0);
  };

  // Handle deletion of a campaign
  const deleteCamp = (campId) => {
    const deleteURL = `${DELETE_CAMPAIGN}?CampId=${campId}`;
    userService
      .delete(deleteURL)
      .then((data) => {
        if (data?.response?.status === "Success") {
          success("Campaign Deleted successfully", "success");
          const updatedCampaigns = allCampaign.filter(
            (campaign) => campaign?.bgintcampid !== campId
          );
          setAllCampaign(updatedCampaigns);
        }
      })
      .catch((errors) => {
        error(error?.message, "error");
      });
  };

  // Load more campaigns when scrolling
  const handleScroll = () => {
    if (token !== "") {
      url = `${url}&token=${encodeURIComponent(token)}`;
      getCampaign();
    }
  };

  // Fetch initial data
  useEffect(() => {
    getMailQuota();
    getCampaign();
  }, []);

  // Update search on input change
  useEffect(() => {
    searchCampaign(searchInput);
  }, [searchInput]);
  // console.log(moreDetail, "check... more........");
  // console.log(new Date(), "check................");
  return (
    <>
      <section className="sticky top-[64px] z-10 bg-white border-b border-b-black/10">
        <div className="flex justify-between p-3 pl-8">
          <ul className="flex items-center text-xs text-gray-400 gap-x-1">
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

      <div className="w-11/12 p-6 pb-0 pl-8 pr-0">
        <section>
          <div className="flex justify-between mb-4">
            <div className="flex">
              <Link
                href="/create-campaign"
                className="border hover:bg-gray-200 border-gray-400 flex items-center px-3 gap-x-1 py-1 rounded-md text-sm text-gray-600"
              >
                <span className="material-icons-outlined text-sm text-gray-600">
                  add
                </span>
                New Campaign
              </Link>
              {/* {!isLoading && allCampaign.length === 0 && ( )} */}
            </div>

            <div className="flex gap-x-2 items-center">
              <div className="flex items-center rounded-lg border border-gray-300 bg-white pl-2">
                <span className="material-icons-outlined text-sm text-gray-300">
                  search
                </span>
                <input
                  type="search"
                  className="text-sm w-full rounded-lg bg-white px-3 py-1 text-gray-400 focus:outline-none"
                  placeholder="Search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              {/* <span className="material-icons-outlined icon-35 text-gray-500">
                filter_alt
              </span> */}
            </div>
          </div>
        </section>
      </div>

      <div className="w-11/12 p-6 py-6 pt-0 pl-8 pr-0">
        <section className="border border-gray-300 mt-4 rounded-lg p-3">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl text-gray-800 font-semibold">
              Campaign Summary
            </h2>
            {!isLoading && allCampaign.length > 0 && (
              <div
                className={`${
                  remainingQuota < 100
                    ? "bg-red-500 border-red-400 text-white"
                    : "bg-gray-200 border-gray-400 text-gray-500 "
                } border px-3  rounded-md text-xs flex items-center`}
              >
                {remainingQuota} Emails Left
              </div>
            )}
          </div>

          {!isLoading && allCampaign.length > 0 ? (
            <div className="max-h-[900px] overflow-scroll overflow-x-hidden">
              {allCampaign.map((curItem, index) => (
                <SummaryRecord
                  key={index}
                  allData={curItem}
                  isLoading={isLoading}
                  deleteCampaign={deleteCamp}
                />
              ))}
              {token && !searchInput?.length > 0 && (
                <div className="flex items-center">
                  {isLoading ? (
                    <span className="mx-auto my-5 rounded-md bg-gray-500 px-3 py-2 text-sm font-normal text-white">
                      Loading...
                    </span>
                  ) : (
                    <span
                      onClick={handleScroll}
                      className="cursor-pointer mx-auto my-5 rounded-md bg-[#002b5b] px-3 py-2 text-xs font-normal text-white"
                    >
                      Load more
                    </span>
                  )}
                </div>
              )}
            </div>
          ) : !isLoading && allCampaign.length === 0 ? (
            <div className="text-center text-gray-500 mt-5">
              No records found.
            </div>
          ) : isLoading ? (
            "Loading..."
          ) : (
            <main className="container mx-auto">
              <section className="w-8/12 flex flex-col mx-auto px-4 rounded-lg mt-36">
                <h3 className="text-center text-3xl font-semibold text-gray-900">
                  Ready to Launch Your Next Big Campaign? 🚀
                </h3>
                <p className="text-center text-3xl font-bold text-gray-500">
                  Let’s get your message in front of the right people.
                </p>
                <Link
                  href="/create-campaign"
                  className="border bg-purple-700 flex items-center gap-x-1 rounded-md self-center py-3 px-9 text-white mt-5 text-2xl"
                >
                  <span className="material-icons-outlined icon-30 text-white">
                    add
                  </span>
                  New Campaign
                </Link>
              </section>
            </main>
          )}
        </section>
      </div>
    </>
  );
};

export default CampaignSummary;
