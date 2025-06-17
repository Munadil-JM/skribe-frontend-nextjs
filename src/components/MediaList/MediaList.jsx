"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import * as XLSX from "xlsx";
import {
  // DELETE_LIST,
  DOWNLOADCAMPAIGN,
  DOWNLOAD_COUNT,
  MEDIA_LIST,
} from "../../constants";
import { baseURL } from "../../constants";
import userService from "../../Services/user.service";
import ShareList from "./ShareList";
import DuplicateCopy from "./DuplicateCopy";
import ListPopup from "./ListPopup/ListPopup";
import DeletePopup from "./DeletePopup";
import { useNotification } from "../ErrorAlert/ErrorContextNotification";
import tokenService from "../../Services/token.service";

const MediaList = () => {
  //RADIO CHECK BOX SELECT UNSELECT STATE
  const [selectedRadio, setSelectedRadio] = useState(null); // No selection on load
  const [isOpen, setIsOpen] = useState(false);
  const [duplicateOpen, setDuplicateOpen] = useState(false);
  const [viewListOpen, setViewListOpen] = useState(false);
  const [deleteListOpen, setDeleteListOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [roleType, setRoleType] = useState(tokenService.getLocalRole());

  const [downloadCount, setDownloadCount] = useState({});
  const [allMediaList, setAllMediaList] = useState([]);
  const [token, setToken] = useState("");
  const [totalResult, setTotalResult] = useState(0);
  const [searchName, setSearchName] = useState("");
  const [listDetailId, setListDetailId] = useState(0);

  //SHARE LIST ID,NAME STATE
  const [shareListId, setShareListId] = useState("");
  const [listName, setListName] = useState("");
  //SHOW NOTIFICATION POPUP
  const { showNotification } = useNotification();
  // const success = (msg, type) => showNotification(msg, type);
  const warning = (msg, type) => showNotification(msg, type);
  // const error = (msg, type) => showNotification(msg, type);
  //DUPLICATE DATA STATE TO POST VALUE
  const [duplicateData, setDuplicateData] = useState({
    listName: "",
    vchListDescription: "",
    intCampListId: "",
    img: [],
  });

  //DOWNLOAD EXCEL STATE STATUS
  const [status, setStatus] = useState(false);

  //RADIO BUTTON LIST ID STATE
  const [listId, setListId] = useState("");
  const [deleteId, setDeleteId] = useState("");

  const shareFun = (listId, listNam) => {
    document.body.classList.add("overflow-hidden");
    setIsOpen(true);
    setShareListId(listId);
    setListName(listNam);
  };
  const closeShareFun = () => {
    document.body.classList.remove("overflow-hidden");
    setIsOpen(false);
  };

  const viewList = (listId) => {
    document.body.classList.add("overflow-hidden");
    setViewListOpen(true);
    setListDetailId(listId);
  };

  const closeviewList = () => {
    document.body.classList.remove("overflow-hidden");
    setViewListOpen(false);
  };

  let url = `${MEDIA_LIST}?pageSize=20`;

  const MediaList = (updatedUrl, type = null) => {
    type !== "load" ? setIsLoading(true) : setIsLoadMore(true);

    userService
      .get(updatedUrl)
      .then((result) => {
        if (result?.response?.status === "Ok") {
          setAllMediaList((old) =>
            type === "load"
              ? [...old, ...result?.listRecord]
              : result?.listRecord || []
          );
          setToken(result?.nextPageToken?.token || null);
          setTotalResult(result?.nextPageToken?.totalResult);
        } else {
          setAllMediaList([]); // Ensure it's an empty array if no data is found
        }
      })
      .catch((error) => {
        console.log(error, "check error");
        setAllMediaList([]); // Prevent undefined issues
      })
      .finally(() => {
        setIsLoading(false);
        setIsLoadMore(false);
      });
  };

  const loadMore = () => {
    let updatedUrl = url;
    if (token !== "") {
      updatedUrl += `&token=${encodeURIComponent(token)}`;
      if (searchName?.length > 0) {
        updatedUrl += `&ListName=${searchName}`;
      }
      MediaList(updatedUrl, "load");
    }
  };

  const getDownloadCount = () => {
    userService
      .get(DOWNLOAD_COUNT)
      .then((result) => {
        if (result?.response?.status === "Ok") {
          setDownloadCount(result?.downloadCount);
        }
      })
      .catch((errors) => {
        console.log(errors, "check download count api error");
      });
  };

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      setAllMediaList([]);
      if (searchName?.length > 0) {
        MediaList(`${url}&ListName=${searchName}`);
      } else {
        MediaList(url);
        if (!roleType?.includes("Freebies")) {
          getDownloadCount();
        }
      }
    }, 1000);

    return () => clearTimeout(delaySearch);
  }, [searchName]);

  const convertDate = (created, edited) => {
    const createdDate = new Date(created);
    const editedDate = new Date(edited);

    const finalDate = editedDate > createdDate ? editedDate : createdDate;

    return `${finalDate.getDate().toString().padStart(2, "0")}/${(
      finalDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${finalDate.getFullYear()}`;
  };
  //RADIO CHECK BOXES SELECT ID
  const getListId = (id) => {
    setSelectedRadio(id);
    setListId(id);
  };
  const duplicateFun = (lists) => {
    if (lists === "") {
      warning("Plese select the list, you wish to duplicate", "warning");
      return;
    }
    document.body.classList.add("overflow-hidden");
    setDuplicateOpen(true);
  };
  const closeDuplicate = () => {
    document.body.classList.remove("overflow-hidden");
    setDuplicateOpen(false);
  };
  useEffect(() => {
    if (duplicateOpen) {
      const selectedData = allMediaList?.find(
        (curItem) => curItem?.intCampListId === listId
      );

      if (selectedData) {
        const {
          vchCampaignName,
          vchListDescription,
          intCampListId,
          img,
          count,
        } = selectedData;
        setDuplicateData({
          listName: `copy of ${vchCampaignName}`,
          vchListDescription: vchListDescription,
          intCampListId: intCampListId,
          img: img,
          count,
        });
      } else {
        console.log("No matching data found.");
      }
    }
  }, [duplicateOpen, listId]);

  const deleteList = (id) => {
    if (id === "") {
      warning("Please select the list, you wish to delete", "warning");
      return;
    }
    console.log(id, "check id here...");
    document.body.classList.add("overflow-hidden");
    setDeleteId(id);
    setDeleteListOpen(true);
  };
  const closeDeleteList = () => {
    document.body.classList.remove("overflow-hidden");
    setDeleteListOpen(false);
  };

  //DONWLOAD DATA IN EXCEL SHEET
  const downloadExcel = (donwloadListId, count) => {
    if (count <= 0) {
      warning("No journalist in this list", "warning");
    }
    if (donwloadListId === 0) {
      warning("Please select the list you wish to download", "warning");
    } else {
      setStatus(false);
      userService
        .get(`${DOWNLOADCAMPAIGN}?ListId=${donwloadListId}`)
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
            getDownloadCount();
          } else if (response.response.status === "limit exceed") {
            warning(response.response.message, "warning");
          } else {
            warning(
              "Your monthly download balances our : 300 / day, 600 / week and 1,200 / month. The list you are downloading exceeds your download balance.",
              "warning"
            );
          }
        })
        .catch((error) => {})
        .finally(() => {
          setStatus(true);
        });
    }
  };
  const dailyCount = 300;
  const weeklyCount = 600;
  const monthlyCount = 1200;

  return (
    <>
      <ListPopup
        open={viewListOpen}
        onClose={closeviewList}
        listDetailId={listDetailId}
        mediaList={() => {
          setAllMediaList([]);
          MediaList(url);
        }}
      />
      <DuplicateCopy
        open={duplicateOpen}
        onClose={closeDuplicate}
        duplicateData={duplicateData}
        fetchMediaList={() => {
          setListId("");
          setSelectedRadio(null);
          setAllMediaList([]);
          MediaList(url);
        }}
      />
      <ShareList
        open={isOpen}
        onClose={closeShareFun}
        shareListId={shareListId}
        listName={listName}
      />
      <DeletePopup
        open={deleteListOpen}
        onClose={closeDeleteList}
        listId={deleteId}
        setListId={setListId}
        setSelectedRadio={setSelectedRadio}
        allMediaList={allMediaList}
        setAllMediaList={setAllMediaList}
        totalResult={totalResult}
        setTotalResult={setTotalResult}
      />
      <section
        className="sticky bottom-1 left-0 top-[64px] z-10 flex gap-x-8 bg-white"
        style={{ borderBottom: "1px solid rgb(209 213 219)" }}
      >
        <div className="section flex w-11/12 gap-x-6">
          <div className=" flex w-full flex-col flex-wrap gap-6 self-start">
            <div className="flex flex-wrap items-center justify-between bg-white p-3 pl-8 pr-0">
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
                <li className="flex items-center">Media List</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#F6F6F6] min-h-screen md:px-4 xl:pl-8">
        <div className="w-full xl:w-11/12">
          <div className="pt-6 flex flex-row items-center justify-between">
            <h3 className="text-gray-800 text-md">
              Media List ({totalResult})
            </h3>
            <div className="flex gap-x-2">
              <div className="flex items-center rounded-lg shadow-md border border-gray-200 bg-white  pl-2">
                <span className="material-icons-outlined text-sm text-gray-400">
                  search
                </span>
                <input
                  type="search"
                  className="text-sm w-full rounded-[5px] bg-white px-3 py-1 text-gray-400 focus:outline-none"
                  placeholder="Search By Name"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </div>
              {typeof downloadCount?.dayCount === "number" &&
                typeof dailyCount === "number" &&
                (downloadCount.dayCount <= 0 ? (
                  <div className="border-gray-500 text-gray-500 flex gap-x-1 border rounded-[5px] px-2 text-xs items-center">
                    <span className="text-gray-500 icon-16 material-icons-outlined">
                      download
                    </span>
                    Daily {dailyCount}
                  </div>
                ) : (
                  <div className="border-gray-500 text-gray-500 flex gap-x-1 border rounded-[5px] px-2 text-xs items-center">
                    <span className="text-gray-500 icon-16 material-icons-outlined">
                      download
                    </span>
                    Daily {dailyCount - downloadCount.dayCount}
                  </div>
                ))}

              {typeof downloadCount?.weekCount === "number" &&
                typeof weeklyCount === "number" &&
                (downloadCount.weekCount <= 0 ? (
                  <div className="border-gray-500 text-gray-500 flex gap-x-1 border rounded-[5px] px-2 text-xs items-center">
                    <span className="text-gray-500 icon-16 material-icons-outlined">
                      download
                    </span>
                    Weekly {weeklyCount}
                  </div>
                ) : (
                  <div className="border-gray-500 text-gray-500 flex gap-x-1 border rounded-[5px] px-2 text-xs items-center">
                    <span className="text-gray-500 icon-16 material-icons-outlined">
                      download
                    </span>
                    Weekly {weeklyCount - downloadCount.weekCount}
                  </div>
                ))}

              {typeof downloadCount?.monthCount === "number" &&
                typeof monthlyCount === "number" &&
                (downloadCount.monthCount <= 0 ? (
                  <div className="border-gray-500 text-gray-500 flex gap-x-1 border rounded-[5px] px-2 text-xs items-center">
                    <span className="text-gray-500 icon-16 material-icons-outlined">
                      download
                    </span>
                    Monthly {monthlyCount}
                  </div>
                ) : (
                  <div className="border-gray-500 text-gray-500 flex gap-x-1 border rounded-[5px] px-2 text-xs items-center">
                    <span className="text-gray-500 icon-16 material-icons-outlined">
                      download
                    </span>
                    Monthly {monthlyCount - downloadCount.monthCount}
                  </div>
                ))}

              <Link
                href="/journalist-search"
                className="border-gray-600 text-gray-600 flex gap-x-1 border rounded-[5px] px-2 text-sm items-center"
              >
                <span className="text-gray-500 icon-16 material-icons-outlined">
                  add
                </span>
                New
              </Link>

              <button
                onClick={() => deleteList(listId)}
                // onClick={() => deleteLists(listId)}
                className="border-gray-600 text-gray-600 flex gap-x-1 border rounded-[5px] px-2  text-sm items-center"
              >
                <span className="text-gray-500 icon-16 material-icons-outlined">
                  delete
                </span>
                Delete
              </button>

              <button
                onClick={() => duplicateFun(listId)}
                className="border-gray-600 text-gray-600 flex gap-x-1 border rounded-[5px] px-2 text-sm items-center"
              >
                <span className="text-gray-500 icon-16 material-icons-outlined">
                  file_copy
                </span>
                Duplicate
              </button>
            </div>
          </div>
        </div>
        <div className="w-full xl:w-11/12 mt-4 h-[500px] overflow-scroll overflow-x-hidden">
          <table
            width="100%"
            cellPadding="10"
            cellSpacing="0"
            border="0"
            className="border border-gray-300 shadow-md rounded-xl bg-white"
          >
            <thead className="bg-[#EEEEEE] border-b border-gray-300 text-xs text-gray-900 text-left sticky top-0">
              <tr>
                <th className="w-[5%]"></th>
                <th className="py-4 w-[20%] font-medium">Name</th>
                <th className="w-[15%] font-medium">Owner</th>
                <th className="w-[10%] font-medium">Last Edited</th>
                <th className="w-[15%] font-medium text-center">Pitch count</th>
                <th className="w-[15%] font-medium">Journalist Count</th>
                <th className="w-[20%] font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs text-gray-900">
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="text-xs text-center">
                    Loading...
                  </td>
                </tr>
              ) : allMediaList && allMediaList.length > 0 ? (
                allMediaList.map((record, index) => (
                  <tr
                    onClick={() => getListId(record?.intCampListId)}
                    key={index}
                    className={`${selectedRadio === record?.intCampListId ? "bg-gray-200" : ""} cursor-pointer`}
                  >
                    <td>
                      <input
                        type="radio"
                        id={`radio-${index}`}
                        name="delhi"
                        value="delhi"
                        className="w-4 h-4 mt-1"
                        onChange={() => getListId(record?.intCampListId)}
                        checked={selectedRadio === record?.intCampListId}
                      />
                    </td>
                    <td className="text-gray-900 font-medium">
                      {record?.vchCampaignName?.charAt(0).toUpperCase() +
                        record?.vchCampaignName?.slice(1).toLowerCase()}
                    </td>
                    <td>{record?.createdBy}</td>
                    <td>
                      {convertDate(
                        record?.dtCreatedDate,
                        record?.dtUpdatedDate
                      )}
                    </td>
                    <td className="text-center">{record?.pitchCount}</td>
                    <td>
                      <div className="flex items-center">
                        {record?.img?.length > 0 &&
                          record?.img?.map(
                            (images, index) =>
                              index < 4 &&
                              (images != null ? (
                                <img
                                  key={index}
                                  src={encodeURI(`${baseURL}${images}`)}
                                  width="30"
                                  height="30"
                                  alt={`Image ${index + 1}`}
                                  className="w-[30px] h-[30px] bg-gray-300 object-cover rounded-full border-2 border-white -mr-2"
                                />
                              ) : (
                                <div className="w-[30px] h-[30px] bg-gray-200 rounded-full border-2 border-white -mr-2 flex items-center justify-center text-[8px] leading-[10px] font-medium text-center">
                                  No Img
                                </div>
                              ))
                          )}
                        <div className="w-[30px] h-[30px] bg-gray-200 rounded-full border-2 border-white -mr-8 flex items-center justify-center text-md font-semibold">
                          {record?.count}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-x-2 items-center">
                        <Link
                          onClick={() => viewList(record?.intCampListId)}
                          href="#"
                          className="border border-gray-700 hover:bg-gray-200 flex items-center px-2 py-1 rounded-[5px]"
                        >
                          <span className="material-icons-outlined icon-20 text-gray-500">
                            visibility
                          </span>
                        </Link>
                        <Link
                          href={`/create-campaign/${record?.intCampListId}`}
                          className="border border-gray-700 hover:bg-gray-200 flex items-center px-2 py-1 rounded-[5px]"
                        >
                          <span className="material-icons-outlined icon-20 text-gray-500">
                            mail
                          </span>
                        </Link>
                        <button
                          onClick={() =>
                            shareFun(
                              record?.intCampListId,
                              record?.vchCampaignName
                            )
                          }
                          disabled={roleType?.includes("Freebies")}
                          // className="border border-gray-700 hover:bg-gray-200 flex items-center px-2 py-1 rounded-[5px]"
                          className={`${roleType?.includes("Freebies") ? "border-gray-300 " : "border-gray-700 hover:bg-gray-200"} border flex items-center px-2 py-1 rounded-[5px]`}
                        >
                          <span
                            // className="material-icons-outlined icon-20 text-gray-500"
                            className={`material-icons-outlined icon-20 ${roleType?.includes("Freebies") ? "text-gray-300" : "text-gray-500"}`}
                          >
                            share
                          </span>
                        </button>

                        <button
                          onClick={() =>
                            downloadExcel(record?.intCampListId, record?.count)
                          }
                          disabled={roleType?.includes("Freebies")}
                          className={`${roleType?.includes("Freebies") ? "border-gray-300 " : "border-gray-700 hover:bg-gray-200"} border flex items-center px-2 py-1 rounded-[5px]`}
                        >
                          <span
                            className={`material-icons-outlined icon-20 ${roleType?.includes("Freebies") ? "text-gray-300" : "text-gray-500"}`}
                          >
                            download
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-xs text-center">
                    No Records Found
                  </td>
                </tr>
              )}

              {isLoadMore && (
                <tr>
                  <td colSpan="7">
                    <div className="flex items-center">
                      <span className="cursor-pointer mx-auto my-5 rounded-md bg-gray-500 px-3 py-2 text-xs font-normal text-white">
                        Loading...
                      </span>
                    </div>
                  </td>
                </tr>
              )}
              {token && !isLoading && (
                <tr>
                  <td colSpan="7">
                    <div className="flex items-center">
                      <span
                        onClick={loadMore}
                        className="cursor-pointer mx-auto my-5 rounded-md bg-[#002b5b] px-3 py-2 text-xs font-normal text-white"
                      >
                        Load more
                      </span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default MediaList;
