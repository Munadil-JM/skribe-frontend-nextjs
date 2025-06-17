"use client";

import { useEffect, useState } from "react";
import PitchAList from "./PitchAList";
import { useRouter } from "next/navigation";
import TableShimmer from "../Shimmers/TableShimmer";
import userService from "../../Services/user.service";
import { LISTTRACKING } from "../../constants";
import { useNotification } from "../ErrorAlert/ErrorContextNotification";

const ListTracking = ({ id }) => {
  const [dataList, SetDataList] = useState([]);
  const [status, setStatus] = useState(false);
  const router = useRouter();
  const { showNotification } = useNotification();
  // const success = (msg, type) => showNotification(msg, type);
  const warning = (msg, type) => showNotification(msg, type);
  // const error = (msg, type) => showNotification(msg, type);
  const [selectedJournalists] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    getListDetails(`${LISTTRACKING}${id}`);
  }, []);

  const getListDetails = (url) => {
    setStatus(true);
    userService
      .get(url)
      .then((result) => {
        if (result?.response?.status === "Ok") {
          SetDataList(result?.data);
        } else if (result?.response?.status === "NotExist") {
          warning(result?.response?.message, "warning");
        }
      })
      .catch((err) => {
        console.log(err, "error");
      })
      .finally(() => {
        setStatus(false);
      });
  };
  // const handleJournalist = (rowId) => {
  //   const updatedCheckboxes = [...selectedJournalists];

  //   if (updatedCheckboxes.includes(rowId)) {
  //     updatedCheckboxes.splice(updatedCheckboxes.indexOf(rowId), 1);
  //   } else {
  //     updatedCheckboxes.push(rowId);
  //   }

  //   setSelectedJournalists(updatedCheckboxes);
  // };

  // const [selectedOption, setSelectedOption] = useState("");

  // const handleOptionChange = (journos) => {
  //   setSelectedOption(journos);
  // };

  // const formatDate = (date) => {
  //   const date1 = new Date(date);
  //   const formattedDate = date1.toLocaleDateString("en-GB");
  //   return formattedDate;
  // };

  return (
    <div>
      <section
        className="sticky bottom-1 left-0 top-[64px] z-10 flex gap-x-8 bg-white"
        style={{ borderBottom: "1px solid rgb(209 213 219)" }}
      >
        <div className="section flex w-11/12 gap-x-6">
          <div className=" hidden w-4/12 pl-8 md:flex md:w-7/12 lg:w-1/3">
            <span
              onClick={() => goBack()}
              className=" flex w-28 cursor-pointer items-center text-xs font-normal text-gray-500 hover:border-gray-400 hover:text-gray-800"
            >
              <span className="material-icons-outlined icon-16">
                arrow_back_ios_new
              </span>
              Go Back
            </span>
          </div>
          <div className="flex w-full flex-col flex-wrap gap-6 self-start">
            <div className="flex flex-wrap items-center justify-between bg-white p-3 pr-0">
              <ul className="flex items-center gap-x-1 text-xs text-gray-400">
                <li className="flex items-center">
                  Home
                  <span className="material-icons-outlined b-font text-gray-400">
                    navigate_next
                  </span>
                </li>
                <li className="flex items-center">
                  Campaign Manager
                  <span className="material-icons-outlined b-font text-gray-400">
                    navigate_next
                  </span>
                </li>
                <li className="flex items-center"> Media Outreach</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="section w-11/12 p-6 py-6 pl-8 pr-0">
        {!!dataList?.emailTrackingData?.length && (
          <div className="mb-2 flex w-full items-center rounded-md border border-gray-300  py-5 pl-5 ">
            <div className="w-3/4">
              <p className="flex text-sm text-gray-500 leading-6">
                <span className="w-24 text-right">List Name:</span>
                <span className="pl-4  text-gray-700">
                  {!!dataList?.lists && dataList?.lists?.listName}
                </span>
              </p>
              <p className="flex text-sm text-gray-500 leading-6">
                <span className="w-24 text-right">Subject:</span>
                <span className="pl-4  text-gray-700">
                  {!!dataList?.subject && dataList?.subject}
                </span>
              </p>

              <p className="flex text-sm text-gray-500 leading-6">
                <span className="w-24 text-right">Total Reach:</span>
                <span className="pl-4  text-gray-700">
                  {!!dataList?.lists?.journoCount &&
                    dataList?.lists?.journoCount}
                </span>
              </p>
              <p className="flex text-sm text-gray-500 leading-6">
                <span className="w-24 text-right">Open:</span>
                <span className="pl-4  text-gray-700">
                  {!!dataList?.open && dataList?.open}
                </span>
              </p>
              <p className="flex text-sm text-gray-500 leading-6">
                <span className="w-24 text-right">Open Rate:</span>
                <span className="pl-4 text-gray-700">
                  {!!dataList?.openRate && dataList?.openRate}%
                </span>
              </p>
              {/* <p className="">Team: NA</p> */}
            </div>
          </div>
        )}
        {/* {dataList?.emailTrackingData?.length === 0 && !status && (
          <TableShimmer />
        )} */}
        <div className="scroll max-h-[600px] overflow-y-auto  rounded-md  border border-gray-300 ">
          <table className="min-w-full">
            {dataList?.emailTrackingData?.length > 0 && !status && (
              <thead className="sticky top-0 bg-slate-50 dark:bg-slate-700 text-xs">
                <tr>
                  <th className="border-b border-slate-300 p-4 text-left text-gray-500">
                    S. No
                  </th>
                  <th className="border-b border-slate-300 p-4 text-left text-gray-500">
                    Delivery Status
                  </th>
                  <th className="border-b border-slate-300 p-4 text-left text-gray-500">
                    Recipient
                  </th>
                  <th className="border-b border-slate-300 p-4 text-left text-gray-500">
                    Open Count
                  </th>
                  <th className="border-b border-slate-300 p-4 text-left text-gray-500">
                    Click Count
                  </th>
                </tr>
              </thead>
            )}
            <tbody>
              {dataList?.emailTrackingData?.length > 0 && !status ? (
                dataList?.emailTrackingData?.map((curItem, ind) => (
                  <tr key={ind}>
                    <td className="border-b border-slate-300 p-4 text-gray-500 text-xs">
                      {ind + 1}
                    </td>
                    <td className="border-b border-slate-300 p-4 text-xs">
                      <p className="text-xs">
                        {curItem.deliveryStatus === "Delivered" ? (
                          <span className="text-green-600">
                            {curItem.deliveryStatus}
                          </span>
                        ) : (
                          <span className="text-red-500">
                            {curItem.deliveryStatus}
                          </span>
                        )}
                      </p>
                    </td>
                    <td className="border-b border-slate-300 p-4 text-gray-400 text-xs">
                      <p className="text-xs text-gray-500">{curItem.toEmail}</p>
                    </td>
                    <td className="border-b border-slate-300 p-4 text-gray-400 text-xs">
                      <p className="text-xs text-gray-500">
                        {curItem.opensCount}
                      </p>
                    </td>

                    <td className="border-b border-slate-300 p-4 text-gray-400 text-xs">
                      <p className="text-xs text-gray-500">
                        {curItem.clicksCount}
                      </p>
                    </td>
                  </tr>
                ))
              ) : status ? (
                // <TableShimmer />
                <tr>
                  <td className="p-4 text-center" colSpan={5}>
                    Loading...
                  </td>
                </tr>
              ) : (
                <tr>
                  <td className="p-3 text-sm text-gray-700">No Record Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isOpen && (
        <PitchAList
          open={isOpen}
          onClose={() => setIsOpen(false)}
          selectedList={selectedJournalists}
        />
      )}
    </div>
  );
};

export default ListTracking;
