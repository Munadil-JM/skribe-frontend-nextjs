"use client";

import { useCallback, useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Spinner from "../../Services/Spinner";
import { PRECRM_POSTDATA, GETALLJOURNO, STATICCOUNT } from "../../constants";
import { useSearchContext } from "../../context/MainSearchContext";
import BuildCampaign from "../Campaign/BuildCampaign";
import { useLeftJournoSearch } from "../utils/UrlBuilder";
import JournalistSearchRecord from "./JournalistSearchRecord";
import userService from "../../Services/user.service";
import GetFiltersData from "../Filters/GetFiltersData";
import GetTrackingInfo from "../Filters/GetTrackingInfo";
import SelectedFilters from "../SelectedFilters";
import { useNotification } from "../ErrorAlert/ErrorContextNotification";

// 5,13,
const outletCategory = [
  {
    id: 0,
    tabName: "All",
    url: "journalist-by-outlet",
    categoryType: [1, 2, 5, 6, 13, 14, 16, 18, 20, 22],
  },
  {
    id: 1,
    tabName: "Editor",
    url: "OutletEditor",
    categoryType: [1, 2, 6, 13, 16, 20],
  },
  {
    id: 2,
    tabName: "Bureau Chief",
    url: "BureauChief",
    categoryType: [1, 2],
  },
  {
    id: 3,
    tabName: "Columnist",
    url: "Columnist",
    categoryType: [1, 2],
  },
  {
    id: 4,
    tabName: "Supplements",
    url: "Supplements",
    categoryType: [1, 2],
  },
  {
    id: 5,
    tabName: "International",
    url: "International",
    categoryType: [1],
  },
  {
    id: 6,
    tabName: "Anchor",
    url: "journalistByAnchor",
    categoryType: [14],
  },
  {
    id: 7,
    tabName: "Producers",
    url: "journalistByProducers",
    categoryType: [14],
  },
  {
    id: 8,
    tabName: "Shows",
    url: "journalistByShows",
    categoryType: [14],
  },
];

const JournalistSearch = ({ outletId, id, name }) => {
  // const dispatch = useDispatch();
  const { showNotification } = useNotification();
  const success = (msg, type) => showNotification(msg, type);
  const warning = (msg, type) => showNotification(msg, type);
  // const error = (msg, type) => showNotification(msg, type);
  const [selectedFilters, setSelectedFilters] = useState({ count: 0 });
  const [searchByText, setSearchByText] = useState("");
  const [searchDeps, setSearchDeps] = useState(0);
  const [active, setActive] = useState("All");
  // const [crmRecord, setcrmRecord] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [journalistResult, setJournalistResult] = useState([]);
  const [selectAllLabel, setSelectAllLabel] = useState("Select All");
  const [selectedJournalistsLength, setLength] = useState(0);
  const [selectedJournalists, setSelectedJournalists] = useState([]);
  const [postDataToCrm, setPostDataToCrm] = useState([]);
  const router = useRouter();
  const url = `${GETALLJOURNO}`;
  const { sVal } = useSearchContext();
  const pathname = usePathname();
  const userId = JSON.parse(localStorage.getItem("userInfo"));
  let pathvalue = pathname.split("/").filter((part) => part !== "");
  let urlRead = pathvalue[0];
  const [trackingId, setTrackingId] = useState();

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

  const { isdata, loading, loadMore, loadingMore } = useLeftJournoSearch(
    selectedFilters,
    selectedFilters["count"],
    url + `?OutletFilter=${id}&SearchFilter=${searchByText}&pageSize=60&`,
    searchDeps,
    id
  );

  //useInfiniteScroll(loadMore);

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
    setSearchDeps(event.target.value.length);
    GetTrackingInfo("outletSearch", val, urlRead, userId.id, "");
  };

  const optimizedSearchRecords = useCallback(debounce(handleSearch), []);

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
            success(
              dataSubmit?.insertedCount + " new journalists added to CRM ",
              "success"
            );
          }
        })
        .catch((error) => error(error, "error"))
        .finally(() => {
          setPostDataToCrm([]);
          setSelectedJournalists([]);
        });
    }
    setJournalistResult([...journalistResult]);
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
    setJournalistResult(isdata?.list);
    //setNoRecord(false);
  }, [isdata?.list]);

  useEffect(() => {
    setLength(selectedJournalists.length);
  }, [selectedJournalists]);

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
    if (selectAllLabel === "Unselect All" && !selectedJournalists.length) {
      setSelectAllLabel("Select All");
    }
  }, []);

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
              {/* <h2 className="text-sm font-medium text-gray-600">
                All Journalists */}
              {/* {isdata?.total} */}
              {/* </h2> */}
              <div className="relative flex gap-x-3">
                {/* {!loading && (
              <div className="flex w-full items-center rounded-lg border border-gray-300 bg-gray-100  pl-2">
                <span className="material-icons-outlined text-sm text-gray-300">
                  search
                </span>
                <input
                  type="text"
                  className="text-md w-64 rounded-lg bg-gray-100 px-3 py-2 text-gray-400 focus:outline-none"
                  placeholder="Search By Name"
                  // onKeyUp={(e) => searchRecord(e.target.value)}
                  onKeyUp={optimizedSearchRecords}
                />
                <span
                  onClick={() => setSearchDeps(0)}
                  className="cursor-pointer pr-2 text-xs uppercase text-gray-500 underline"
                >
                  Clear
                </span>
              </div>
            )} */}

                {journalistResult?.length > 0 && (
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
                          className="absolute flex h-9 w-9 items-center justify-center rounded-2xl bg-[#FAC540] text-center align-middle text-xs font-bold text-[#002b5b]"
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
                      className="flex cursor-pointer items-center whitespace-nowrap rounded-[5px] border border-[#002b5b]  px-3 py-1 text-xs  text-[#002b5b]"
                      // href="/customcrm"
                      onClick={() => addInCRM()}
                    />

                    {/* <Link
                      href="#"
                      className="material-icons-outlined rounded-[5px] border border-orange-400 bg-orange-400 px-2 py-1 text-gray-400 text-white hover:border-orange-500 hover:bg-orange-500"
                    >
                      mail
                    </Link> */}
                    <div className="relative flex">
                      <Link
                        href="#"
                        onClick={() => buildCampPopup()}
                        className="relative flex items-center rounded-[5px] border border-[#002b5b]  px-3  py-1 text-xs  text-[#002b5b]"
                      >
                        Create List
                      </Link>
                    </div>
                  </>
                )}
                {/* <Link
                  href="#"
                  className=" material-icons-outlined flex items-center rounded-[5px] border border-gray-400 px-2 py-1  text-gray-400  hover:border-gray-800 hover:text-gray-800"
                >
                  share
                </Link> */}
                {/* <Link
                  href="#"
                  className="material-icons-outlined rounded-[5px] border border-gray-400 px-2 py-1  text-gray-400  hover:border-gray-800 hover:text-gray-800"
                >
                  analytics
                </Link> */}
                {/* <Link
                  href="#"
                  className="material-icons-outlined flex items-center rounded-[5px] border border-gray-400 px-2 py-1  text-gray-400  hover:border-gray-800 hover:text-gray-800"
                >
                  more_horiz
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SelectedFilters
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      <div className="section w-11/12 p-6 py-6 pl-8 pr-0 pt-0">
        <section className="flex gap-x-8">
          <aside className="mt-[12px] flex  w-4/12 flex-col gap-6 md:flex md:w-7/12 lg:w-1/3">
            <div className="relative flex items-center justify-between ">
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
              <h3 className="p-3 text-gray-900 uppercase text-md">Filters</h3>
              <div className="w-full p-3">
                {(outletId === "1" || outletId === "2") && (
                  <>
                    <GetFiltersData
                      trackingId={trackingId}
                      type="Beat"
                      selectedFilters={selectedFilters}
                      setSelectedFilters={setSelectedFilters}
                      url={`GetBeatFilter?OutletFilter=${id}`}
                    />
                    <GetFiltersData
                      trackingId={trackingId}
                      type="State"
                      selectedFilters={selectedFilters}
                      setSelectedFilters={setSelectedFilters}
                      url={`GetStateFilter?OutletFilter=${id}`}
                    />
                    <GetFiltersData
                      trackingId={trackingId}
                      type="City"
                      selectedFilters={selectedFilters}
                      setSelectedFilters={setSelectedFilters}
                      url={`GetCityFilter?OutletFilter=${id}`}
                    />
                    <GetFiltersData
                      trackingId={trackingId}
                      type="Title"
                      selectedFilters={selectedFilters}
                      setSelectedFilters={setSelectedFilters}
                      url={`GetTitleFilter?OutletFilter=${id}`}
                    />
                    <GetFiltersData
                      trackingId={trackingId}
                      type="Language"
                      selectedFilters={selectedFilters}
                      setSelectedFilters={setSelectedFilters}
                      url={`GetLanguageFilter?OutletFilter=${id}`}
                    />
                  </>
                )}
                {outletId === "6" && (
                  <>
                    <GetFiltersData
                      trackingId={trackingId}
                      type="Beat"
                      selectedFilters={selectedFilters}
                      setSelectedFilters={setSelectedFilters}
                      url={`GetBeatFilter?OutletFilter=${id}`}
                    />
                    <GetFiltersData
                      trackingId={trackingId}
                      type="Language"
                      selectedFilters={selectedFilters}
                      setSelectedFilters={setSelectedFilters}
                      url={`GetLanguageFilter?OutletFilter=${id}`}
                    />
                  </>
                )}

                {outletId === "14" && (
                  <>
                    <GetFiltersData
                      trackingId={trackingId}
                      type="Beat"
                      selectedFilters={selectedFilters}
                      setSelectedFilters={setSelectedFilters}
                      url={`GetBeatFilter?OutletFilter=${id}`}
                    />
                    <GetFiltersData
                      trackingId={trackingId}
                      type="State"
                      selectedFilters={selectedFilters}
                      setSelectedFilters={setSelectedFilters}
                      url={`GetStateFilter?OutletFilter=${id}`}
                    />
                    <GetFiltersData
                      trackingId={trackingId}
                      type="City"
                      selectedFilters={selectedFilters}
                      setSelectedFilters={setSelectedFilters}
                      url={`GetCityFilter?OutletFilter=${id}`}
                    />
                    <GetFiltersData
                      trackingId={trackingId}
                      type="Title"
                      selectedFilters={selectedFilters}
                      setSelectedFilters={setSelectedFilters}
                      url={`GetTitleFilter?OutletFilter=${id}`}
                    />
                    <GetFiltersData
                      trackingId={trackingId}
                      type="Show"
                      selectedFilters={selectedFilters}
                      setSelectedFilters={setSelectedFilters}
                      url={`GetShowFilter?OutletFilter=${id}`}
                    />
                    <GetFiltersData
                      trackingId={trackingId}
                      type="Language"
                      selectedFilters={selectedFilters}
                      setSelectedFilters={setSelectedFilters}
                      url={`GetLanguageFilter?OutletFilter=${id}`}
                    />
                  </>
                )}

                {outletId === "16" && (
                  <>
                    <GetFiltersData
                      trackingId={trackingId}
                      type="State"
                      selectedFilters={selectedFilters}
                      setSelectedFilters={setSelectedFilters}
                      url={`GetStateFilter?OutletFilter=${id}`}
                    />
                    <GetFiltersData
                      trackingId={trackingId}
                      type="City"
                      selectedFilters={selectedFilters}
                      setSelectedFilters={setSelectedFilters}
                      url={`GetCityFilter?OutletFilter=${id}`}
                    />

                    <GetFiltersData
                      trackingId={trackingId}
                      type="Language"
                      selectedFilters={selectedFilters}
                      setSelectedFilters={setSelectedFilters}
                      url={`GetLanguageFilter?OutletFilter=${id}`}
                    />
                  </>
                )}

                {outletId === "18" && (
                  <>
                    <GetFiltersData
                      trackingId={trackingId}
                      type="Country"
                      selectedFilters={selectedFilters}
                      setSelectedFilters={setSelectedFilters}
                      url={`GetCountryFilter?OutletFilter=${id}`}
                    />
                    <GetFiltersData
                      trackingId={trackingId}
                      type="Language"
                      selectedFilters={selectedFilters}
                      setSelectedFilters={setSelectedFilters}
                      url={`GetLanguageFilter?OutletFilter=${id}`}
                    />

                    <GetFiltersData
                      trackingId={trackingId}
                      type="Title"
                      selectedFilters={selectedFilters}
                      setSelectedFilters={setSelectedFilters}
                      url={`GetTitleFilter?OutletFilter=${id}`}
                    />
                  </>
                )}

                {(outletId === "13" ||
                  outletId === "20" ||
                  outletId === "5" ||
                  outletId === "22") && (
                  <>
                    <GetFiltersData
                      trackingId={trackingId}
                      type="Beat"
                      selectedFilters={selectedFilters}
                      setSelectedFilters={setSelectedFilters}
                      url={`GetBeatFilter?OutletFilter=${id}`}
                    />
                    <GetFiltersData
                      trackingId={trackingId}
                      type="State"
                      selectedFilters={selectedFilters}
                      setSelectedFilters={setSelectedFilters}
                      url={`GetStateFilter?OutletFilter=${id}`}
                    />
                    <GetFiltersData
                      trackingId={trackingId}
                      type="City"
                      selectedFilters={selectedFilters}
                      setSelectedFilters={setSelectedFilters}
                      url={`GetCityFilter?OutletFilter=${id}`}
                    />

                    <GetFiltersData
                      trackingId={trackingId}
                      type="Language"
                      selectedFilters={selectedFilters}
                      setSelectedFilters={setSelectedFilters}
                      url={`GetLanguageFilter?OutletFilter=${id}`}
                    />
                  </>
                )}
              </div>
            </fieldset>
          </aside>
          <article className="mt-3 flex w-full flex-col flex-wrap gap-6 self-start">
            <div className="flex items-end justify-between">
              <div className="flex flex-col">
                <ul className="flex items-center gap-x-1 text-xs text-gray-400 pb-4">
                  <li className="flex items-center">
                    <Link href="/media-types" className="hover:text-gray-700">
                      MediaTypes
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
                  {outletId === "13" && (
                    <>
                      <li className="flex items-center">
                        <Link
                          href={`/mediaTypeOutlet/13/Consumer`}
                          className="hover:text-gray-700"
                        >
                          Consumer
                        </Link>
                        <span className="material-icons-outlined b-font text-gray-400">
                          navigate_next
                        </span>{" "}
                      </li>
                    </>
                  )}
                  {outletId === "14" && (
                    <>
                      {" "}
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
                  {outletId === "16" && (
                    <>
                      {" "}
                      <li className="flex items-center">
                        <Link
                          href={`/mediaTypeOutlet/16/Wire Services`}
                          className="hover:text-gray-700"
                        >
                          Wire Services
                        </Link>
                        <span className="material-icons-outlined b-font text-gray-400">
                          navigate_next
                        </span>
                      </li>
                    </>
                  )}
                  {outletId === "18" && (
                    <>
                      <li className="flex items-center">
                        <Link
                          href={`/mediaTypeOutlet/18/International Bureau`}
                          className="hover:text-gray-700"
                        >
                          International Bureau
                        </Link>
                        <span className="material-icons-outlined b-font text-gray-400">
                          navigate_next
                        </span>
                      </li>
                    </>
                  )}
                  {outletId === "20" && (
                    <>
                      <li className="flex items-center">
                        <Link
                          href={`/mediaTypeOutlet/20/B2B`}
                          className="hover:text-gray-700"
                        >
                          B2B
                        </Link>
                        <span className="material-icons-outlined b-font text-gray-400">
                          navigate_next
                        </span>
                      </li>
                    </>
                  )}

                  <li className="flex items-center">
                    {name}
                    <span className="material-icons-outlined b-font text-gray-400">
                      navigate_next
                    </span>
                  </li>
                  <li>Results {isdata?.total}</li>
                </ul>

                <ul className="flex gap-x-2 text-gray-500 text-sm">
                  <li className="font-medium">Sort By:</li>
                  {outletCategory?.length > 0 &&
                    outletCategory?.map((curNav, index) => {
                      if (curNav?.categoryType?.includes(Number(outletId))) {
                        return (
                          <li key={index}>
                            <Link
                              href={`/${curNav?.url}/${outletId}/${id}/${name}`}
                              className={`cursor-pointer px-2 pb-1 text-gray-400 hover:border-b-2 hover:border-[#8260b6] ${
                                active === curNav?.tabName
                                  ? "border-b-2 border-[#8260b6] text-gray-600 font-medium"
                                  : ""
                              } `}
                              onClick={() => setActive(curNav?.tabName)}
                            >
                              {curNav?.tabName}
                            </Link>
                          </li>
                        );
                      }
                    })}
                </ul>
              </div>

              <div className="flex items-center rounded-lg border border-gray-300 bg-white  pl-2">
                <span className="material-icons-outlined text-sm text-gray-300">
                  search
                </span>
                <input
                  type="text"
                  className="text-sm w-full rounded-lg bg-white px-3 py-1 text-gray-600 focus:outline-none"
                  placeholder="Search By Name"
                  // onKeyUp={(e) => searchRecord(e.target.value)}
                  onKeyUp={optimizedSearchRecords}
                />
              </div>
            </div>
            {/* {loading && <ShimmerCrmTile />} */}
            <div className="flex w-full flex-wrap  self-start [&>*:last-child]:flex-none [&>*:nth-child(n-2)]:flex-none">
              {/* {!journalistResult?.length && !loading && "No Record Found"} */}

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
                        curItem?.intJournalistId
                      )}
                    />
                  ))
                : loading
                  ? "Loading..."
                  : "No Record Found"}

              {/* {journalistResult?.length > 0 && <ShimmerCrmTile />} */}
            </div>

            {/* <div className="mt-2 flex justify-center">
            <button
              className="whitespace-nowrap rounded-[5px] border border-gray-400 px-4  py-1 text-gray-400  hover:border-gray-800 hover:text-gray-800"
              type="button"
              onClick={loadMore}
            >
              {loadingMore ? "Loading more..." : "Load more"}
            </button>
          </div> */}

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
          <div className="rounded-tb-md fixed bottom-28 right-0 rounded-bl-lg rounded-tl-lg bg-[#FAC540] px-3 py-1 text-center text-sm font-medium text-[#002b5b]">
            Selected{" "}
            {selectAllLabel === "Unselect All" && isdata?.total <= STATICCOUNT
              ? isdata?.total
              : selectAllLabel === "Unselect All"
                ? STATICCOUNT
                : selectedJournalistsLength}
          </div>
        )}
        {loading && (
          <div>
            <div className="opegue-4 fixed inset-0 z-50  max-h-screen bg-gray-600">
              <div className="lft50 absolute">
                <Spinner status={true} />
              </div>
            </div>
          </div>
        )}

        {isOpen && (
          <BuildCampaign
            selectAllLabel={selectAllLabel}
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

export default JournalistSearch;
