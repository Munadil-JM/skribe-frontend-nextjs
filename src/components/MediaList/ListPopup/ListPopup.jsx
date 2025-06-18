"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import {
  ADD_JOURNO_MEDIA_LIST,
  baseURL,
  DELETE_LIST_RECORD,
  LIST_DETAILS,
  SEARCH_MEDIA_LIST,
  UPDATE_NAME_DESC,
} from "../../../constants";
import twitter from "../../assets/twitter.png";
import linkedin from "../../assets/linkedin.png";
import userService from "../../../Services/user.service";
import { useNotification } from "../../ErrorAlert/ErrorContextNotification";

const ListPopup = ({ open, onClose, listDetailId, mediaList }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchDisplay, setSearchDisplay] = useState("");
  const displayRef = useRef(null);

  const [searchSuggest, setSearchSuggest] = useState(false);
  const [displayCategory, setDisplayCategory] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [mediaJournos, setMediaJournos] = useState([]);

  //USE FOR LIST RESULT FOLLOWING STATE
  const [ListDetail, setListDetail] = useState({});
  const [totalResult, setTotalResult] = useState(0);
  const [token, setToken] = useState("");

  //USE FOR SEARCH RESULT FOLLWOING STATE
  const [searchIsLoading, setSearchIsLoading] = useState(false);
  const [searchIsLoadMore, setSearchIsLoadMore] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchToken, setSearchToken] = useState("");
  const [searchTotalResult, setSearchTotalResult] = useState(0);

  //SHOW NOTIFICATION POPUP
  const { showNotification } = useNotification();
  const success = (msg, type) => showNotification(msg, type);
  const warning = (msg, type) => showNotification(msg, type);
  // const error = (msg, type) => showNotification(msg, type);

  // EDIT SUBJECT AND DESCRIPTION STATE
  const [editMode, setEditMode] = useState(false);
  const [listName, setListName] = useState("");
  const [listDescription, setListDescription] = useState("");

  const handleRadioChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  //DELETE LIST POPUP

  //UPDATE NAME AND DESCRIPTION IN POPUP
  useEffect(() => {
    setListName(ListDetail?.listName || "");
    setListDescription(ListDetail?.vchListDescription || "");
  }, [ListDetail]);

  const url_Name_Desc = UPDATE_NAME_DESC;

  const handleNameChange = (e) => {
    const newName = e.target.innerText.trim();
    if (newName !== listName) setListName(newName);
  };

  const handleDescriptionChange = (e) => {
    const newDescription = e.target.innerText.trim();
    if (newDescription !== listDescription) setListDescription(newDescription);
  };

  const updateNameDesc = (type = null) => {
    const updatedData = {
      listId: listDetailId,
      name: listName.trim(), // Added .trim() to avoid accidental spaces
      description: listDescription.trim(),
    };

    userService
      .post(url_Name_Desc, updatedData)
      .then((result) => {
        const status = result?.response?.status;
        if (status === "Ok") {
          success("Updated Successfully", "success");
        } else if (status === "NotFound") {
          warning(result?.response?.message || "Data not found.", "warning");
        }
      })
      .catch((error) => {
        console.error("Error updating name/description:", error);
        error(
          error?.response?.data?.message ||
            "Something went wrong while updating. Please try again.",
          "error"
        );
      });
  };

  //EDIT SUBJECT AND DESCRIPTION
  const editSubject = () => {
    setEditMode(true);
  };
  const updateContent = async () => {
    try {
      await updateNameDesc();
      setEditMode(false);
      mediaList();
    } catch (error) {
      console.log(error, "error in update content");
    }
  };
  //SEARCH REULTS FUNCTION ON PUUPUP
  let searchUrl = `${SEARCH_MEDIA_LIST}?MediaListId=${listDetailId}&PageSize=10`;

  const searchResults = (searchUrl, type = null) => {
    type !== "searchLoad"
      ? setSearchIsLoading(true)
      : setSearchIsLoadMore(true);

    userService
      .get(searchUrl)
      .then((result) => {
        if (result?.response?.status === "Ok") {
          setSearchResult((old) => [...old, ...result?.data] || null);
          setSearchToken(result?.nextpagetoken?.token || null);
          setSearchTotalResult(result?.nextpagetoken?.totalResult);
        }
      })
      .catch((error) => {
        if (error?.response?.data?.status === "BadRequest") {
          console.log(error?.response?.data?.message, "check message");
        }
      })
      .finally(() => {
        setSearchIsLoading(false);
        setSearchIsLoadMore(false);
      });
  };

  const searchLoadMore = () => {
    let updatedUrl = searchUrl;
    if (searchToken !== "") {
      if (["Journalist", "Beat"].includes(selectedCategory)) {
        updatedUrl += `&type=${selectedCategory}&searchText=${searchDisplay}&token=${encodeURIComponent(searchToken)}`;
        searchResults(updatedUrl, "searchLoad");
      }
    }
  };
  //SEARCH SUGGETION POPUP WILL OPEN FROM BELOW CODE
  const searchSuggestion = () => {
    if (!searchDisplay?.length) return; // Exit early if no search text

    if (!selectedCategory) {
      warning(
        "Please select either Journalist or Beat to perform the search.",
        "warning"
      );
      return;
    }
    if (searchDisplay?.length <= 2) {
      warning("Please enter atleast 3 characters to search", "warning");
      return;
    }

    if (["Journalist", "Beat"].includes(selectedCategory)) {
      searchUrl += `&type=${selectedCategory}&searchText=${searchDisplay}`;
      // callAPihere for searchResults
      searchResults(searchUrl);
      setSearchSuggest(true);
    } else {
      setDisplayCategory(false);
    }
  };

  const url = `${LIST_DETAILS}?ListId=${listDetailId}&pageSize=20`;
  const listDetails = (updatedUrl, type = null) => {
    type !== "load" ? setIsLoading(true) : setIsLoadMore(true);

    userService
      .get(updatedUrl)
      .then((result) => {
        if (result?.response?.status === "Ok") {
          setMediaJournos((old) => [...old, ...result?.data?.journo] || null);
          if (type !== "load") {
            setListDetail(result?.data?.details || null);
          }
          setToken(result?.nextpagetoken?.token || null);
          setTotalResult(result?.nextpagetoken?.totalResult);
        }
      })
      .catch((error) => {
        if (error?.response?.data?.status === "BadRequest") {
          console.log(error?.response?.data?.message, "check message");
        }
      })
      .finally(() => {
        setIsLoading(false);
        setIsLoadMore(false);
      });
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearchResult([]);
      setSearchToken("");
      setSearchTotalResult();
      searchSuggestion();
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, [searchDisplay, selectedCategory]);

  useEffect(() => {
    if (open) {
      setListDetail({});
      setTotalResult();
      setMediaJournos([]);
      setIsVisible(true);
      listDetails(url);
    } else {
      setTimeout(() => setIsVisible(false), 300);
      setEditMode(false);
      setSearchDisplay("");
      setSearchResult([]);
    }
  }, [open, listDetailId]);

  const loadMore = () => {
    let updatedUrl = url;
    if (token !== "") {
      updatedUrl += `&token=${encodeURIComponent(token)}`;
      listDetails(updatedUrl, "load");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (displayRef.current && !displayRef.current.contains(e.target)) {
        setSearchSuggest(false);
        // setSearchDisplay("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  //ADD JOURNALIST TO EXISTING LIST VIA LIST POPUP SEARCHBAR
  const addtoList = (id) => {
    const url_Media_List = ADD_JOURNO_MEDIA_LIST;
    let addRecord = {
      listId: listDetailId,
      addJournalistIds: [id],
    };

    userService
      .post(url_Media_List, addRecord)
      .then((result) => {
        const status = result?.response?.status;
        if (status === "Ok") {
          const updatedResult = searchResult?.map((record) => {
            if (record?.id === id) {
              return {
                ...record,
                isInMediaList: true,
              };
            } else {
              return record;
            }
          });
          setMediaJournos([]);
          listDetails(url);
          setSearchResult(updatedResult);

          success("Jouranalist Added to List", "success");
        } else if (status === "NotFound") {
          warning(result?.response?.message || "Data not found.", "warning");
        } else if (status === "LimitExceeded") {
          warning(result?.response?.message || "Data not found.", "warning");
        } else if (status === "Error") {
          warning(result?.response?.message || "Data not found.", "warning");
        }
      })
      .catch((error) => {
        console.error("Error updating name/description:", error);
        error(
          error?.response?.data?.message ||
            "Something went wrong while updating. Please try again.",
          "error"
        );
      });
  };

  //DELETE RECORD FROM LIST
  const deleteRecord = (id) => {
    console.log(mediaJournos, "check media journos");
    if (mediaJournos?.length === 1) {
      warning(
        "The last record in the media list cannot be deleted.",
        "warning"
      );
      return;
    }

    const deltedData = {
      listId: listDetailId,
      deleteJournalistIds: [id],
    };
    userService
      .post(`${DELETE_LIST_RECORD}`, deltedData)
      .then((result) => {
        if (result?.response?.status === "Ok") {
          success("Record Deleted Successfully", "success");
          let sortedData = mediaJournos?.filter(
            (curItem) => curItem?.id !== id
          );
          setMediaJournos(sortedData);
          setTotalResult(totalResult - 1);
          // setMediaJournos([]);
          // listDetails(url);
        } else if (result?.response?.status === "NotFound") {
          warning(result?.response?.message, "warning");
        } else if (result?.response?.status === "NotDeleteAllRecord") {
          warning(
            "Cannot delete the last record — the list must contain at least one journalist.",
            "warning"
          );
        }
      })
      .catch((error) => {
        if (error?.Status === "Error") {
          error(error?.message, "error");
        } else {
          error(
            error?.response?.data?.message ||
              "Something went wrong while deleting. Please try again.",
            "error"
          );
        }
      });
  };

  if (!isVisible) return null;
  return createPortal(
    <>
      <div
        className={`fixed inset-0 z-[80] transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      >
        <div className="fixed inset-0 bg-gray-900 opacity-70"></div>
        <div
          className={`fixed top-0 right-0 w-4/5 md:w-4/5 lg:w-3/5 xl:w-2/4 h-full bg-white shadow-2xl z-[85] transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="bg-[#002b5b] p-4 relative">
            {!!editMode && editMode ? (
              <div
                onClick={updateContent}
                className="absolute right-10 top-10 border border-gray-100 px-2 py-1 hover:text-gray-200 rounded-md hover:bg-gray-400 hover:border-gray-100 cursor-pointer"
              >
                <span className="material-icons-outlined text-white icon-16">
                  check
                </span>
              </div>
            ) : (
              <div
                onClick={editSubject}
                className="absolute right-10 top-10 border  px-2 py-1 border-gray-100 hover:bg-gray-400 rounded-md hover:border-gray-100 cursor-pointer"
              >
                <span className="material-icons-outlined text-white icon-16">
                  edit
                </span>
              </div>
            )}

            <button onClick={onClose} className="absolute right-2 top-2">
              <span className="material-icons-outlined rounded-full p-1 text-white hover:bg-gray-200 hover:text-gray-200 icon-20">
                close
              </span>
            </button>
            <div className="text-white">
              <div className="mr-24">
                <span className="text-[10px] font-normal text-gray-600 bg-white px-1 rounded-sm">
                  Last edited:{" "}
                  {convertDate(
                    ListDetail?.dtCreatedDate,
                    ListDetail?.lastEdited
                  )}
                </span>

                <h3
                  className={`text-2xl font-medium focus:outline-0 mr-24 leading-7 ${editMode && "bg-[#627e9f] rounded-lg text-white p-2"}`}
                  contentEditable={editMode}
                  suppressContentEditableWarning={true}
                  onBlur={handleNameChange} // Changed from `onInput` to `onBlur` for better stability
                >
                  {listName}
                </h3>

                <p
                  className={`text-xs font-normal focus:outline-0 mr-24 mt-2 ${editMode && "bg-[#627e9f] rounded-lg text-white p-2"}`}
                  contentEditable={editMode}
                  suppressContentEditableWarning={true}
                  onBlur={handleDescriptionChange} // Changed from `onInput` to `onBlur`
                >
                  {listDescription || null}
                </p>
              </div>
            </div>
          </div>
          <main className="px-4 mt-4 h-full">
            <header className="flex justify-between items-center">
              <h3>All Journalists in this Media List ({totalResult})</h3>
              <div className="flex items-center rounded-lg border border-gray-600 bg-white pl-2 md:w-[300px] xl:w-[370px] relative z-20">
                <span className="material-icons-outlined text-sm text-gray-600">
                  search
                </span>
                <input
                  ref={displayRef}
                  type="search"
                  className="text-sm w-full rounded-lg bg-white pl-1 pr-3 py-1 text-gray-700 focus:outline-none"
                  placeholder="Search By Name, Beat"
                  value={searchDisplay}
                  onChange={(e) => setSearchDisplay(e?.target?.value)}
                  onFocus={() => setSearchSuggest(true)}
                />
                {/* {displayCategory && ( */}
                {searchSuggest && (
                  <div
                    ref={displayRef}
                    className="bg-white w-full shadow-lg absolute left-0 top-[-1px] pt-10 rounded-mdborder border-gray-400 -z-[4] p-2 text-gray-600"
                  >
                    <div className="flex gap-x-3 text-xs">
                      <div className="flex gap-x-1 items-center">
                        <input
                          type="radio"
                          id="Journalist"
                          name="Journalist"
                          value="Journalist"
                          className="peer"
                          checked={selectedCategory === "Journalist"}
                          onChange={handleRadioChange}
                          onFocus={() => setSearchSuggest(true)}
                        />
                        <label
                          htmlFor="Journalist"
                          className="cursor-pointer text-gray-600 peer-checked:text-blue-600"
                        >
                          Journalist
                        </label>
                      </div>

                      <div className="flex gap-x-1 items-center">
                        <input
                          type="radio"
                          id="Beat"
                          name="Journalist"
                          value="Beat"
                          className="peer"
                          checked={selectedCategory === "Beat"}
                          onChange={handleRadioChange}
                        />
                        <label
                          htmlFor="Beat"
                          className="cursor-pointer text-gray-600 peer-checked:text-blue-600"
                        >
                          Beat
                        </label>
                      </div>
                    </div>

                    {searchDisplay && (
                      <div
                        onMouseDown={(e) => e.stopPropagation()}
                        className="overflow-x-hidden overflow-scroll max-h-[200px] mt-2"
                      >
                        {searchResult?.length > 0 && (
                          <div className="text-sm text-gray-6400 mb-2">
                            Total Results: {searchTotalResult}
                          </div>
                        )}
                        {searchIsLoading ? (
                          <div className="text-xs text-center">Loading...</div>
                        ) : searchResult?.length > 0 ? (
                          <>
                            {searchResult?.map((result, index) => (
                              <div
                                key={result?.id || index}
                                className="flex justify-between mb-2"
                              >
                                <div className="flex gap-x-2 items-center">
                                  {result?.vchPhotoPath !== "" ? (
                                    <>
                                      <img
                                        src={encodeURI(
                                          `${baseURL}${result?.vchPhotoPath}`
                                        )}
                                        className="w-10 h-10 bg-gray-300 rounded-full"
                                        alt=""
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <div className="w-10 h-10 bg-gray-300 leading-1 rounded-full flex items-center justify-center text-xs text-center">
                                        No Img
                                      </div>
                                    </>
                                  )}
                                  <div className="flex flex-col">
                                    <h3 className="text-xs text-gray-700 font-medium leading-4">
                                      {result?.value}
                                    </h3>
                                    <p className="text-xs text-gray-400">
                                      {result?.outlets
                                        ?.map((outlet) => outlet?.value)
                                        .join(", ") || null}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex gap-x-2 items-center">
                                  <Link
                                    target="_blank"
                                    href={`/journalist-profile/${result?.id}`}
                                    className="bg-[#318fff] rounded-md text-white text-xs px-2 py-1"
                                  >
                                    View
                                  </Link>
                                  {!!result?.isInMediaList &&
                                  result?.isInMediaList ? (
                                    <span className="material-icons-outlined icon-12 rounded-full bg-green-500 text-white p-1">
                                      check
                                    </span>
                                  ) : (
                                    <span
                                      onClick={() => addtoList(result?.id)}
                                      className="material-icons-outlined icon-12 rounded-full bg-gray-200 p-1  cursor-pointer hover:bg-gray-300"
                                    >
                                      add
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </>
                        ) : (
                          <>
                            <div className="text-xs text-center">
                              No Records Found
                            </div>
                          </>
                        )}

                        {searchIsLoadMore && (
                          <div className="text-center w-full mt-5">
                            <span className="my-5 rounded-md bg-gray-500 px-3 py-1 text-[10px] font-normal text-white">
                              Loading...
                            </span>
                          </div>
                        )}
                        {searchToken && !searchIsLoading && (
                          <div className="text-center w-full mt-5">
                            <span
                              onClick={searchLoadMore}
                              className="cursor-pointer mx-auto my-5 rounded-md bg-[#002b5b] px-2 py-1 text-[10px] font-normal text-white"
                            >
                              Load more
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </header>
            <section className="mt-4 mb-10 flex flex-wrap gap-x-4 gap-y-4 max-h-[calc(100vh-270px)] overflow-y-auto">
              {isLoading ? (
                <div className="text-xs text-center">Loading...</div>
              ) : mediaJournos?.length > 0 ? (
                mediaJournos?.map((result, index) => (
                  <div key={index} className="bg-white shadow-lg basis-[calc(50%-8px)] flex gap-x-4 items-start p-5 border border-gray-200 rounded-md relative">
                    {!!editMode && editMode && (
                      <button
                        className="absolute right-0 top-0 bg-gray-500 flex rounded-sm"
                        onClick={() => deleteRecord(result?.id)}
                      >
                        <span className="material-icons-outlined rounded-full p-1 text-white hover:text-white icon-10">
                          close
                        </span>
                      </button>
                    )}
                    {result?.userImg !== "" ? (
                      <Link
                        href={`/journalist-profile/${result?.id}`}
                        target="_blank"
                      >
                        {" "}
                        <img
                          src={encodeURI(`${baseURL}${result?.userImg}`)}
                          className="w-12 h-12 bg-gray-400 rounded-full"
                          alt=""
                        />
                      </Link>
                    ) : (
                      <Link
                        href={`/journalist-profile/${result?.id}`}
                        target="_blank"
                      >
                        <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-xs">
                          No Img
                        </div>
                      </Link>
                    )}
                    <div className="flex flex-col">
                      <h3 className="text-sm">
                        <Link
                          href={`/journalist-profile/${result?.id}`}
                          target="_blank"
                        >
                          {result?.name}
                        </Link>
                      </h3>
                      <h5 className="text-[12px] text-gray-700 leading-3">
                        {result?.outlet
                          ?.map((outlet) => outlet?.value)
                          .join(", ")}
                      </h5>
                      <p className="text-[11px] text-gray-500 mt-2">
                        {result?.beat?.map((beat) => beat?.value).join(", ")}
                      </p>
                      <div className="flex items-center">
                        <span className="material-icons-outlined icon-16 text-gray-500">
                          location_on
                        </span>
                        <span className="text-gray-500 text-xs">
                          {result?.city?.charAt(0)?.toUpperCase() +
                            result?.city?.slice(1)?.toLowerCase()}
                        </span>
                      </div>
                      <div className="flex mt-2">
                        {result?.socials?.map((social, index) => (
                          <div key={index} className="flex gap-x-2 w-full">
                            <Link
                              
                              href={social?.linkdIn}
                              target="_blank"
                            >
                              <img
                                src={linkedin.src}
                                alt=""
                                className="rounded-[5px] w-6 h-6 bg-[#007EBB]"
                              />
                            </Link>
                            <Link
                              href={`https://x.com/${social?.twitter}`}
                              target="_blank"
                            >
                              <img
                                src={twitter.src}
                                alt=""
                                className="rounded-[5px] w-6 h-6 bg-[#000]"
                              />
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-xs text-center">No Records Found</div>
              )}
              {isLoadMore && (
                <div className="text-center w-full mt-5">
                  <span className="my-5 rounded-md bg-gray-500 px-3 py-2 text-xs font-normal text-white">
                    Loading...
                  </span>
                </div>
              )}
              {token && !isLoading && (
                <div className="text-center w-full mt-5">
                  <span
                    onClick={loadMore}
                    className="cursor-pointer mx-auto my-5 rounded-md bg-[#002b5b] px-3 py-2 text-xs font-normal text-white"
                  >
                    Load more
                  </span>
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default ListPopup;
