"use client";

// import { useRequest } from "ahooks";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { WarningAlert } from "../../../Redux/Action/Settings";
import Spinner from "../../../Services/Spinner";
import { PRECRM_POSTDATA, GETALLJOURNO } from "../../../constants";
import { useSearchContext } from "../../../context/MainSearchContext";
import BuildCampaign from "../../Campaign/BuildCampaign";
// import { Filter } from "../../Filters/FilterContext";
// import Lf from "../../Filters/Lf";
import Tooltip from "../../Tooltip/Tooltip";
// import { getFilter } from "../../utils/Filtercb";
import { useLeftJournoSearch } from "../../utils/UrlBuilder";
import useInfiniteScroll from "../../utils/useInfiniteScroll";
import JournalistSearchRecord from "../JournalistSearchRecord";
import userService from "../../../Services/user.service";
import GetFiltersData from "../../Filters/GetFiltersData";

const ByShowJournalists = ({ showId, outletName, showName, outletId }) => {
  const dispatch = useDispatch();

  const [selectedFilters, setSelectedFilters] = useState({ count: 0 });
  const [searchByText, setSearchByText] = useState("");
  const [searchDeps, setSearchDeps] = useState(0);
  // :showId/:outletName/:showName/:outletId

  const [isOpen, setIsOpen] = useState(false);
  const [journalistResult, setJournalistResult] = useState([]);
  // const [custom, setCustom] = useState({});
  const [selectAllLabel, setSelectAllLabel] = useState("Select All");
  const [selectedJournalistsLength, setLength] = useState(0);
  const [selectedJournalists, setSelectedJournalists] = useState([]);
  const router = useRouter();
  const url = `${GETALLJOURNO}`;
  const { sVal } = useSearchContext();
  const [trackingId, setTrackingId] = useState();

  useEffect(() => {
    setTrackingId(generateUUID());
  }, []);

  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  const { isdata, loading, loadMore, loadingMore, noMore } =
    useLeftJournoSearch(
      selectedFilters,
      selectedFilters["count"],
      url + `?ShowFilter=${showId}&pageSize=60&`,
      searchDeps
    );
  const [postDataToCrm, setPostDataToCrm] = useState([]);

  useInfiniteScroll(loadMore);

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const handleSearch = (event) => {
    setSearchByText(event.target.value);
    setSearchDeps(event.target.value.length);
  };

  // const optimizedSearchRecords = useCallback(debounce(handleSearch), []);
  // const [shimmer, setShimmer] = useState(false);

  const goBack = () => {
    router.back();
  };

  const handleSelectAll = () => {
    const allIds = journalistResult?.map(
      (journalist) => journalist.intJournalistId
    );
    setSelectedJournalists((prevSelectedJournalists) =>
      prevSelectedJournalists.length === allIds.length ? [] : allIds
    );
    setSelectAllLabel((prevLabel) =>
      prevLabel === "Select All" ? "Unselect All" : "Select All"
    );
  };

  const getSelectedData = (target, journoId) => {
    handleSelect(journoId);
    AddToCrm(target.checked, journoId);
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
      selectedJournalists.length - 1 === journalistResult.length
        ? "Unselect All"
        : "Select All"
    );
  };

  const AddToCrm = (target, journoId) => {
    // const { value, checked } = target;
    const postData = postDataToCrm;
    if (target) {
      postData.push(journoId);
      setPostDataToCrm([...postData]);
    } else {
      let unSelectData = postDataToCrm.filter((curId) => curId !== journoId);
      setPostDataToCrm([...unSelectData]);
    }
  };

  const addInCRM = () => {
    if (selectedJournalists.length <= 0) {
      dispatch(WarningAlert("Please make a selection"));
    } else if (selectedJournalists?.length > 5) {
      alert("you can not add to crm more than 5 Journalist");
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
          if (dataSubmit?.response?.status === "Ok") {
            alert(dataSubmit?.insertedCount + " new journalists added to CRM ");
          }
        })
        .catch((error) => alert(error))
        .finally(() => {
          setPostDataToCrm([]);
          setSelectedJournalists([]);
        });

      for (let i = 0; i < postDataToCrm.length; i++) {
        for (let j = 0; j < journalistResult.length; j++) {
          if (
            postDataToCrm[i] === journalistResult[j].intJournalistId &&
            journalistResult[j].crmStatus === false
          ) {
            journalistResult[j].crmStatus = true;
          }
        }
      }
    }
    setJournalistResult([...journalistResult]);
  };

  const removeSelected = (type, curElem) => {
    // Update selectedFilters based on checkbox change
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      // Add or remove the value based on checkbox state
      if (updatedFilters[type].includes(curElem)) {
        updatedFilters[type] = updatedFilters[type].filter(
          (item) => item !== curElem
        ); // Remove value
      }

      // Remove the key if the array is empty
      if (updatedFilters[type].length === 0) {
        delete updatedFilters[type];
      }

      // Optionally, update count or any other properties
      updatedFilters.count = Object.keys(updatedFilters).reduce(
        (total, key) => {
          if (Array.isArray(updatedFilters[key])) {
            return total + updatedFilters[key].length;
          }
          return total;
        },
        0
      );

      return updatedFilters;
    });
  };

  // const outletCategory = [
  //   {
  //     id: 0,
  //     tabName: "All",
  //     url: "journalist-by-outlet",
  //   },
  //   {
  //     id: 1,
  //     tabName: "Editor",
  //     url: "OutletEditor",
  //   },
  //   {
  //     id: 2,
  //     tabName: "Bureau Chief",
  //     url: "BureauChief",
  //   },
  //   {
  //     id: 3,
  //     tabName: "Columnist",
  //     url: "Columnist",
  //   },
  //   {
  //     id: 4,
  //     tabName: "Supplements",
  //     url: "Supplements",
  //   },
  //   {
  //     id: 5,
  //     tabName: "International",
  //     url: "International",
  //   },
  // ];

  useEffect(() => {
    if (!sVal || typeof sVal == undefined) {
      setSearchDeps(0);
      setSearchByText("");
    } else {
      setSearchDeps(sVal.length);
      setSearchByText(sVal);
    }
  }, [sVal]);

  useEffect(() => {
    setJournalistResult(isdata?.list);
    //setNoRecord(false);
  }, [isdata?.list]);

  useEffect(() => {
    setLength(selectedJournalists.length);
  }, [selectedJournalists]);

  useEffect(() => {
    if (selectAllLabel === "Unselect All" && !selectedJournalists.length) {
      setSelectAllLabel("Select All");
    }
  }, [journalistResult]);

  return (
    <div>
      <section
        className="sticky bottom-1 left-0 top-[64px] z-10 flex gap-x-8 bg-white"
        style={{ borderBottom: "1px solid rgb(209 213 219)" }}
      >
        <div className="section flex w-11/12 gap-x-6">
          <div className="hidden w-4/12 md:flex md:w-7/12 lg:w-1/3"></div>
          <div className=" flex w-full flex-col flex-wrap gap-6 self-start">
            <div className="flex flex-wrap items-center justify-end bg-white p-3 pr-0">
              {/* <h2 className="text-sm font-medium text-gray-600">
                All Journalists */}
              {/* {isdata?.total} */}
              {/* </h2> */}
              <div className="flex gap-x-3">
                <Link
                  className="relative flex items-center whitespace-nowrap rounded-[5px] border border-[#8260b6] px-3  py-0 text-sm  text-[#8260b6] hover:border-gray-800 hover:text-gray-800"
                  href=""
                  onClick={handleSelectAll}
                >
                  {selectAllLabel}

                  {selectedJournalistsLength !== 0 && (
                    <div className="-left-7 absolute flex h-9 w-9 items-center justify-center rounded-2xl bg-[#FF3EA5] text-center align-middle text-sm font-bold text-white">
                      {selectedJournalistsLength}
                    </div>
                  )}
                </Link>

                <input
                  type="button"
                  value="Add To CRM"
                  // disabled={selectedJournalists.length > 5 && true}
                  className="flex cursor-pointer items-center whitespace-nowrap rounded-[5px] border border-[#8260b6]  px-3 py-1 text-sm  text-[#8260b6]"
                  // href="/customcrm"
                  onClick={() => addInCRM()}
                />
                <div className="relative flex">
                  <Tooltip content="Campaign">
                    <Link
                      href="#"
                      onClick={() => {
                        setIsOpen(true);
                      }}
                      className="relative flex items-center rounded-[5px] border border-[#8260b6]  px-3  py-1 text-sm   text-[#8260b6]"
                    >
                      Create List
                    </Link>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {Object.keys(selectedFilters)?.length > 0 && (
        <div className="w-11/12 pt-4 pr-0 section">
          <div className="flex flex-wrap gap-2 pl-6">
            <div className="flex flex-wrap items-center px-2 rounded-md">
              {Object.keys(selectedFilters).map((key, index) => (
                <div key={index} className="flex items-center">
                  {key !== "count" && key + ":"}
                  {selectedFilters[key]?.length > 0 &&
                    selectedFilters[key]?.map((curItem, ind) => {
                      return (
                        <div key={ind}>
                          <div className="flex items-center px-2 m-1 border border-gray-400 rounded-md">
                            {curItem.split(" ").map((curElem, index) => {
                              if (index !== 0) {
                                return (
                                  <span key={index} className="text-gray-600">
                                    {curElem.slice(0, 1).toUpperCase() +
                                      curElem.slice(1).toLowerCase()}
                                    &nbsp;
                                  </span>
                                );
                              }
                            })}{" "}
                            <span
                              onClick={() => removeSelected(key, curItem)}
                              className="pl-1 text-gray-400 rounded-full cursor-pointer material-icons-outlined icon-16 hover:text-gray-800"
                            >
                              close
                            </span>{" "}
                          </div>
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="section w-11/12 p-6 py-6 pl-8 pr-0">
        <section className="flex gap-x-8">
          <aside className="mt-[12px] flex hidden w-4/12 flex-col gap-6 md:flex md:w-7/12 lg:w-1/3">
            <div className="relative flex items-center justify-between">
              <span
                onClick={() => goBack()}
                className=" flex w-28 cursor-pointer items-center text-sm font-normal text-gray-500 hover:border-gray-400 hover:text-gray-800"
              >
                <span className="material-icons-outlined icon-16">
                  arrow_back_ios_new
                </span>
                Go Back
              </span>
            </div>

            <fieldset className="self-start w-full px-3 border border-gray-300 rounded-xl ">
              <h3 className="px-3 py-3 font-medium uppercase text-gray-900">
                Filters
              </h3>
              <div className="w-full p-3">
                <GetFiltersData
                  trackingId={trackingId}
                  type="Beat"
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  url={`GetBeatFilter?ShowFilter=${showId}`}
                />
                <GetFiltersData
                  trackingId={trackingId}
                  type="State"
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  url={`GetStateFilter?ShowFilter=${showId}`}
                />
                <GetFiltersData
                  trackingId={trackingId}
                  type="City"
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  url={`GetCityFilter?ShowFilter=${showId}`}
                />
                <GetFiltersData
                  trackingId={trackingId}
                  type="Title"
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  url={`GetTitleFilter?ShowFilter=${showId}`}
                />

                <GetFiltersData
                  trackingId={trackingId}
                  type="Language"
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  url={`GetLanguageFilter?ShowFilter=${showId}`}
                />
              </div>
            </fieldset>
          </aside>

          <article className="mt-3 flex w-full flex-col flex-wrap gap-6 self-start">
            <div className="flex items-end justify-between">
              <div className="flex flex-col">
                <ul className="flex items-center gap-x-1  text-sm text-gray-400">
                  <li className="flex items-center">
                    <Link href={`/media-types`} className="hover:text-gray-700">
                      Media Types
                    </Link>
                    <span className="material-icons-outlined b-font text-gray-400">
                      navigate_next
                    </span>
                  </li>
                  {outletId === "1" && (
                    <>
                      {" "}
                      <li className="flex items-center">
                        <Link
                          href={`/mediaTypeOutlet/1/National`}
                          className="hover:text-gray-700"
                        >
                          National
                        </Link>
                        <span className="material-icons-outlined b-font text-gray-400">
                          navigate_next
                        </span>
                      </li>{" "}
                    </>
                  )}

                  {outletId === "2" && (
                    <>
                      {" "}
                      <li className="flex items-center">
                        <Link
                          href={`/mediaTypeOutlet/2/Regional`}
                          className="hover:text-gray-700"
                        >
                          Regional
                        </Link>
                        <span className="material-icons-outlined b-font text-gray-400">
                          navigate_next
                        </span>
                      </li>{" "}
                    </>
                  )}

                  {outletId === "5" && (
                    <>
                      <li className="flex items-center">
                        <Link
                          href={`/mediaTypeOutlet/5/Blogs`}
                          className="hover:text-gray-700"
                        >
                          Blogs
                        </Link>
                        <span className="material-icons-outlined b-font text-gray-400">
                          navigate_next
                        </span>{" "}
                      </li>
                    </>
                  )}

                  {outletId === "6" && (
                    <>
                      <li className="flex items-center">
                        {" "}
                        <Link
                          href={`/mediaTypeOutlet/6/Online`}
                          className="hover:text-gray-700"
                        >
                          Online
                        </Link>
                        <span className="material-icons-outlined b-font text-gray-400">
                          navigate_next
                        </span>
                      </li>
                    </>
                  )}

                  {outletId === "14" && (
                    <>
                      <li className="flex items-center">
                        <Link
                          href={`/mediaTypeOutlet/14/Broadcast`}
                          className="hover:text-gray-700"
                        >
                          Broadcast
                        </Link>
                        <span className="material-icons-outlined b-font text-gray-400">
                          navigate_next
                        </span>
                      </li>
                    </>
                  )}
                  <li className="flex items-center">
                    {outletName}
                    <span className="material-icons-outlined b-font text-gray-400">
                      navigate_next
                    </span>
                  </li>
                  <li className="flex items-center">
                    {showName}
                    <span className="material-icons-outlined b-font text-gray-400">
                      navigate_next
                    </span>
                  </li>
                  <li className="flex items-center">
                    Show Journalists
                    <span className="material-icons-outlined b-font text-gray-400">
                      navigate_next
                    </span>
                  </li>
                  <li className="flex items-center">Results {isdata?.total}</li>
                </ul>
              </div>
            </div>
            {/* {loading && <ShimmerCrmTile />} */}
            <div className="flex w-full flex-wrap  self-start [&>*:last-child]:flex-none [&>*:nth-child(n-2)]:flex-none">
              {journalistResult && journalistResult?.length > 0
                ? journalistResult?.map((curItem) => (
                    <JournalistSearchRecord
                      key={curItem.intJournalistId}
                      data={curItem}
                      x={selectedFilters}
                      // onChange={handleSelect(curItem)}
                      disabled={selectAllLabel === "Unselect All" && true}
                      onCheckboxChange={getSelectedData}
                      isSelected={selectedJournalists.includes(
                        curItem.intJournalistId
                      )}
                    />
                  ))
                : loading
                  ? "Loading..."
                  : "No Record Found"}

              {/* {journalistResult?.length > 0 && <ShimmerCrmTile />} */}
            </div>

            {selectedJournalistsLength !== 0 && (
              <div className="rounded-tb-md fixed bottom-28 right-0 rounded-bl-lg rounded-tl-lg bg-[#FF3EA5] px-3 py-1 text-center text-sm font-medium text-white">
                Selected {selectedJournalistsLength}
              </div>
            )}
            <div className="mt-2 flex justify-center">
              {loadingMore && (
                <p className="whitespace-nowrap px-4  py-1 text-gray-400">
                  Loading journalists...
                </p>
              )}
            </div>
          </article>
        </section>
        {selectedJournalistsLength !== 0 && (
          <div className="rounded-tb-md fixed bottom-28 right-0 rounded-bl-lg rounded-tl-lg bg-[#FF3EA5] px-3 py-1 text-center text-sm font-medium text-white">
            Selected {selectedJournalistsLength}
          </div>
        )}
        {loading && (
          <div>
            <div className="opegue-4 absolute inset-0 z-50  max-h-screen bg-gray-600">
              <div className="lft50 absolute">
                <Spinner status={true} />
              </div>
            </div>
          </div>
        )}

        {isOpen && (
          <BuildCampaign
            open={isOpen}
            onClose={() => setIsOpen(false)}
            selectedJournalists={selectedJournalists}
          />
        )}
      </div>
    </div>
  );
};

export default ByShowJournalists;
