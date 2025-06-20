"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Portfolio from "./Portfolio";
import BehavioralPattern from "./BehavioralPattern";
import { useJournalistProfile } from "../utils/useJournalistProfile";
// import { GETEMAILQUOTA } from "../../constants";
import PitchAList from "../Campaign/PitchAList";
// import userService from "../../Services/user.service";
import "../Dashboard/TrendingJournalist.css";
import BuildCampaign from "../Campaign/BuildCampaign";
import JournalistSugg from "./JournalistSugg";
import JournalistInfo from "./JournalistInfo";
import PostInCrm from "../MyCRM/PreConfigCRM/PostInCrm";
import tokenService from "../../Services/token.service";
import { useNotification } from "../ErrorAlert/ErrorContextNotification";
import useEmailQuota from "../utils/useEmailQuota";

const SmartProfile = ({ id }) => {
  const {
    journalistProfileData,
    isLoadingJournalistProfile,
    journalistProfileError,
  } = useJournalistProfile(id);

  const { showNotification } = useNotification();
  // const success = (msg, type) => showNotification(msg, type);
  // const warning = (msg, type) => showNotification(msg, type);
  const error = (msg, type) => showNotification(msg, type);

  useEffect(() => {
    if (journalistProfileError === "No Content") {
      error("Please enter valid journalist id", "error");
    }
  }, [journalistProfileError]);

  const [isOpen, setIsOpen] = useState(false);
  const [workEmail, setWorkEmail] = useState();
  const [personalEmail, setPersonalEmail] = useState();
  const [phone, setPhone] = useState("");
  // const [quotaAdded, setQuotaAdded] = useState("");
  // const [remainingQuota, setRemainingQuota] = useState(0);
  // const [monthlyEMailQuota, setMonthlyEmailQuota] = useState("");
  // const [usedQuota, setUsedQuota] = useState("");
  // const [totalQuota, setTotalQuota] = useState("");
  // const [emailQuotaStatus, setEmailQuotaStatus] = useState(false);
  const [isOpenCampaign, setIsOpenCampaign] = useState(false);
  const [selectedJournalists, setSelectedJournalists] = useState([id]);
  const [pathList, setPathList] = useState([]);
  const [trackingId, setTrackingId] = useState();

  const { journoInfo = {} } = journalistProfileData || {};
  const [roleType, setRoleType] = useState(tokenService.getLocalRole());
  // const handleShare = (url) => {
  //   if (navigator.share) {
  //     navigator
  //       .share({
  //         title: "Check out this article!",
  //         url: url,
  //       })
  //       .then(() => console.log("Article shared successfully"))
  //       .catch((error) => console.error("Error sharing article:", error));
  //   } else {
  //     console.warn("Web Share API is not supported in your browser.");
  //   }
  // };

  // const getMailQuota = () => {
  //   // setEmailQuotaStatus(true);
  //   userService
  //     .get(GETEMAILQUOTA)
  //     .then((result) => {
  //       if (result?.response?.status === "Ok") {
  //         // setQuotaAdded(result?.data?.emailQuotaAddOn);
  //         // setRemainingQuota(result?.data?.remainingQuota);
  //         // setMonthlyEmailQuota(result?.data?.monthalyEmailQuota);
  //         // setTotalQuota(result?.data?.totalQuota);
  //         // setUsedQuota(result?.data?.usedQuota);
  //       }
  //     })
  //     .catch((error) => {
  //       alert(error?.message);
  //     })
  //     .finally((result) => {
  //       // setEmailQuotaStatus(false);
  //     });
  // };

  const {
    // quotaAdded,
    remainingQuota,
    // monthlyEMailQuota,
    // usedQuota,
    // totalQuota,
    // emailQuotaStatus,
  } = useEmailQuota();
  // useEffect(() => {
  //   const email = journoInfo?.contactDetails?.find(
  //     (item) => item.type === "Work Email"
  //   )?.value
  //     ? journoInfo?.contactDetails?.find((item) => item.type === "Work Email")
  //         ?.value
  //     : journoInfo?.contactDetails?.find(
  //         (item) => item.type === "Personal Email"
  //       )?.value;
  //   if (email) {
  //     setEmail(email);
  //   }

  //   const phone = journoInfo?.contactDetails?.find(
  //     (item) => item.type === "Mobile"
  //   )?.value
  //     ? journoInfo?.contactDetails?.find((item) => item.type === "Mobile")
  //         ?.value
  //     : journoInfo?.contactDetails?.find((item) => item.type === "Phone")
  //         ?.value;

  //   if (phone) {
  //     setPhone(phone);
  //   }
  // }, [journoInfo, setEmail]);

  useEffect(() => {
    if (!journoInfo?.contactDetails) return;

    // pull out the values once to avoid multiple .find calls
    const work = journoInfo.contactDetails.find(
      (item) => item.type === "Work Email"
    )?.value;

    const personal = journoInfo.contactDetails.find(
      (item) => item.type === "Personal Email"
    )?.value;

    const mobile = journoInfo.contactDetails.find(
      (item) => item.type === "Mobile"
    )?.value;

    const landline = journoInfo.contactDetails.find(
      (item) => item.type === "Phone"
    )?.value;

    // update state only when necessary
    if (work) setWorkEmail(work);
    if (personal) setPersonalEmail(personal);
    if (mobile || landline) setPhone(mobile ?? landline);
  }, [journoInfo]);

  useEffect(() => {
    const route = localStorage.getItem("previousRoute");

    if (route) {
      switch (true) {
        case /\/journalist-search/.test(route):
          setPathList(["Home", "Journalist Search"]);
          break;

        case /\/dashboard/.test(route):
          setPathList(["Home", "Journalist Profile"]);
          break;

        case new RegExp(`/journalist-profile/${id}`).test(route):
          setPathList(["Smart Profile"]);
          break;

        case /\/twitter/.test(route):
          setPathList(["Home", "Social", "Twitter"]);
          break;

        default:
          if (route.includes("/journalist-profile")) {
            setPathList(["Smart Profile", "Suggested Journalist"]);
          } else {
            console.log("No match found");
          }
          break;
      }
    } else {
      console.log("No route found in localStorage");
    }
  }, [id]);

  useEffect(() => {
    setTrackingId(generateUUID());
  }, []);

  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  return (
    <div className="min-h-screen font-poppins">
      <div className="px-8 py-3 xl:w-11/12 w-12/12 xl:pl-8 section">
        <div className="flex flex-col justify-between mx-2 md:items-center md:mx-10 md:flex-row">
          <ul className="flex items-center text-xs text-gray-400 gap-x-1">
            <li className="flex items-center">
              <Link href="/dashboard">Home</Link>

              <span className="items-center text-gray-400 material-icons-outlined b-font">
                navigate_next
              </span>
            </li>
            <li>Journalist Profile</li>
          </ul>
          <div className="flex justify-start gap-2 mt-4 md:mt-0">
            {roleType?.includes("Freebies") &&
            remainingQuota > 0 &&
            journalistProfileData?.journoInfo?.shutShop?.id !== 64 ? (
              journalistProfileData?.journoInfo?.contactDetails?.length > 0 &&
              journalistProfileData?.journoInfo?.contactDetails?.some(
                (record) =>
                  record?.type === "Work Email" ||
                  record?.type === "Personal Email"
              ) ? (
                <div
                  className="flex cursor-pointer items-center py-1 px-3 text-white bg-[#fac540] rounded-[5px] border-[#002b5b]"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  <span className="icon-20 font-[300] text-white material-icons-outlined">
                    mail
                  </span>
                </div>
              ) : (
                <div className="flex items-center py-1 px-3 text-white bg-gray-400 rounded-[5px] border-[#333333]">
                  <span className="icon-20 font-[300] text-white material-icons-outlined">
                    mail
                  </span>
                </div>
              )
            ) : !roleType?.includes("Freebies") &&
              remainingQuota > 0 &&
              journalistProfileData?.journoInfo?.shutShop?.id !== 64 &&
              journalistProfileData?.journoInfo?.contactDetails?.length > 0 &&
              journalistProfileData?.journoInfo?.contactDetails?.some(
                (record) =>
                  record?.type === "Work Email" ||
                  record?.type === "Personal Email"
              ) ? (
              <div
                className="flex cursor-pointer items-center py-1 px-3 text-[#002b5b] bg-[#fac540] rounded-[5px] border-[#333333]"
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                <span className="icon-20 font-[300] text-[#002b5b] material-icons-outlined">
                  mail
                </span>
              </div>
            ) : (
              <div className="flex items-center py-1 px-3 text-white bg-gray-400 rounded-[5px] border-[#333333]">
                <span className="icon-20 font-[300] text-white material-icons-outlined">
                  mail
                </span>
              </div>
            )}

            {/* <div
              className="py-2 px-4 rounded-[5px] border-[#333333] border-[1px] flex justify-center items-center"
              onClick={() => handleShare(journoInfo?.authorUrl)}
            >
              <span className="icon-20 font-[300] text-[#333333] material-icons-outlined">
                share
              </span>
            </div> */}
            {!isLoadingJournalistProfile &&
              !journalistProfileData?.journoInfo?.crmStatus &&
              journalistProfileError === null && (
                <input
                  type="button"
                  value="Add To CRM"
                  // disabled={selectedJournalists.length > 5 && true}
                  className="flex cursor-pointer items-center whitespace-nowrap rounded-[5px] border border-[#002b5b]  px-3 py-1 text-xs  text-[#002b5b]"
                  // href="/customcrm"
                  onClick={() =>
                    PostInCrm(selectedJournalists, showNotification)
                  }
                />
              )}
            {journalistProfileError === null && (
              <div
                className="cursor-pointer py-1 px-4 rounded-[5px] border-[#002b5b] border-[1px] flex justify-center items-center text-xs text-[#002b5b]"
                onClick={() => setIsOpenCampaign(!isOpenCampaign)}
              >
                Create List
              </div>
            )}
          </div>
        </div>
      </div>
      <hr className="mb-4 text-black/10" />
      <div className="px-8 pb-4 mt-2 xl:w-11/12 w-12/12 xl:pl-8 section">
        <div className="flex flex-col mx-2 md:mx-10"></div>
      </div>
      <div className="px-8 pb-6 xl:w-11/12 w-12/12 xl:pl-8 section">
        <div className="flex flex-col mx-2 md:mx-10 xl:flex-row gap-y-4 xl:gap-4 xl:mt-0">
          <div className="border border-black/10 rounded-[10px] mb-4 bg-white  xl:w-2/3">
            {isLoadingJournalistProfile ? (
              <div className="px-4">
                <Skeleton height={450} />
              </div>
            ) : (
              <>
                <JournalistInfo
                  journalistProfileData={journalistProfileData}
                  email={workEmail}
                  personal={personalEmail}
                  phone={phone}
                />
              </>
            )}
          </div>
          <div className="border border-black/10 rounded-[10px] mb-4 bg-white py-8 xl:w-1/3">
            <JournalistSugg id={id} />
          </div>
        </div>

        {isOpen && (
          <PitchAList
            open={isOpen}
            onClose={() => setIsOpen(false)}
            selectedList={id}
            // emailBalance={remainingQuota}
            emailId={workEmail}
            // getMail={getMailQuota}
          />
        )}
        {isOpenCampaign && (
          <BuildCampaign
            open={isOpenCampaign}
            onClose={() => setIsOpenCampaign(false)}
            selectedJournalists={selectedJournalists}
            selectAllLabel="Select All"
          />
        )}
      </div>
      <div className="px-8 pb-6 xl:w-11/12 w-12/12 xl:pl-8 section ">
        <BehavioralPattern id={id} />
        <Portfolio id={id} />
      </div>
    </div>
  );
};

export default SmartProfile;
