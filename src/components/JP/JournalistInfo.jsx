"use client";

import { baseURL } from "../../constants";
import noUser from "../assets/noUser.png";
import insta from "../assets/insta.png";
import linkedin from "../assets/linkedin.png";
import twitter from "../assets/twitter.png";
import facebook from "../assets/facebook.png";
import Link from "next/link";
import LockTooltip from "../Tooltip/LockTooltip";
import { usePopup } from "../Header/CreatePopup";

const JournalistInfo = ({ journalistProfileData, email, personal, phone }) => {
  const { showPopup } = usePopup();
  const {
    journoSocial = {},
    journoInfo = {},
    journCarrerSum = [],
  } = journalistProfileData || {};

  const primaryOutlet = journoInfo?.outlets?.[0] || {};

  const copyToClipboard = (text) => {
    if (text && text !== "N/A") {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="flex flex-col px-6 relative overflow-hidden py-8">
      <div className="absolute right-2 top-2 px-2 py-1 text-center text-xs  font-medium text-[#318fff]">
        {journalistProfileData?.journoInfo?.crmStatus && "Added to CRM"}
      </div>
      {journalistProfileData?.journoInfo?.shutShop?.id === 64 && (
        <div className="absolute -left-8 top-6 z-[8] -rotate-45  bg-red-600 px-6 py-1 text-xs uppercase text-white">
          Left Journalism
        </div>
      )}

      {journalistProfileData?.journoInfo?.shutShop?.id === 65 && (
        <div className="absolute -left-8 top-6 z-[8] -rotate-45  bg-green-500 px-6 py-1 text-xs uppercase text-white">
          In transition
        </div>
      )}

      {journalistProfileData?.journoInfo?.shutShop?.id === 66 && (
        <div className="absolute -left-8 top-6 z-[8] -rotate-45  bg-orange-500  px-6 py-1 text-xs uppercase text-white">
          Moved Abroad
        </div>
      )}

      {journalistProfileData?.journoInfo?.shutShop?.id === 67 && (
        <div className="absolute -left-8 top-6 z-[8] -rotate-45  bg-red-600 p-2 px-6 py-1 text-xs uppercase text-white">
          RIP
        </div>
      )}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-6 md:flex-row ">
          <img
            src={
              journoInfo?.photo
                ? journoInfo.photo !== ""
                  ? baseURL + journoInfo?.photo
                  : noUser.src
                : noUser.src
            }
            className="object-cover mt-2 rounded-full h-28 w-28 md:h-[140px] md:w-[140px]"
            alt=""
          />
          <div className="w-full md:ml-4">
            <div>
              <p className="font-medium text-[#333333] text-md">
                {journoInfo?.journalistName || "N/A"}
              </p>
              <p className="text-[#666666] text-[12px] font-[400]">
                {journoInfo?.journoTitle?.value || "N/A"},{" "}
                {journoInfo?.outlets
                  ?.map((outlet) => outlet.outletName)
                  .join(", ") || "N/A"}
              </p>
              <div>
                <div className="flex gap-2 mt-8 mb-8">
                  {journoSocial?.vchInstagramLink && (
                    <Link
                      href={journoSocial.vchInstagramLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={insta.src}
                        className="object-cover w-6 h-6 rounded-full"
                        alt="instagram"
                      />
                    </Link>
                  )}
                  {journoSocial?.vchTwitter && (
                    <Link
                      href={`https://x.com/${journoSocial.vchTwitter}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={twitter.src}
                        className="object-cover w-6 h-6 rounded-full"
                        alt="twitter"
                      />
                    </Link>
                  )}
                  {journoSocial?.vchLinkedinLink && (
                    <Link
                      href={journoSocial.vchLinkedinLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={linkedin.src}
                        className="object-cover w-6 h-6 rounded-full"
                        alt="linkedin"
                      />
                    </Link>
                  )}
                  {journoSocial?.vchFacebookLink && (
                    <Link
                      href={journoSocial.vchFacebookLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={facebook.src}
                        className="object-cover w-6 h-6 rounded-full"
                        alt="facebook"
                      />
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-2">
              <h4 className="text-[#333333] font-[500] text-[16px] mb-1">
                INFO
              </h4>
              <hr className="mb-4 text-[#E7E7E7] h-[1px]" />
              <div className="flex flex-col md:flex-row gap-2 mt-3 text-[11px] text-[#333333] font-[400]">
                {primaryOutlet?.media && (
                  <div className="flex items-center justify-between p-2 px-2 rounded-[20px] bg-[#F4F4F4]">
                    <p className="flex items-center justify-between gap-1">
                      <span className="text-sm icon-14 font-[300] text-[#666666] material-icons-outlined">
                        grade
                      </span>{" "}
                      {primaryOutlet.media}
                    </p>
                  </div>
                )}
                {journoInfo?.language?.length > 0 && (
                  <div className="flex items-center justify-between p-2 px-2 rounded-[20px] bg-[#F4F4F4]">
                    <p className="flex items-center justify-between gap-1">
                      <span className="text-sm icon-14 font-[300] text-[#666666] material-icons-outlined">
                        language
                      </span>
                      {journoInfo.language.map((lang) => lang.value).join(", ")}
                    </p>
                  </div>
                )}
                {journoInfo?.authorUrl && (
                  <div className="flex items-center justify-between p-2 px-2 rounded-[20px] bg-[#F4F4F4]">
                    <p className="flex items-center justify-between gap-1">
                      <span className="text-sm icon-14 font-[300] text-[#666666] material-icons-outlined">
                        link
                      </span>
                      <a
                        href={journoInfo.authorUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                      >
                        Author Link
                      </a>
                    </p>
                  </div>
                )}
              </div>
              <hr className="mb-4 text-[#E7E7E7] h-[1px] mt-4" />

              <div className="text-[#666666] text-[12px]">
                <div className="flex items-center gap-2 mt-4 relative">
                  <span className="text-sm icon-16 font-[300] text-[#666666] material-icons-outlined">
                    call
                  </span>
                  <p>{phone || "N/A"}</p>
                  {phone === "xxxxxxxxxx" ? (
                    <span
                      onClick={() => showPopup()}
                      className="cursor-pointer"
                    >
                      <LockTooltip
                        left="left-[85px]"
                        top="-top-[5px]"
                        leftPosition="-left-[0px]"
                        topPosititon="top-[32px]"
                        title="Feature Locked!"
                      />
                    </span>
                  ) : (
                    <p className="font-normal text-md">
                      <Link href="#" onClick={() => copyToClipboard(phone)}>
                        <i className="text-xl text-gray-400 material-icons-outlined icon-16">
                          copy
                        </i>
                      </Link>
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-2 relative">
                  <span className="text-sm icon-16 font-[300] text-[#666666] material-icons-outlined">
                    mail
                  </span>
                  <p>{email || "N/A"}</p>
                  {
                    <p className="font-normal text-md">
                      <Link href="#" onClick={() => copyToClipboard(email)}>
                        <i className="text-xl text-gray-400 material-icons-outlined icon-16">
                          copy
                        </i>
                      </Link>
                    </p>
                  }
                </div>
                {personal !== undefined && (
                  <div className="flex items-center gap-2 mt-2 relative">
                    <span className="text-sm icon-16 font-[300] text-[#666666] material-icons-outlined">
                      mail
                    </span>
                    <p>{personal}</p>
                    {
                      <p className="font-normal text-md">
                        <Link href="#" onClick={() => copyToClipboard(email)}>
                          <i className="text-xl text-gray-400 material-icons-outlined icon-16">
                            copy
                          </i>
                        </Link>
                      </p>
                    }
                  </div>
                )}
              </div>
              <hr className="mb-4 text-[#E7E7E7] h-[1px] mt-4" />

              <div className="flex flex-col  xl:items-start gap-1 text-[#333333] text-[13px] font-[400] mt-4">
                <p>
                  {" "}
                  <b> Beat:</b>{" "}
                  {journoInfo?.beat?.map((b) => b.beatName).join(", ") || "N/A"}
                </p>
                {journoInfo?.city?.length > 0 && (
                  <p className="flex mt-1 gap-2 text-[11px] font-[400] items-center text-[#666666]">
                    <span className="text-sm icon-16 font-[300] text-[#666666] material-icons-outlined">
                      location_on
                    </span>
                    {journoInfo?.city?.map((curItem, index) => {
                      const cityName =
                        curItem?.city.charAt(0).toUpperCase() +
                        curItem?.city.slice(1).toLowerCase();

                      // Check if it's the last city and there is more than one city to remove the comma
                      if (journoInfo.city.length > 1) {
                        return index === journoInfo.city.length - 1
                          ? cityName
                          : `${cityName}, `;
                      }

                      return cityName; // No comma needed for a single city
                    })}
                  </p>
                )}
                {journoInfo?.additionalInfo !== "" && (
                  <p className="pt-2">
                    <b> Additional Info:</b>{" "}
                    <span className="text-gray-500">
                      {journoInfo?.additionalInfo}
                    </span>
                  </p>
                )}
              </div>
              <hr className="mb-4 text-[#E7E7E7] h-[1px] mt-4" />
            </div>

            <div className="mt-4">
              {journCarrerSum?.length > 0 && (
                <>
                  <h4 className="text-[#333333] font-[500] text-[16px] mb-1">
                    Career Summary
                  </h4>
                  <hr className="mb-4 text-[#E7E7E7] h-[1px]" />
                  <ul className="overflow-scroll overflow-x-hidden max-h-32 scrollbar">
                    {[...journCarrerSum].reverse().map((ele, index) => (
                      <li
                        key={index}
                        className="mb-2 pl-4 leading-4 before:w-2 relative before:top-1 before:left-0 before:rounded-full before:h-2 before:content-[''] before:bg-gray-400 before:absolute
                before:first:bg-[#fac540]
               after:last:bg-white after:w-[1px] after:h-full after:content-[''] after:bg-gray-400 after:absolute after:left-[3px] after:top-[12px]
                "
                      >
                        <h5 className="text-[#000000] text-[12px] font-medium">
                          {ele.description || "N/A"}
                        </h5>
                        <span className="text-[11px] font-[400] text-[#666666]">
                          {ele.company || "N/A"} {ele.year || "N/A"}-
                          {ele.toYear || "N/A"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalistInfo;
