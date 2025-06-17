"use client";

import axios from "axios";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { MdOutlineCopyAll } from "react-icons/md";
import { useRef, useEffect, useState } from "react";
import noUser from "../assets/noUser.png";
import BuildCampaign from "../Campaign/BuildCampaign";
import tokenService from "../../Services/token.service";
import { baseURL, PRECRM_POSTDATA } from "../../constants";
import { useNotification } from "../ErrorAlert/ErrorContextNotification";
import PitchAList from "../Campaign/PitchAList";

const ProfileCard = ({ data, close }) => {
  const profileSidebarRef = useRef(null);
  const { showNotification } = useNotification();
  const { journoInfo, journCarrerSum, journoSocial } = data;
  const [isMediaListDialogOpen, setIsMediaListDialogOpen] = useState(false);
  const [isPitchDialogOpen, setIsPitchDialogOpen] = useState(false);

  const contactDetails = [
    {
      id: 1,
      name: "Mobile",
      value: journoInfo?.contactDetails?.find((i) => i.type === "Mobile")
        ?.value,
      imageSrc: "/assets/adv-search-profile-call.png",
    },
    {
      id: 2,
      name: "Personal Email",
      value: journoInfo?.contactDetails?.find(
        (i) => i.type === "Personal Email"
      )?.value,
      imageSrc: "/assets/adv-search-profile-mail.png",
    },
    {
      id: 3,
      name: "Work Email",
      value: journoInfo?.contactDetails?.find((i) => i.type === "Work Email")
        ?.value,
      imageSrc: "/assets/adv-search-profile-mail.png",
    },
  ];

  const addToCRM = async () => {
    const { id } = JSON.parse(localStorage.getItem("userInfo"));

    try {
      const res = await axios.post(
        PRECRM_POSTDATA,
        {
          clientId: 0,
          userId: id,
          jourId: [journoInfo?.journalistId],
        },
        {
          headers: {
            Authorization: `Bearer ${tokenService.getLocalAccessToken()}`,
          },
        }
      );

      if (res.data?.response?.status === "ReachedLimit") {
        showNotification(
          "CRM account limit reached. You cannot add more than 50 journalists into your CRM",
          "warning"
        );
      } else if (res.data?.response?.status === "Ok") {
        showNotification(
          `Added ${res.data?.insertedCount} journalist to your CRM!`,
          "success"
        );
      }
    } catch (err) {
      console.error(
        "Error while adding Journalist to CRM from Profile Sidebar in Advance Search: ",
        err
      );
    }
  };

  const handleAddToMediaList = () => {
    setIsMediaListDialogOpen(true);
    document.body.classList.add("overflow-hidden");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileSidebarRef.current &&
        !profileSidebarRef.current.contains(e.target)
      ) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section
      ref={profileSidebarRef}
      className="fixed right-0 top-0 z-[501] h-dvh w-full sm:w-[50%] lg:w-[30%] bg-white border border-[#E8E8E8] flex flex-col"
    >
      <section className="p-4 overflow-y-auto scroll-smooth pb-20">
        {/* Header */}
        <div className="flex items justify-between gap-5">
          <div className="flex gap-3 items-center">
            <img
              src={
                journoInfo?.photo !== ""
                  ? baseURL + journoInfo?.photo
                  : noUser.src
              }
              alt=""
              width={65}
              height={65}
              className="rounded-full aspect-square"
            />

            <div className="flex flex-col">
              <span className="text-[#002B5B] font-semibold">
                {journoInfo?.journalistName}
              </span>

              <span className="text-black/50 text-xs font-medium">
                <span className="text-black">
                  {journoInfo?.journoTitle?.value}
                </span>
                {", "}
                {journoInfo?.outlets?.[0]?.outletName}
              </span>

              <div className="flex gap-1 items-center">
                <img
                  src="/assets/adv-search-location.png"
                  alt="Advance Search - Location icon"
                  width={15}
                  height={15}
                  className="-ml-[2px] opacity-50"
                />

                <p className="text-black/50 text-xs mt-[1px] font-medium">
                  {journoInfo?.city?.[0]?.city
                    .toLowerCase()
                    .split(" ")
                    .map((i) => i.charAt(0).toUpperCase() + i.slice(1))
                    .join(" ")}
                </p>
              </div>
            </div>
          </div>

          <IoMdClose onClick={close} className="cursor-pointer" size={25} />
        </div>

        {/* Beats */}
        <p className="flex flex-wrap gap-2 mt-2">
          <span className="text-sm text-black font-medium mr-2">Beats:</span>

          {journoInfo?.beat?.map((item, index) => (
            <span
              key={index}
              className="bg-[#F1F1E6] text-black/40 text-xs -mt-[2px] px-2 py-1 rounded-[4px]"
            >
              {item?.beatName}
            </span>
          ))}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <button
            type="button"
            className="flex items-center whitespace-nowrap gap-1 cursor-pointer border border-[#01438D] bg-white text-[#01438D] py-1 px-2 rounded-[4px] text-xs"
            onClick={addToCRM}
          >
            <img
              src="/assets/adv-search-bookmark.png"
              alt="Advance Search - Bookmark icon"
              width={18}
              height={18}
            />
            Add to CRM
          </button>

          <button
            type="button"
            className="bg-white p-1 rounded-[4px] cursor-pointer text-sm border border-[#01438D]"
            onClick={() => {
              setIsPitchDialogOpen(true);
              document.body.classList.add("overflow-hidden");
            }}
          >
            <img
              src="/assets/adv-search-mail.png"
              width={18}
              height={18}
              alt="Advance Search - Mail icon"
            />
          </button>

          <button
            type="button"
            className="flex gap-1 items-center cursor-pointer whitespace-nowrap py-1 px-2 rounded-[4px] border border-[#01438D] bg-[#01438D] text-white text-xs"
            onClick={handleAddToMediaList}
          >
            <img
              src="/assets/adv-search-addtomedialist.webp"
              alt="Advance Search - Add to MediaList icon"
              width={18}
              height={18}
            />
            Add to Media List
          </button>
        </div>

        {/* Contact */}
        <div className="mt-3">
          <span className="font-semibold underline text-xs text-black/70">
            Contact Details:
          </span>

          {contactDetails.map((contact) => {
            return (
              <div
                key={contact.id}
                className={`mt-2 items-center gap-2 ${contact.value ? "flex" : "hidden"}`}
              >
                <img
                  src={contact.imageSrc}
                  alt={`Advance Search Profile - ${contact.name} Icon`}
                  width={19}
                  height={19}
                />

                <span className="text-sm text-black/70">{contact.value}</span>

                <MdOutlineCopyAll
                  size={19}
                  className="text-black/40 cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(contact.value);
                    showNotification(
                      "Copied the contact in your clipboard successfully",
                      "success"
                    );
                  }}
                />
              </div>
            );
          })}

          <div className="flex items-center gap-2 mt-2 ml-[1px]">
            <Link href={`${journoSocial?.vchLinkedinLink}`} target="_blank">
              <img
                src="/assets/adv-search-profile-linkedin.png"
                alt="Advance Search Profile - Linkedin Logo"
                width={18}
                height={18}
              />
            </Link>

            <Link
              href={`https://x.com/${journoSocial?.vchTwitter}`}
              target="_blank"
            >
              <img
                src="/assets/adv-search-profile-x.png"
                alt="Advance Search Profile - X Logo"
                width={17}
                height={17}
              />
            </Link>
          </div>
        </div>

        {/* Career Summary */}
        <ul className="mt-8">
          {[...journCarrerSum]?.reverse().map((career, index) => {
            return (
              <li
                key={index}
                className="mb-2 pl-4 leading-4 relative before:w-2 before:h-2 before:top-1 before:-left-0 before:rounded-full before:content-[''] before:first:bg-[#FFDB43] before:bg-[#BBBBBB] before:absolute after:w-[1px] after:h-full after:content-[''] after:bg-[#D2D2D2] after:last:bg-white after:absolute after:left-[3.5px] after:top-[12px]"
              >
                <h4 className="text-[#002B5B] text-sm font-medium">
                  {career?.description}
                </h4>

                <span className="text-xs text-[#777777]">
                  {`${career?.company} ${career?.year} - ${career?.toYear}`}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="bg-[#F5F5F5] absolute bottom-0 flex justify-start w-full p-4 border border-[#E8E8E8]">
        <Link
          className="bg-[#002B5B] text-white rounded-[4px] p-2 text-sm"
          href={`/journalist-profile/${journoInfo?.journalistId}`}
          target="_blank"
        >
          View Smart Profile
        </Link>
      </div>

      {isMediaListDialogOpen && (
        <BuildCampaign
          onClose={() => {
            setIsMediaListDialogOpen(false);
            document.body.classList.remove("overflow-hidden");
          }}
          open={isMediaListDialogOpen}
          selectAllLabel={"Select All"}
          selectedJournalists={[journoInfo?.journalistId]}
        />
      )}

      {isPitchDialogOpen && (
        <PitchAList
          open={isPitchDialogOpen}
          onClose={() => {
            setIsPitchDialogOpen(false);
            document.body.classList.remove("overflow-hidden");
          }}
          selectedList={journoInfo?.journalistId}
          emailId={contactDetails[2].value}
        />
      )}
    </section>
  );
};

export default ProfileCard;
