"use client";

import { useCallback, useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Spinner from "../../../Services/Spinner";
import { PRECRM_POSTDATA, GETALLJOURNO, STATICCOUNT } from "../../../constants";
import { useSearchContext } from "../../../context/MainSearchContext";
import BuildCampaign from "../../Campaign/BuildCampaign";
import { useLeftJournoSearch } from "../../utils/UrlBuilder";
import JournalistSearchRecord from "../JournalistSearchRecord";
import userService from "../../../Services/user.service";
import GetFiltersData from "../../Filters/GetFiltersData";
import GetTrackingInfo from "../../Filters/GetTrackingInfo";
import { useNotification } from "../../ErrorAlert/ErrorContextNotification";

const SupplementJournalist = ({ suppId, id, name, supplementName }) => {
  // const dispatch = useDispatch();
  const { showNotification } = useNotification();
  // const success = (msg, type) => showNotification(msg, type);
  const warning = (msg, type) => showNotification(msg, type);
  const success = (msg, type) => showNotification(msg, type);
  // const error = (msg, type) => showNotification(msg, type);
  const [selectedFilters, setSelectedFilters] = useState({ count: 0 });

  const [searchByText, setSearchByText] = useState("");
  const [searchDeps, setSearchDeps] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [journalistResult, setJournalistResult] = useState([]);
  const [selectAllLabel, setSelectAllLabel] = useState("Select All");
  const [selectedJournalistsLength, setLength] = useState(0);
  // const [active, setActive] = useState("Editor");
  const [postDataToCrm, setPostDataToCrm] = useState([]);
  const url = `${GETALLJOURNO}`;

  const router = useRouter();
  const pathname = usePathname();

  const userId = JSON.parse(localStorage.getItem("userInfo"));
  let pathvalue = pathname.split("/").filter((part) => part !== "");
  let urlRead = pathvalue[0];
  const [trackingId, setTrackingId] = useState();
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    setTrackingId(generateUUID());
  }, []);

  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  const { sVal } = useSearchContext();

  const { isdata, loading, loadMore, loadingMore } = useLeftJournoSearch(
    selectedFilters,
    selectedFilters["count"],
    url + `?Supplement=${suppId}&SearchFilter=${searchByText}&pageSize=60&`,
    searchDeps
  );

  useEffect(() => {
    setJournalistResult(isdata?.list);
  }, [isdata?.list]);

  const [selectedJournalists, setSelectedJournalists] = useState([]);

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
    let val = event.target.value;
    setSearchByText(val);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    let timer = setTimeout(() => {
      setSearchDeps(event.target.value.length);
      GetTrackingInfo("", val, urlRead, userId.id, "");
    }, 1000);

    setTimeoutId(timer);
  };

  const optimizedSearchRecords = useCallback(debounce(handleSearch), []);
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
    if (selectedJournalists.length === 0) {
      warning("Please make a selection", "warning");
      //dispatch(WarningAlert("please select Journalist to add in crm"));
    } else if (selectedJournalists?.length > 5) {
      warning("You cannot add more than 5 journalists", "warning");
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
            warning(dataSubmit?.response?.message, "warning");
          }
          if (dataSubmit?.response?.status === "Ok") {
            success(
              dataSubmit?.insertedCount + " new journalists added to CRM",
              "success"
            );
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
          setSelectedJournalists([]);
        })
        .catch((error) => error(error, "error"))
        .finally(() => {
          setPostDataToCrm([]);
          setSelectAllLabel("Select All");
        });
    }
    setJournalistResult([...journalistResult]);
  };
  // const outletCategory = [
  //   {
  //     id: 0,
  //     tabName: "All",
  //     url: "journalist-by-outlet",
  //     categoryType: [1, 2, 6, 14, 16, 20],
  //   },
  //   {
  //     id: 1,
  //     tabName: "Editor",
  //     url: "OutletEditor",
  //     categoryType: [1, 2, 6, 16, 20],
  //   },
  //   {
  //     id: 2,
  //     tabName: "Bureau Chief",
  //     url: "BureauChief",
  //     categoryType: [1, 2],
  //   },
  //   {
  //     id: 3,
  //     tabName: "Columnist",
  //     url: "Columnist",
  //     categoryType: [1, 2],
  //   },
  //   {
  //     id: 4,
  //     tabName: "Supplements",
  //     url: "Supplements",
  //     categoryType: [1, 2],
  //   },
  //   {
  //     id: 5,
  //     tabName: "International",
  //     url: "International",
  //     categoryType: [1],
  //   },
  //   {
  //     id: 6,
  //     tabName: "Anchor",
  //     url: "journalistByAnchor",
  //     categoryType: [14],
  //   },
  //   {
  //     id: 7,
  //     tabName: "Producers",
  //     url: "journalistByProducers",
  //     categoryType: [14],
  //   },
  //   {
  //     id: 8,
  //     tabName: "Shows",
  //     url: "journalistByShows",
  //     categoryType: [14],
  //   },
  // ];
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
    if (loading) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [loading]);

  useEffect(() => {
    if (selectAllLabel === "Unselect All" && !selectedJournalists.length) {
      setSelectAllLabel("Select All");
    }
  }, [journalistResult]);

  useEffect(() => {
    if (selectAllLabel === "Select All") {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [selectAllLabel === "Select All"]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      loadMore();
    }
  };

  useEffect(() => {
    setLength(selectedJournalists.length);
  }, [selectedJournalists]);

  return (
    <div>
      <section
        className="sticky bottom-1 left-0 top-[64px] z-[49] flex gap-x-8 bg-white"
        style={{ borderBottom: "1px solid rgb(209 213 219)" }}
      >
        <div className="section flex w-11/12 gap-x-6">
          <div className="hidden w-4/12 md:flex md:w-7/12 lg:w-1/3"></div>
          <div className="flex w-full flex-col flex-wrap gap-6 self-start">
            <div className="flex flex-wrap items-center justify-end bg-white p-3 pr-0">
              <div className="relative flex gap-x-3">
                {journalistResult?.length > 0 && (
                  <>
                    <Link
                      href={""}
                      className="flex items-center whitespace-nowrap rounded-[5px] border border-[#002B5B] px-3  py-0 text-xs  text-[#002B5B] hover:border-gray-800 hover:text-gray-800"
                      onClick={handleSelectAll}
                    >
                      {selectAllLabel}

                      {selectedJournalistsLength !== 0 && (
                        <div
                          id="selectCount"
                          className="absolute flex h-9 w-9 items-center justify-center rounded-2xl bg-[#fac540] text-center align-middle text-sm font-bold text-[#002b5b]"
                        >
                          {selectAllLabel === "Unselect All" &&
                          isdata?.total <= STATICCOUNT
                            ? isdata?.total
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
                      className="flex cursor-pointer items-center whitespace-nowrap rounded-[5px] border border-[#002B5B]  px-3 py-1 text-xs  text-[#002B5B]"
                      // href="/customcrm"
                      onClick={() => addInCRM()}
                    />

                    <div className="relative flex">
                      <Link
                        href="#"
                        onClick={() => buildCampPopup()}
                        className="relative flex items-center rounded-[5px] border border-[#002B5B]  px-3  py-1 text-xs  text-[#002B5B]"
                      >
                        Create List
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {Object.keys(selectedFilters)?.length > 0 && (
        <div className="section w-11/12 pr-0 pt-4">
          <div className="flex flex-wrap gap-2 pl-6">
            <div className="flex flex-wrap  items-center rounded-md px-2">
              {Object.keys(selectedFilters).map((key, index) => (
                <div key={index} className="flex items-center">
                  {key !== "count" && key + ":"}
                  {selectedFilters[key]?.length > 0 &&
                    selectedFilters[key]?.map((curItem, ind) => {
                      return (
                        <div key={ind}>
                          <div className="m-1 flex items-center rounded-md border border-gray-400 px-2">
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
                              className="material-icons-outlined icon-16 cursor-pointer rounded-full pl-1 text-gray-400 hover:text-gray-800"
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
      <div className="section w-11/12 p-6 pb-6 pl-8 pr-0 pt-0">
        <section className="flex gap-x-8">
          <aside className="mt-[12px] flex w-4/12 flex-col gap-6 md:flex md:w-7/12 lg:w-1/3">
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
            {/* {loading && "Filters Loading..."}

            {!loading && !!Object.keys(custom).length && (
              <Filter prev={filterData} set={setFilterData} fData={custom}>
                <Lf />
              </Filter>
            )} */}
            <fieldset className="w-full self-start rounded-xl border border-gray-300 px-3 ">
              <h3 className="px-3 py-3 font-medium uppercase text-gray-900">
                Filters
              </h3>
              <div className="w-full p-3">
                <GetFiltersData
                  type="Beat"
                  trackingId={trackingId}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  url={`GetBeatFilter?OutletFilter=${id}&Supplement=${suppId}`}
                />
                <GetFiltersData
                  type="State"
                  trackingId={trackingId}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  url={`GetStateFilter?OutletFilter=${id}&Supplement=${suppId}`}
                />
                <GetFiltersData
                  type="City"
                  trackingId={trackingId}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  url={`GetCityFilter?OutletFilter=${id}&Supplement=${suppId}`}
                />
                <GetFiltersData
                  type="Title"
                  trackingId={trackingId}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  url={`GetTitleFilter?OutletFilter=${id}&Supplement=${suppId}`}
                />
                <GetFiltersData
                  trackingId={trackingId}
                  type="Language"
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  url={`GetLanguageFilter?OutletFilter=${id}&Supplement=${suppId}`}
                />
              </div>
            </fieldset>
          </aside>
          <article className="mt-3 flex w-full flex-col flex-wrap gap-6 self-start">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <ul className="flex items-center gap-x-1  text-xs text-gray-400">
                  <li className="flex items-center">
                    Home
                    <span className="material-icons-outlined b-font text-gray-400">
                      navigate_next
                    </span>
                  </li>
                  <li className="flex items-center">
                    All Journalist
                    <span className="material-icons-outlined b-font text-gray-400">
                      navigate_next
                    </span>
                  </li>
                  <li className="flex items-center">
                    {name}
                    <span className="material-icons-outlined b-font text-gray-400">
                      navigate_next
                    </span>
                  </li>
                  <li className="flex items-center">
                    {supplementName} Supplement
                    <span className="material-icons-outlined b-font text-gray-400">
                      navigate_next
                    </span>
                  </li>

                  <li className="flex items-center">Results {isdata?.total}</li>
                </ul>
              </div>
              <div className="flex items-center rounded-lg border border-gray-300 bg-white  pl-2">
                <span className="material-icons-outlined text-sm text-gray-300">
                  search
                </span>
                <input
                  type="text"
                  className="text-sm w-full rounded-lg bg-white px-3 py-1 text-gray-400 focus:outline-none"
                  placeholder="Search By Name"
                  // onKeyUp={(e) => searchRecord(e.target.value)}
                  onKeyUp={optimizedSearchRecords}
                />
              </div>
            </div>
            {/* {loading && <ShimmerCrmTile />} */}
            <div className="flex w-full flex-wrap  self-start [&>*:last-child]:flex-none [&>*:nth-child(n-2)]:flex-none">
              {/* {!journalistResult?.length && !loading && "No Record Found"} */}
              {journalistResult
                ? journalistResult?.length > 0
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
                    : "No Record Found"
                : "No Record Found"}

              {/* {journalistResult?.length > 0 && <ShimmerCrmTile />} */}
            </div>

            {selectedJournalistsLength !== 0 && (
              <div className="rounded-tb-md fixed bottom-28 right-0 rounded-bl-lg rounded-tl-lg bg-[#FAC540] px-3 py-1 text-center text-sm font-medium text-[#002b5b]">
                Selected{" "}
                {selectAllLabel === "Unselect All" &&
                isdata?.total <= STATICCOUNT
                  ? isdata?.total
                  : selectAllLabel === "Unselect All"
                    ? STATICCOUNT
                    : selectedJournalistsLength}
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
            selectAllLabel={selectAllLabel}
            typeSupp="supplement"
            supplement={suppId}
            open={isOpen}
            filterValue={selectedFilters}
            onClose={() => {
              setIsOpen(false);
              document.body.classList.remove("overflow-hidden");
            }}
            selectedJournalists={selectedJournalists}
          />
        )}
      </div>
    </div>
  );
};

export default SupplementJournalist;
