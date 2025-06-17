"use client";

import { useState, useEffect } from "react";
import PitchAList from "./PitchAList";
import Link from "next/link";
import Spinner from "../../Services/Spinner";
import { DELETELIST, DOWNLOADCAMPAIGN, Freebies } from "../../constants";
import { useDispatch } from "react-redux";
import { ErrorAlert } from "../../Redux/Action/Settings";
import userService from "../../Services/user.service";
import * as XLSX from "xlsx";
import Tooltip from "../Tooltip/Tooltip";
import {
  GETLISTDETAILS,
  GETEMAILQUOTA,
  GETCAMPAIGNLIST,
} from "../../constants";
import tokenService from "../../Services/token.service";
import LockTooktip from "../Tooltip/LockTooltip";
import { usePopup } from "../Header/CreatePopup";
import { useNotification } from "../ErrorAlert/ErrorContextNotification";

const CampaignManager = () => {
  const { showNotification } = useNotification();
  const success = (msg, type) => showNotification(msg, type);
  const warning = (msg, type) => showNotification(msg, type);
  // const error = (msg, type) => showNotification(msg, type);
  const [selectedCampaignId, setSelectedCampaignId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(true);
  // const [listCount, setListCount] = useState("");
  // const navigateURL = useNavigate();
  const dispatch = useDispatch();

  // const [isJournalists, setJournalists] = useState([]);
  // const [listDownload, setListDownload] = useState([]);
  const [count, setcount] = useState(0);
  //const { campaignList, campaignStatus } = useCampaignList(counts);
  const [campaignList, setCampaignList] = useState([]);
  const [token, setToken] = useState("");
  const [campaignStatus, setCampaignStatus] = useState(false);

  // const [quotaAdded, setQuotaAdded] = useState("");
  const [remainingQuota, setRemainingQuota] = useState(0);
  // const [monthlyEMailQuota, setMonthlyEmailQuota] = useState("");
  // const [usedQuota, setUsedQuota] = useState("");
  // const [totalQuota, setTotalQuota] = useState("");
  // const [emailQuotaStatus, setEmailQuotaStatus] = useState(false);
  let roleType = tokenService.getLocalRole();
  const { showPopup } = usePopup();
  let url = `${GETCAMPAIGNLIST}`;
  const cpList = () => {
    setCampaignStatus(true);
    userService
      .get(url)
      .then((result) => {
        if (result?.response?.status === "Ok") {
          setCampaignList((old) => [...old, ...result?.lists]);

          //setCount(response?.listDetail?.count);

          result?.nextpagetoken?.token !== ""
            ? setToken(result?.nextpagetoken?.token)
            : setToken("");
        }
      })
      .catch((error) => {
        setCampaignList([]);
      })
      .finally(() => {
        setCampaignStatus(false);
      });
  };

  const handleScroll = () => {
    if (token !== "") {
      url += "?token=" + encodeURIComponent(token);
      cpList();
    }
  };

  const getMailQuota = () => {
    // setEmailQuotaStatus(true);
    userService
      .get(`${GETEMAILQUOTA}`)
      .then((result) => {
        if (result?.response?.status === "Ok") {
          // setQuotaAdded(result?.data?.emailQuotaAddOn);
          setRemainingQuota(result?.data?.remainingQuota);
          // setMonthlyEmailQuota(result?.data?.monthalyEmailQuota);
          // setTotalQuota(result?.data?.totalQuota);
          // setUsedQuota(result?.data?.usedQuota);
        }
      })
      .catch((error) => {
        error(error?.message, "error");
      })
      .finally((result) => {
        // setEmailQuotaStatus(false);
      });
  };

  const handleDeleteClick = () => {
    if (selectedCampaignId === 0) {
      warning("Please select the list you wish to delete", "warning");
      // dispatch(WarningAlert("Please select atleast one list to delete"));
    } else {
      userService
        .delete(`${DELETELIST}${selectedCampaignId}`)
        .then((result) => {
          if (result?.status === "Success") {
            //dispatch(SuccessAlert(result?.message));
            success(result?.message, "success");
            setcount((prevCount) => prevCount + 1);

            setCampaignList(
              campaignList.filter((j) => selectedCampaignId === j.id)
            );
          } else if (result?.status === "ExistInCampaign") {
            warning(
              "This list is exist in your campaign, you can not delete it.",
              "warning"
            );
          }
        })
        .catch((error) => {
          dispatch(ErrorAlert(error.message));
        })
        .finally(() => {
          setSelectedCampaignId(0);
        });
    }
  };

  const handleRadioChange = (campaignId) => {
    setSelectedCampaignId(campaignId);
  };

  const formatDate = (date) => {
    const date1 = new Date(date);
    const formattedDate = date1.toLocaleDateString("en-GB");
    return formattedDate;
  };

  const downloadExcel = () => {
    if (selectedCampaignId === 0) {
      warning("Please select the list you wish to download", "warning");
    } else {
      setStatus(false);
      userService
        .get(`${DOWNLOADCAMPAIGN}?ListId=${selectedCampaignId}`)
        .then((response) => {
          if (response.response.status === "Ok") {
            // setListDownload(response.listDetail);

            const dataToExport = response.listDetail?.journalists?.map(
              (item) => ({
                //ID: item.id,
                Name: item.name,
                "Outlet Name": item.outlet
                  .map((outlet) => outlet.outletName)
                  .join(","), //.map(journalist => journalist.outlet.map(outlet => outlet.outletName).join(',')).join('|'),
                //Title: item.title,
                "Primary Beat": item.beat.find(
                  (beat) => beat.beatType === "Primary"
                )?.beat,
                // "Secondary Beat": item.beat.find((beat) => beat.beatType === "Secondary")
                //   ?.beat,
                Mobile: item.contactDetails.find(
                  (contact) => contact.type === "Mobile"
                )?.value,
                Phone: item.contactDetails.find(
                  (contact) => contact.type === "Phone"
                )?.value,
                "Work Email": item.contactDetails.find(
                  (contact) => contact.type === "Work Email"
                )?.value, //map(journalist => journalist.contactDetails.find(contact => contact.type === 'Work Email')?.value).join(','),

                "Personal Email": item.contactDetails.find(
                  (contact) => contact.type === "Personal Email"
                )?.value,
                City: item.city,
              })
            );
            const worksheet = XLSX.utils.json_to_sheet(dataToExport);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(
              workbook,
              `${response.listDetail?.listName?.vchCampaignName}.xlsx`
            );
          } else {
            warning(
              `${response.response.message}. your daily download counts are  ${response.downloadCount.dayCount}, 
          your week download counts are  ${response.downloadCount.weekCount},your monthly download counts are  ${response.downloadCount.monthCount},`,
              "warning"
            );
          }
        })
        .catch((error) => {})
        .finally(() => {
          setSelectedCampaignId(0);
          setStatus(true);
        });
    }
  };

  useEffect(() => {
    cpList();
  }, [count]);

  useEffect(() => {
    getMailQuota();
  }, [selectedCampaignId]);

  // useEffect(() => {
  //   campaignList?.length > 0 &&
  //     campaignList?.map((curItem) => {
  //       if (curItem?.listId === selectedCampaignId) {
  //         // setListCount(curItem?.count);
  //       }
  //     });
  // }, [selectedCampaignId]);

  const getList = async () => {
    userService
      .get(`${GETLISTDETAILS}${selectedCampaignId}`)
      .then((response) => {
        // setJournalists(response?.listDetail);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    selectedCampaignId > 0 && getList();
  }, [selectedCampaignId]);

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
                <li className="flex items-center">Campaign Manager</li>
              </ul>
              <div className="relative flex gap-x-3">
                <div className=" flex justify-end gap-x-4">
                  {/* <div className="relative flex">
                    {!remainingQuota <= 0 && (
                      <Tooltip content="Mail">
                        <button
                          className="material-icons-outlined h-[100%] rounded-[5px] border border-[#FF3EA5] bg-[#FF3EA5] px-2 text-white"
                          onClick={() => {
                            if (selectedCampaignId === 0) {
                              alert("Please select the list you wish to Pitch");
                            } else if (listCount > remainingQuota) {
                              alert(
                                `Your Remaining Quota is ${remainingQuota}, and list count is ${listCount} Journalist. Please talk to your Account Manager to pitch`
                              );
                            } else {
                              if (selectedCampaignId > 0) {
                                setIsOpen(true);
                              }
                            }
                          }}
                        >
                          mail
                        </button>
                      </Tooltip>
                    )}
                  </div> */}

                  {/* <div className="relative flex">
                    <button
                      className={`${
                        remainingQuota <= 100
                          ? "bg-red-500 border-red-400 text-white"
                          : "bg-gray-100 border-gray-300 text-gray-400 "
                      } cursor-default whitespace-nowrap rounded-[5px] border px-3 py-1  font-medium text-sm`}
                    >
                      Email Balance: {remainingQuota}
                    </button>
                  </div> */}

                  {roleType?.includes(Freebies) ? (
                    <>
                      <div className="relative">
                        <LockTooktip
                          left="-right-[8px]"
                          top="-top-[8px]"
                          leftPosition="-left-[0px]"
                          topPosititon="top-[38px]"
                          content="Download feature is disabed for free user"
                        />
                        <button
                          className="flex h-[100%] items-center whitespace-nowrap rounded-[5px] border border-[#8260b6] px-2  text-[#8260b6]"
                          onClick={() => showPopup()}
                        >
                          <i className="material-icons">cloud_download</i>
                        </button>
                      </div>
                    </>
                  ) : !status ? (
                    <span className="flex h-[100%] items-center whitespace-nowrap rounded-[5px] border border-[#8260b6] px-2  text-[#8260b6]">
                      Downloading...
                    </span>
                  ) : (
                    <Tooltip content="Download">
                      <button
                        className="flex h-[100%] items-center whitespace-nowrap rounded-[5px] border border-[#8260b6] px-2  text-[#8260b6]"
                        onClick={downloadExcel}
                      >
                        <i className="material-icons">cloud_download</i>
                      </button>
                    </Tooltip>
                  )}
                  <Tooltip content="Delete">
                    <button
                      className=" flex h-[100%] items-center whitespace-nowrap rounded-[5px]  border border-[#8260b6] px-2 text-[#8260b6] "
                      onClick={handleDeleteClick}
                    >
                      <i className="material-icons">delete</i>
                    </button>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="section w-11/12 p-6 py-6 pl-8 pr-0">
        <div className="scroll relative h-[600px] overflow-y-auto rounded-md border border-gray-400">
          {campaignStatus && <div className="p-5">No Record Found</div>}
          {campaignStatus && (
            <div>
              <div className="opegue-4 absolute inset-0 bg-gray-600">
                <div className="lft50 absolute">
                  <Spinner status={true} />
                </div>
              </div>
            </div>
          )}
          {campaignList?.length > 0 ? (
            <>
              <table className="min-w-full">
                {/* sticky top-0 */}
                <thead className=" bg-slate-50 z-20 text-xs">
                  <tr>
                    <th className="border-b border-slate-300 p-3 text-left text-slate-900  "></th>
                    <th className="border-b border-slate-300 p-3 text-left text-slate-900  dark:text-slate-200 font-medium">
                      Date
                    </th>
                    <th className="border-b border-slate-300 p-3 text-left text-slate-900  font-medium">
                      List Name
                    </th>
                    <th className="border-b border-slate-300 p-3 text-left text-slate-900  font-medium">
                      Description
                    </th>
                    <th className="border-b border-slate-300 p-3 text-left text-slate-900  font-medium">
                      Contacts
                    </th>
                    {/* {roleType?.includes(Freebies) ? (
                      <th className="border-b border-slate-300 p-3 text-left text-slate-900  font-medium">
                        List Tracking
                      </th>
                    ) : (
                      <>
                        <th className="border-b border-slate-300 p-3 text-left text-slate-900  font-medium">
                          List Tracking
                        </th>
                      </>
                    )} */}
                  </tr>
                </thead>
                <tbody>
                  {campaignList?.map((campaign, ind) => (
                    <tr key={campaign?.listId}>
                      <td className="border-b border-slate-300 p-3 text-slate-500">
                        <input
                          type="radio"
                          name="campaignSelection"
                          value={campaign?.listId}
                          checked={selectedCampaignId === campaign?.listId}
                          onChange={() => handleRadioChange(campaign?.listId)}
                          className="peer/published w-3 accent-orange-600"
                        />
                      </td>
                      <td className="border-b text-xs border-slate-300 p-3 text-slate-500">
                        {formatDate(campaign.date)}
                      </td>
                      <td className=" cursor-pointer border-b border-slate-300 p-3 ">
                        <Link
                          href={`/campaign-list/${campaign.listId}`}
                          className="cursor-pointer text-xs  text-blue-700 hover:underline"
                        >
                          {campaign.listName}
                        </Link>
                      </td>
                      <td className="border-b  text-xs border-slate-300 p-3 text-slate-500">
                        {campaign.description}
                      </td>
                      <td className="border-b text-xs border-slate-300 p-3  text-slate-500">
                        {campaign.count}
                      </td>
                      {/* {roleType?.includes(Freebies) ? (
                        <td className="border-b relative border-slate-300 p-3 font-medium text-blue-700">
                          <span onClick={() => showPopup()}>
                            <LockTooktip
                              left="left-[10px]"
                              top="top-[15px]"
                              leftPosition="-left-[0px]"
                              topPosititon="top-[45px]"
                              title="Feature Locked!"
                            />
                          </span>
                        </td>
                      ) : (
                        <>
                          <td className="border-b border-slate-300 p-3 font-medium text-blue-700">
                            <ul className="flex ">
                              {campaign?.listPitchTraking?.length > 0 && (
                                <select
                                  name="cars"
                                  id="cars"
                                  className="w-60 border border-blue-400 p-2 text-xs"
                                  onChange={(e) => navigateURL(e.target.value)}
                                  // onClick={(e) => checkDateTime(ind)}
                                >
                                  <option value="">Track Your List</option>

                                  {campaign?.listPitchTraking?.length > 0 &&
                                    campaign?.listPitchTraking?.map(
                                      (id, index) => (
                                        <option
                                          value={`/list-tracking/${id.bgintPitchId}`}
                                        >
                                          {`Pitch ${index + 1} at  ${new Date(
                                            id.dtCreateDate
                                          ).toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit",
                                            hour12: true,
                                          })}`}
                                        </option>
                                      )
                                    )}
                                </select>
                              )}
                            </ul>
                          </td>
                        </>
                      )} */}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                {token && (
                  <div className="flex items-center">
                    {campaignStatus ? (
                      <span className="mx-auto my-5 rounded-md bg-gray-500 px-3 py-2 text-sm font-normal text-white  md:w-auto md:border-0">
                        Loading...
                      </span>
                    ) : (
                      <span
                        onClick={() => handleScroll()}
                        className="mx-auto my-5 rounded-md bg-[#002b5b] px-3 py-2 font-normal text-xs text-white md:w-auto md:border-0"
                      >
                        Load more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            "No Record Found"
          )}
        </div>
      </div>
      {isOpen && (
        <PitchAList
          open={isOpen}
          onClose={() => setIsOpen(false)}
          selectedList={selectedCampaignId}
          emailBalance={remainingQuota}
          getMail={getMailQuota}
          updateTracking={cpList}
        />
      )}
    </div>
  );
};

export default CampaignManager;
