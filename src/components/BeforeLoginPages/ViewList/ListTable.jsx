"use client";

import { useEffect, useState, Fragment } from "react";
import Link from "next/link";
import { HiArrowSmallLeft, HiXMark } from "react-icons/hi2";
import userService from "../../../Services/user.service";
import { VIEW_MEDIA_LIST } from "../../../constants";
import tokenService from "../../../Services/token.service";
// import { useNotification } from "../../ErrorAlert/ErrorContextNotification";
import BuildCampaign from "../../Campaign/BuildCampaign";

const ListTable = ({ listName, id }) => {
  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState(search); // add this if not already declared
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewAllList, setViewAllList] = useState([]);
  const [token, setToken] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const [selectAllLabel, setSelectAllLabel] = useState("Select All");
  const [selectedJournalists, setSelectedJournalists] = useState([]);
  // const [selectedJournalistsLength, setLength] = useState(0);
  // const [postDataToCrm, setPostDataToCrm] = useState([]);
  const [excludeJournalists, setExcludeJouranlists] = useState([]);

  const [totalCount, setTotalCount] = useState(0);
  const articlesPerPage = 10; // Assuming 10 articles per page
  const totalPages = Math.ceil(totalCount / articlesPerPage);
  const [roleType, setRoleType] = useState(null);

  useEffect(() => {
    setRoleType(tokenService.getLocalRole());
  }, []);

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
    }, 1000);

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
        setCurrentPage(1);
      } else {
        viewMediaList(viewList);
      }
      return;
    }
  }, [id, currentPage, debouncedSearch]);

  const storeIdWhileLogin = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <section
      className={`container mx-auto p-5 ${
        roleType?.includes("Freebies") ||
        roleType?.includes("Agency") ||
        roleType?.includes("Enterprise")
          ? "lg:p-20 lg:pt-4"
          : "lg:p-20 lg:pt-4"
      }`}
    >
      <Link
        className="flex gap-2 items-center w-fit"
        href={
          roleType?.includes("Freebies") ||
          roleType?.includes("Agency") ||
          roleType?.includes("Enterprise")
            ? "/pro-list"
            : "/projournalist-list"
        }
      >
        <HiArrowSmallLeft /> Back
      </Link>
      <h2 className="text-gray-700 text-lg font-semibold mt-4">
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
      </div>

      <table className="w-full responsive-table">
        <thead>
          <tr
            className={
              !(
                roleType?.includes("Freebies") ||
                roleType?.includes("Agency") ||
                roleType?.includes("Enterprise")
              )
                ? `bg-[#01438D] border border-[#EAECF0] sm:text-sm px-4 py-3 text-[#F1F1E6]`
                : `bg-[#cccccc] border border-[#EAECF0] sm:text-sm px-4 py-3 text-gray-900`
            }
          >
            {/* <th>
              <span className="flex items-center p-3">
               
              </span>
            </th> */}
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
                  {/* <td className="align-top py-3 ">
                    <input
                      type="checkbox"
                      name={curItem?.intJournalistId}
                      id={curItem?.intJournalistId}
                      className="peer/published h-4 w-4 accent-[#FF3EA5]"
                      value="abc"
                      checked={selectedJournalists?.includes(
                        curItem?.intJournalistId
                      )}
                      disabled={selectAllLabel === "Unselect All" && true}
                      onChange={() => handleSelect(curItem.intJournalistId)}
                    />
                  </td> */}
                  <td
                    data-label="Name"
                    className="font-[500] text-sm px-4 py-3 border border-[#EAECF0]"
                  >
                    <p className="text-[#002B5B]">
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
                    <button
                      className="underline decoration-[#0055FF]"
                      type="button"
                      onClick={() => {
                        storeIdWhileLogin(curItem?.intJournalistId);
                      }}
                    >
                      View Profile
                    </button>
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
      {isModalOpen && (
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
                href={`/login/${listName}/${id}`}
              >
                Login
              </Link>

              <Link
                className="border border-[#01438D] text-[#F5F5F5] bg-[#01438D] py-1 px-3 rounded-md font-[600] text-sm sm:text-md"
                href={`/signup/${listName}/${id}`}
              >
                Sign up
              </Link>
            </div>
          </section>
        </div>
      )}

      {isOpen && (
        <BuildCampaign
          selectAllLabel={selectAllLabel}
          open={isOpen}
          filterValue={selectedJournalists}
          onClose={() => {
            setIsOpen(false);
            document.body.classList.remove("overflow-hidden");
          }}
          selectedJournalists={selectedJournalists}
          excludeJournalists={excludeJournalists}
        />
      )}
    </section>
  );
};

export default ListTable;
