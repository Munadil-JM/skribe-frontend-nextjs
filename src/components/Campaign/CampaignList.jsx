"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Spinner from "../../Services/Spinner";
import userService from "../../Services/user.service";
import { DELETEJOURNALISTFROMLIST } from "../../constants";
import Tooltip from "../Tooltip/Tooltip";
import PitchAList from "./PitchAList";
import { GETLISTDETAILS } from "../../constants";
import { useNotification } from "../ErrorAlert/ErrorContextNotification";

const CampaignList = ({ id }) => {
  // const [countDeps, setcount] = useState(0);
  // const dispatch = useDispatch();
  // const { listName, listDescription, listDate, count, journalists } =
  //   useListDetails(id, countDeps);

  // const [listRecord, setListRecord] = useState([]);

  // const url = `${GETLISTDETAILS}`;
  // const { isdata, loadMore, loadingMore, noMore } = useLeftJournoSearch(
  //   null,
  //   null,
  //   `${url + id}&pageSize=20`,
  //   null,
  //   null
  // );

  // useEffect(() => {

  //   setListRecord(isdata);
  // }, [isdata]);

  // useInfiniteScroll(loadMore);

  // const [selectedJournalists, setSelectedJournalists] = useState([]);

  // const [journoLength, setJournoLength] = useState(0);
  // useEffect(() => {
  //   if (listRecord) {
  //     setJournoLength(listRecord.length);
  //   }
  // }, [listRecord]);

  // const [isOpen, setIsOpen] = useState(false);

  // const [selectedOption, setSelectedOption] = useState("");

  // const handleOptionChange = (journos) => {
  //   setSelectedOption(journos);
  // };

  // const formatDate = (date) => {
  //   const date1 = new Date(date);
  //   const formattedDate = date1.toLocaleDateString("en-GB");
  //   return formattedDate;
  // };

  // const downloadExcel = () => {
  //   const dataToExport = journalists.map((item) => ({
  //     Name: item.name,
  //     "Outlet Name": item.outlet.map((outlet) => outlet.outletName).join(","), //.map(journalist => journalist.outlet.map(outlet => outlet.outletName).join(',')).join('|'),

  //     "Primary Beat": item.beat.find((beat) => beat.beatType === "Primary")
  //       ?.beat,

  //     Mobile: item.contactDetails.find((contact) => contact.type === "Mobile")
  //       ?.value,
  //     Phone: item.contactDetails.find((contact) => contact.type === "Phone")
  //       ?.value,
  //     "Work Email": item.contactDetails.find(
  //       (contact) => contact.type === "Work Email"
  //     )?.value,

  //     "Personal Email": item.contactDetails.find(
  //       (contact) => contact.type === "Personal Email"
  //     )?.value,
  //     City: item.city,
  //   }));
  //   const worksheet = XLSX.utils.json_to_sheet(dataToExport);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  //   XLSX.writeFile(workbook, `${listName}.xlsx`);
  // };
  const router = useRouter();
  const { showNotification } = useNotification();
  const success = (msg, type) => showNotification(msg, type);
  const warning = (msg, type) => showNotification(msg, type);
  // const error = (msg, type) => showNotification(msg, type);
  const [listRecord, setListRecord] = useState([]);
  const [journalist, setJournalist] = useState([]);
  const [token, setToken] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [count, setCount] = useState(0);
  const [selectedJournalists, setSelectedJournalists] = useState([]);
  const formatDate = (date) => {
    const date1 = new Date(date);
    const formattedDate = date1.toLocaleDateString("en-GB");
    return formattedDate;
  };

  let url = `${GETLISTDETAILS} ${id}&pageSize=20`;
  const getcampList = async () => {
    setStatus(true);
    await userService
      .get(url)
      .then((response) => {
        if (response?.response?.status === "Ok") {
          setListRecord(response?.listDetail);
          setJournalist((prev) => {
            if (journalist?.length > 0) {
              return [...prev, ...response?.listDetail?.journalists];
            }
            return [...response?.listDetail?.journalists];
          });
          // setJournalist((prevData) => [
          //   ...prevData,
          //   ...response?.listDetail?.journalists,
          // ]);

          setCount(response?.listDetail?.count);

          response?.nextpagetoken?.token !== ""
            ? setToken(response?.nextpagetoken?.token)
            : setToken("");
        }
      })
      .catch((error) => {})
      .finally(() => {
        setStatus(false);
      });
  };

  const goBack = () => {
    router.push("/campaign-summary");
  };

  const handleScroll = () => {
    if (token !== "") {
      url += "&token=" + encodeURIComponent(token);
      getcampList();
    }
  };

  const handleJournalist = (rowId) => {
    const updatedCheckboxes = [...selectedJournalists];

    if (updatedCheckboxes.includes(rowId)) {
      updatedCheckboxes.splice(updatedCheckboxes.indexOf(rowId), 1);
    } else {
      updatedCheckboxes.push(rowId);
    }

    setSelectedJournalists(updatedCheckboxes);
  };

  const handleDeleteClick = () => {
    if (selectedJournalists.length <= 0) {
      warning(
        "Please select at least one journalist to delete from the list",
        "warning"
      );
    } else {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete the selected journalist(s)?"
      );

      if (confirmDelete) {
        try {
          userService
            .delete(`${DELETEJOURNALISTFROMLIST}${id}`, selectedJournalists)
            .then((result) => {
              if (result?.data > 0) {
                // let counting = journalist?.length - selectedJournalists.length;
                setCount(count - selectedJournalists?.length);
                setJournalist(
                  journalist.filter(
                    (j) => !selectedJournalists.some((sj) => sj === j.id)
                  )
                );
                success(result?.response?.message, "success");
                setSelectedJournalists([]);
              } else {
                router.back("/campaign-manager");
              }
            });
        } catch (error) {
          //dispatch(ErrorAlert(error.message));
          console.log(error?.message);
        }
      }
    }
  };

  useEffect(() => {
    getcampList();
  }, []);

  return (
    <div>
      <section
        className="sticky bottom-1 left-0 top-[64px] z-10 flex gap-x-8 bg-white"
        style={{ borderBottom: "1px solid rgb(209 213 219)" }}
      >
        <div className="section flex w-11/12 items-center gap-x-6 ">
          <div className="hidden w-4/12 pl-8 md:flex md:w-7/12 lg:w-1/3">
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
                <li className="flex items-center">
                  {listRecord?.listName?.vchCampaignName}
                </li>
              </ul>

              <div className="relative flex gap-x-3">
                {/* <Tooltip content="Mail">
                  <button
                    className="material-icons-outlined rounded-[5px] border border-[#FF3EA5] bg-[#FF3EA5] px-2 py-1 text-gray-400 text-white"
                    onClick={() => {
                      setIsOpen(true);
                    }}
                  >
                    mail
                  </button>
                </Tooltip> */}
                {/* <Tooltip content="Download">
                  <button
                    className=" flex items-center whitespace-nowrap rounded-[5px] border border-[#8260b6] px-2  py-1 text-[#8260b6]"
                    onClick={downloadExcel}
                  >
                    <i className="material-icons">cloud_download</i>
                  </button>
                </Tooltip> */}
                <Tooltip content="Delete">
                  <button
                    className=" flex items-center whitespace-nowrap rounded-[5px] border border-[#8260b6] px-2  py-1  text-[#8260b6]"
                    onClick={handleDeleteClick}
                  >
                    <i className="material-icons">delete</i>
                  </button>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section w-11/12 p-6 py-6 pl-8 pr-0">
        {/* {journoLength !== 0 && ( */}
        <div className="mb-2 flex w-full items-center rounded-md  border border-gray-300 pl-5">
          <div className="w-1/4">
            {/* <img src={imageSrc} alt="Your Image Alt Text" className="mb-4 w-42 h-40" /> */}
            <span className="material-icons-outlined icon-145 text-neutral-400">
              support_agent
            </span>
          </div>
          <div className="w-1/4">
            <p className="font-medium text-sm text-gray-900">
              Campaign: {listRecord?.listName?.vchCampaignName} ({count})
            </p>
            {/* <p className="font-semibold text-gray-500">({count})</p> */}
            <p className=" text-sm text-gray-700">
              Description: {listRecord?.listName?.vchListDescription}
            </p>
            <p className=" text-xs mt-4 text-gray-700">
              Created Date: {formatDate(listRecord?.listName?.dtCreatedDate)}
            </p>
            {/* <p>
              <Link
              	href={`/list-tracking/${id}`}
                className="font-medium text-blue-700"
              >
                List Tracking
              </Link>
            </p> */}
          </div>
        </div>
        {/* )} */}
        <div className=" relative  rounded-md border  border-gray-300">
          {/* {journoLength == 0 && (
            <div>
              <div className="opegue-4 absolute inset-0 bg-gray-600">
                <div className="lft50 absolute">
                  <Spinner status={true} />
                </div>
              </div>
            </div>
          )} */}
          {journalist?.length === 0 && (
            <div>
              <div className="opegue-4 absolute inset-0 bg-gray-600">
                <div className="lft50 absolute">
                  <Spinner status={true} />
                </div>
              </div>
            </div>
          )}
          <div className="scroll relative h-[600px] overflow-y-auto rounded-md border border-gray-400">
            <table className="min-w-full">
              {journalist?.length !== 0 && (
                <thead className="sticky top-0 bg-slate-50">
                  <tr>
                    <th className="border-b text-sm font-medium border-slate-300 p-4 text-left text-gray-700"></th>
                    <th className="border-b text-sm font-medium  border-slate-300 p-4 text-left text-gray-700">
                      Journalist Info
                    </th>
                    <th className="border-b text-sm  font-medium border-slate-300 p-4 text-left text-gray-700">
                      Contact
                    </th>
                    <th className="border-b text-sm  font-medium border-slate-300 p-4 text-left text-gray-700">
                      Location
                    </th>
                  </tr>
                </thead>
              )}
              {journalist?.length > 0 && (
                <tbody>
                  {journalist?.map((journo) => (
                    <tr key={journo.id}>
                      <td className="border-b border-slate-300 p-4 text-slate-500 ">
                        <input
                          name="journalistSelection"
                          type="checkbox"
                          checked={selectedJournalists.includes(journo.id)}
                          onChange={() => handleJournalist(journo.id)}
                          className="peer/published h-4 w-4 accent-[#ff3ea5]"
                        />
                      </td>
                      <td className="border-b border-slate-300 p-4 text-slate-500">
                        <p className="text-xs font-medium text-blue-700">
                          <Link href={`/journalist-profile/${journo?.id}`}>
                            {journo?.name}
                          </Link>
                        </p>
                        <p className="text-xs">{journo?.title}</p>
                        <ul>
                          {journo?.outlet?.map((otlt) => (
                            <li key={otlt?.outletId}>
                              <p className="text-xs">{otlt?.outletName}</p>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="border-b border-slate-300 p-4 text-slate-500">
                        <ul>
                          {!!journo?.contactDetails?.length > 0 ? (
                            journo?.contactDetails?.map((contact, index) => (
                              <li key={index} className="flex gap-x-2">
                                <p className="text-xs font-medium">
                                  {contact?.type}:
                                </p>
                                <p className="text-xs">{contact?.value}</p>
                              </li>
                            ))
                          ) : (
                            <p className="text-xs font-medium">N/A</p>
                          )}
                        </ul>
                      </td>
                      <td className="border-b border-slate-300 p-4 text-xs text-slate-500">
                        {journo?.city}
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
            {token && (
              <div className="flex items-center">
                {status ? (
                  <span className="mx-auto my-5 rounded-md bg-gray-500 px-3 py-2 text-sm font-normal text-white  md:w-auto md:border-0">
                    Loading...
                  </span>
                ) : (
                  <Link
                    href=""
                    onClick={() => handleScroll()}
                    className="mx-auto my-5 rounded-md bg-[#002b5b] px-3 py-2 text-sm font-normal text-white  md:w-auto md:border-0"
                  >
                    Load more
                  </Link>
                )}
              </div>
            )}
          </div>
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

export default CampaignList;
