"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import CampaignDetail from "../CampaignDetail/CampaignDetail";
// import userService from "../../../Services/user.service";

const SummaryRecord = ({ allData, deleteCampaign }) => {
  const router = useRouter();
  const [moreDetail, setMoreDetail] = useState(null);
  const getcampDetail = (campId, campType) => {
    router.push(`/create-campaign/${campId}/${campType}/update`);
  };
  const date = new Date(allData?.dtCreateddate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  useEffect(() => {
    const converDate = (date) => {
      if (!allData?.dtCreateddate) {
        return;
      }
      const currentDate = new Date(date);
      currentDate.setDate(currentDate.getDate() + 1);
      currentDate.setHours(8, 0, 0, 0);
      setMoreDetail(currentDate);
    };
    converDate(allData?.dtCreateddate);
  }, [allData]);

  return (
    <div>
      <article className="bg-gray-100 p-3 rounded-lg mb-4">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h2 className="flex gap-x-2 items-center ">
              {allData?.type === "Draft" && (
                <span
                  className="text-md text-gray-700 font-medium cursor-pointer hover:text-gray-900"
                  onClick={() =>
                    getcampDetail(
                      allData?.bgintcampid,
                      allData?.vchTemplateType
                    )
                  }
                >
                  {" "}
                  {allData?.vchCampaignName.charAt(0).toUpperCase() +
                    allData?.vchCampaignName.slice(1)}
                </span>
              )}

              {allData?.type === "Sent" && (
                <span className="text-md text-gray-700 font-medium hover:text-gray-900">
                  {allData?.vchCampaignName}
                </span>
              )}

              <span className="text-gray-500 text-xs">{formattedDate}</span>
            </h2>
            <p className="text-xs text-gray-500 pb-2">
              {" "}
              {allData?.vchCampaignDesc}
            </p>
            <Link
              href={`/campaign-list/${allData.intCampListId}`}
              target="_blank"
              className="text-xs text-blue-600 font-medium"
            >
              Attached List
            </Link>
            <div className="text-xs text-gray-600 font-medium mt-2 mb-2">
              Total Journalist Targeted:
              <span className="font-bold text-md"> {allData?.jourCount}</span>
            </div>

            {allData?.type === "Draft" && (
              <div
                onClick={() => deleteCampaign(allData?.bgintcampid)}
                className="cursor-pointer hover:bg-red-100 flex gap-x-1 pr-2 pl-1 py-1 rounded-md border border-red-300 justify-start self-start  items-center text-red-500 text-xs"
              >
                <span className="material-icons-outlined icon-16 text-red-400">
                  delete
                </span>
                Delete
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between items-end">
            {allData?.type === "Draft" && (
              <div className="bg-[#002b5b] text-white px-3 py-1 rounded-md text-xs">
                {allData?.type}
              </div>
            )}
            {allData?.type === "Sent" && (
              <div className="bg-green-200 text-green-500 px-3 py-1 rounded-md text-xs">
                Sent
              </div>
            )}
            <div>
              {allData?.type === "Sent" && new Date() >= moreDetail ? (
                <Link
                  href={`/campaign-detail/${allData?.bgintcampid}`}
                  className="flex items-center"
                >
                  <span className="font-medium text-xs text-gray-700">
                    More Details
                  </span>
                  <span className="material-icons-outlined icon-16 text-gray-700">
                    keyboard_double_arrow_right
                  </span>
                </Link>
              ) : (
                allData?.type === "Sent" && (
                  <span className="text-red-500 text-[10px] font-medium">
                    The tracking link will be activated at 08:00AM tomorrow.
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default SummaryRecord;
