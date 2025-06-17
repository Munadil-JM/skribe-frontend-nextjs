"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { HiArrowSmallLeft } from "react-icons/hi2";
import userService from "../../../Services/user.service";
import { PRECRM_POSTDATA, VIEW_MEDIA_LIST } from "../../../constants";
import { STATICCOUNT } from "../../../constants";
// import tokenService from "../../../Services/token.service";
import { useNotification } from "../../ErrorAlert/ErrorContextNotification";
import BuildCampaign from "../../Campaign/BuildCampaign";

const ListTable = ({ listName, id }) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search); // add this if not already declared
  const [isLoading, setIsLoading] = useState(true);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewAllList, setViewAllList] = useState([]);
  const [token, setToken] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const [selectAllLabel, setSelectAllLabel] = useState("Select All");
  const [selectedJournalists, setSelectedJournalists] = useState([]);
  const [selectedJournalistsLength, setLength] = useState(0);

  const [totalCount, setTotalCount] = useState(0);
  const articlesPerPage = 10; // Assuming 10 articles per page
  const totalPages = Math.ceil(totalCount / articlesPerPage);
  // const [roleType, setRoleType] = useState(tokenService.getLocalRole());
  // const [selectedBeats, setSelectedBeats] = useState([]);

  const { showNotification } = useNotification();
  const success = (msg, type) => showNotification(msg, type);
  const warning = (msg, type) => showNotification(msg, type);
  // const error = (msg, type) => showNotification(msg, type);

  const handlePagination = (operation) => {
    setCurrentPage((prevPage) => {
      if (
        operation === "increment" &&
        currentPage * articlesPerPage < totalCount
      ) {
        return prevPage + 1;
      } else if (operation === "decrement" && prevPage > 1) {
        return prevPage - 1;
      }
      return prevPage;
    });
  };

  let viewMedia = VIEW_MEDIA_LIST;
  const viewMediaList = (url) => {
    setIsLoading(true);
    userService
      .get(url)
      .then((res) => {
        if (res?.response?.status === "Ok") {
          setViewAllList(res?.data);
          setToken(res?.nextpagetoken?.token);
          setTotalCount(res?.nextpagetoken?.totalResult);
        } else if (res.status === "NotFound") {
          alert(res?.message);
        }
      })
      .catch((errors) => {
        console.log(errors, "check error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Debounce effect for search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 2000);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    let viewList = `${viewMedia}${id}`;

    if (currentPage > 1 && token && debouncedSearch?.length >= 1) {
      viewList += `?pageSize=10&token=${encodeURIComponent(token)}&SearchFilter=${debouncedSearch}`;
      viewMediaList(viewList);
      return;
    } else if (currentPage > 1 && token) {
      viewList += `?pageSize=10&token=${encodeURIComponent(token)}`;
      viewMediaList(viewList);
      return;
    } else if (debouncedSearch?.length >= 1) {
      if (currentPage !== 1) {
        setCurrentPage(1);
      } else {
        viewList += `?pageSize=10&SearchFilter=${debouncedSearch}`;
        viewMediaList(viewList);
      }
      return;
    } else {
      if (currentPage !== 1) {
        setCurrentPage(1); // Same here
      } else {
        viewMediaList(viewList);
      }
      return;
    }
  }, [id, currentPage, debouncedSearch]);

  // const createList = (e, beatId) => {
  //   const { checked } = e.target;
  //   const newSelectedBeats = checked
  //     ? [...selectedBeats, beatId]
  //     : selectedBeats.filter((id) => id !== beatId);
  //   debugger;
  //   setSelectedBeats(newSelectedBeats);
  //   console.log(newSelectedBeats, "check selected list");
  // };

  const handleSelectAll = () => {
    if (selectedJournalists.length === viewAllList.length) {
      setSelectedJournalists([]);
      setSelectAllLabel("Select All");
    } else {
      const allIds = viewAllList.map(
        (journalist) => journalist.intJournalistId
      );
      setSelectedJournalists((prevSelectedJournalists) =>
        prevSelectedJournalists.length === allIds.length ? [] : allIds
      );

      setSelectAllLabel((prevLabel) =>
        prevLabel === "Select All" ? "Unselect All" : "Select All"
      );
    }
  };

  const handleSelect = (journalistId) => {
    setSelectedJournalists((prevSelectedJournalists) => {
      if (prevSelectedJournalists.includes(journalistId)) {
        return prevSelectedJournalists.filter(
          (selectedId) => selectedId !== journalistId
        );
      } else {
        return [...prevSelectedJournalists, journalistId];
      }
    });
    setSelectAllLabel((prevLabel) =>
      selectedJournalists.length - 1 === viewAllList.length
        ? "Unselect All"
        : "Select All"
    );
  };

  useEffect(() => {
    if (selectAllLabel === "Unselect All" && !selectedJournalists.length) {
      setSelectAllLabel("Select All");
    }
  }, [viewAllList]);

  useEffect(() => {
    setLength(selectedJournalists.length);
  }, [selectedJournalists]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const addInCRM = () => {
    if (selectedJournalists.length === 0) {
      warning("Please make a selection", "warning");
    } else if (selectedJournalists?.length > 5) {
      warning("You can not add to crm more than 5 Journalist", "warning");
    } else {
      let { id } = JSON.parse(localStorage.getItem("userInfo"));
      const postData = {
        clientId: 0,
        userId: id,
        jourId: selectedJournalists,
      };
      userService
        .post(PRECRM_POSTDATA, postData)
        .then((dataSubmit) => {
          if (dataSubmit?.response?.status === "ReachedLimit") {
            warning(
              "CRM account limit reached. You can not add more than 50 journalist into your CRM",
              "warning"
            );
          }

          if (dataSubmit?.response?.status === "Ok") {
            success(
              dataSubmit?.insertedCount + " new journalists added to CRM ",
              "success"
            );
            for (let i = 0; i < selectedJournalists.length; i++) {
              for (let j = 0; j < viewAllList.length; j++) {
                if (
                  selectedJournalists[i] === viewAllList[j].intJournalistId &&
                  viewAllList[j].crmStatus === false
                ) {
                  viewAllList[j].crmStatus = true;
                }
              }
            }
          }
        })
        .catch((error) => error(error, "error"))
        .finally(() => {
          setSelectedJournalists([]);
        });
    }
    setViewAllList([...viewAllList]);
  };

  const buildCampPopup = () => {
    if (selectedJournalists.length === 0) {
      warning(
        "You need to select journalists to create a media list",
        "warning"
      );
    } else if (selectedJournalists.length > 0) {
      setIsOpen(true);
      document.body.classList.add("overflow-hidden");
    }
  };

  return (
    <section className="container mx-auto p-5 lg:p-20 lg:pt-4">
      <Link className="flex gap-2 items-center w-fit text-sm" href="/pro-list">
        <HiArrowSmallLeft /> Back
      </Link>
      <h2 className="text-gray-700 text-sm font-semibold mt-4">
        {decodeURIComponent(listName)}
      </h2>
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex justify-between items-center gap-10 w-full lg:w-[300px] my-6 bg-white py-1 px-2 border rounded-lg border-black/20">
          <input
            className="focus-within:ring-0 outline-0 w-[90%] text-sm text-gray-600"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Name"
          />

          <img
            className="w-6 h-6"
            src="/assets/search-icon.png"
            alt="Search icon"
          />
        </div>

        <div className="relative flex gap-x-3">
          {viewAllList?.length > 0 && (
            <>
              <Link
                className="flex items-center whitespace-nowrap rounded-[5px] border border-[#002b5b] px-3  py-0 text-xs text-[#002b5b]"
                href=""
                onClick={handleSelectAll}
              >
                {selectAllLabel}

                {selectedJournalistsLength !== 0 && (
                  <div
                    id="selectCount"
                    className="absolute flex h-9 w-9 items-center justify-center rounded-2xl bg-[#fac540] text-center align-middle text-xs font-bold text-[#002b5b]"
                  >
                    {selectAllLabel === "Unselect All" &&
                    totalCount <= STATICCOUNT
                      ? totalCount
                      : selectAllLabel === "Unselect All"
                        ? STATICCOUNT
                        : selectedJournalistsLength}
                  </div>
                )}
              </Link>

              <input
                type="button"
                value="Add To CRM"
                // disabled={selectedJournalists.length > 5 && true}
                className="flex cursor-pointer items-center whitespace-nowrap rounded-[5px] border border-[#002b5b]  px-3 py-1 text-xs  text-[#002b5b]"
                // href="/customcrm"
                onClick={() => addInCRM()}
              />

              <div className="relative flex">
                <Link
                  href="#"
                  onClick={() => buildCampPopup()}
                  className="relative flex items-center rounded-[5px] border border-[#002b5b]  px-3  py-1 text-xs  text-[#002b5b]"
                >
                  {/* Build Campaign */}
                  Create List
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      <table className="w-full responsive-table">
        <thead>
          <tr className="bg-[#cccccc] border border-[#EAECF0] sm:text-xs px-4 py-3 text-gray-900">
            <th>
              <span className="flex items-center p-3"></span>
            </th>
            <th>
              <span className="flex items-center p-3">Name</span>
            </th>

            <th>
              <span className="flex items-center  p-3">Publication</span>
            </th>

            <th>
              <span className="flex items-center p-3">Topics Covered</span>
            </th>

            <th>
              <span className="flex items-center p-3">Location</span>
            </th>

            <th>
              <span className="flex items-center p-3 lg:w-[140px]">
                Socials
              </span>
            </th>

            <th className=" lg:w-[120px]">
              <span className="p-3">Action</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <tr>
              <td className="text-center p-4" colSpan="6">
                Loading...
              </td>
            </tr>
          ) : viewAllList?.length > 0 ? (
            viewAllList?.map((curItem, ind) => {
              return (
                <tr key={curItem?.intJournalistId + ind}>
                  <td className="align-top pt-3 border border-[#EAECF0] text-center">
                    <input
                      type="checkbox"
                      name={curItem?.intJournalistId}
                      id={curItem?.intJournalistId}
                      className="peer/published h-4 w-4 accent-[#318fff]"
                      value="abc"
                      checked={selectedJournalists?.includes(
                        curItem?.intJournalistId
                      )}
                      disabled={selectAllLabel === "Unselect All" && true}
                      onChange={() => handleSelect(curItem.intJournalistId)}
                    />
                  </td>
                  <td
                    data-label="Name"
                    className="font-[500] text-sm px-4 py-3 border border-[#EAECF0]"
                  >
                    <p className="text-[#002B5B] flex flex-col">
                      {curItem?.crmStatus !== false && (
                        <span className="px-2 py-[2px] rounded-sm text-xs self-start font-medium text-green-800 bg-green-200">
                          Added to CRM
                        </span>
                      )}
                      {curItem?.vchJournalistName}
                    </p>

                    {curItem?.journoContacts?.map((curData, index) => {
                      return (
                        <p className="text-[#ADADAD]" key={index}>
                          {curData?.value !== "N/A" && curData?.value}
                        </p>
                      );
                    })}

                    {/* <p className="text-[#ADADAD]">{curItem?.nameField.mail}</p> */}
                  </td>

                  <td
                    data-label="Publication"
                    className="text-[#667085] text-sm px-4 py-3 border border-[#EAECF0]"
                  >
                    {curItem?.vchOutletName}
                  </td>

                  <td
                    data-label="Beats"
                    className="text-[#667085] text-sm px-4 py-3 border border-[#EAECF0]"
                  >
                    {curItem?.vchIntrest}
                  </td>

                  <td
                    data-label="Location"
                    className="text-[#667085] text-sm px-4 py-3 border border-[#EAECF0]"
                  >
                    {curItem?.vchCity?.charAt(0).toUpperCase() +
                      curItem?.vchCity?.slice(1).toLowerCase()}
                    ,&nbsp;
                    {curItem?.vchState?.charAt(0).toUpperCase() +
                      curItem?.vchState?.slice(1).toLowerCase()}
                  </td>

                  <td
                    data-label="Socials"
                    className="text-[#667085] text-sm px-4 py-3 border border-[#EAECF0]"
                  >
                    <div className="flex items-center sm:justify-start flex-wrap gap-2 lg:gap-2">
                      {curItem?.journoSocials?.map((social, index) => {
                        return (
                          <Fragment key={index}>
                            {social?.vchLinkedinLink !== "" && (
                              <Link
                                href={social?.vchLinkedinLink}
                                target="_blank"
                              >
                                <img
                                  className="w-5 h-5"
                                  src="/assets/journalist-linkedin.png"
                                  alt="Linkedin logo"
                                />
                              </Link>
                            )}

                            {social?.vchInstagramLink !== "" && (
                              <Link
                                href={`${social.vchInstagramLink}`}
                                target="_blank"
                              >
                                <img
                                  className="w-5 h-5"
                                  src="/assets/journalist-instagram.png"
                                  alt="Instagram logo"
                                />
                              </Link>
                            )}

                            {social?.vchTwitter !== "" && (
                              <Link
                                href={`https://twitter.com/${social.vchTwitter}`}
                                target="_blank"
                              >
                                <img
                                  className="w-5 h-5"
                                  src="/assets/journalist-twitter.png"
                                  alt="Twitter logo"
                                />
                              </Link>
                            )}

                            {social?.vchYoutubeLinks !== "" && (
                              <Link
                                href={social?.vchYoutubeLinks}
                                target="_blank"
                              >
                                <img
                                  className="w-5 h-5"
                                  src="/assets/journalist-youtube.png"
                                  alt="Youtube logo"
                                />
                              </Link>
                            )}
                          </Fragment>
                        );
                      })}
                    </div>
                  </td>

                  <td
                    data-label=""
                    className="text-[#0055FF] text-sm px-4 py-3 border border-[#EAECF0]"
                  >
                    <Link
                      href={`/journalist-profile/${curItem?.intJournalistId}`}
                      className="underline decoration-[#0055FF]"
                      target="_blank"
                    >
                      View Profile
                    </Link>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-2">
                {!isLoading && viewAllList?.length <= 0 && "No Record Found"}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex items-center">
        {viewAllList?.length > 0 && viewAllList.length < totalCount && (
          <div className="flex items-center justify-center my-2 text-center text-[15px] gap-4">
            <div
              className={`p-2 pt-2 pb-1 rounded-[5px] border-[#333333] items-center justify-center border-[1px] ${
                currentPage === 1
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }`}
              onClick={() => currentPage > 1 && handlePagination("decrement")}
            >
              <span className="icon-16 text-sm  text-[#333333] material-icons-outlined">
                arrow_back
              </span>
            </div>
            <div className="font-[500]">{currentPage + "/" + totalPages}</div>

            {currentPage !== totalPages && (
              <div
                className={`p-2 pt-2 pb-1 rounded-[5px] border-[#333333] items-center justify-center border-[1px] ${
                  viewAllList.length > 9
                    ? "cursor-pointer"
                    : "cursor-not-allowed opacity-50"
                }`}
                onClick={() =>
                  viewAllList.length > 9 && handlePagination("increment")
                }
              >
                <span className="icon-16 text-sm  text-[#333333] material-icons-outlined">
                  arrow_forward
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pagination */}
      {/* <div className="overflow-auto pt-5 px-2 flex items-center gap-2 sm:gap-3 sm:px-4">
        <button
          className="flex items-center gap-2 pr-1 text-[#002B5B] text-sm sm:text-base disabled:opacity-50"
          type="button"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <HiArrowSmallLeft /> Previous
        </button>

        {Array.from(
          { length: Math.ceil(filteredItems.length / itemsPerPage) },
          (_, i) => {
            return (
              <button
                key={i}
                className={`${currentPage === i + 1 ? "bg-[#01438D] text-[#F5F5F5]" : "text-[#01438D]"} text-sm sm:text-base px-4 py-2 rounded-lg`}
                type="button"
                onClick={() => setCurrentPage(i + 1)}
              >
                {`${i + 1}`}
              </button>
            );
          }
        )}

        <button
          className="flex items-center gap-2 text-[#002B5B] pl-1 text-sm sm:text-base disabled:opacity-50"
          type="button"
          disabled={
            currentPage === Math.ceil(filteredItems.length / itemsPerPage)
          }
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next <HiArrowSmallRight />
        </button>
      </div> */}

      {/* View Profile */}
      {/* {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center px-3 justify-center">
          <section className="bg-white shadow-2xl flex flex-col w-4/5 sm:w-1/2 lg:w-1/4 p-5 rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-[600] text-xl sm:text-xl">View Profile</h3>

              <HiXMark
                size={20}
                className="cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              />
            </div>

            <p className="text-sm text-[#00000066] mb-4 leading-4">
              To get the details of this journalist you have to first login or
              signup to Skribe Dashboard
            </p>

            <div className="flex items-center justify-end gap-4">
              <Link
                className="border border-[#01438D] text-[#01438D] py-1 px-3 rounded-md font-[600] text-sm sm:text-md"
                href="/login"
              >
                Login
              </Link>

              <Link
                className="border border-[#01438D] text-[#F5F5F5] bg-[#01438D] py-1 px-3 rounded-md font-[600] text-sm sm:text-md"
                href="/login"
              >
                Sign up
              </Link>
            </div>
          </section>
        </div>
      )} */}

      {isOpen && (
        <BuildCampaign
          selectAllLabel={selectAllLabel}
          open={isOpen}
          filterValue={selectedJournalists}
          IdforAllJourno="allJourno"
          searchValue={debouncedSearch?.length > 0 ? debouncedSearch : ""}
          onClose={() => {
            setIsOpen(false);
            document.body.classList.remove("overflow-hidden");
          }}
          selectedJournalists={selectedJournalists}
        />
      )}
    </section>
  );
};

export default ListTable;
