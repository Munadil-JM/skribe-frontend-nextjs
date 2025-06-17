"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PRECRM_POSTDATA, GETALLJOURNO } from "../../constants";
import BuildCampaign from "../Campaign/BuildCampaign";
import { useLeftJournoSearch } from "../utils/UrlBuilder";
import SearchRecord from "./SearchRecord";
import Spinner from "../../Services/Spinner";
// import { useDispatch } from "react-redux";
import { useSearchContext } from "../../context/MainSearchContext";
import userService from "../../Services/user.service";
import { STATICCOUNT } from "../../constants";
import GetFiltersData from "../Filters/GetFiltersData";
import SelectedFilters from "../SelectedFilters";
import { useNotification } from "../ErrorAlert/ErrorContextNotification";
// import ErrorAlerts from "../ErrorAlert/ErrorAlerts";

const JournalistSearch = () => {
  // const dispatch = useDispatch();
  const { showNotification } = useNotification();
  const success = (msg, type) => showNotification(msg, type);
  const warning = (msg, type) => showNotification(msg, type);
  // const error = (msg, type) => showNotification(msg, type);

  //success("new journalists added to CRM ", "success");
  const [selectedFilters, setSelectedFilters] = useState({ count: 0 });
  const [searchByText, setSearchByText] = useState("");
  const [searchDeps, setSearchDeps] = useState(0);
  const [crmRecord, setcrmRecord] = useState([]);
  const [selectedJournalists, setSelectedJournalists] = useState([]);
  const [excludeJournalists, setExcludeJouranlists] = useState([]);
  // const [shimmer, setShimmer] = useState(true);
  const [selectAllLabel, setSelectAllLabel] = useState("Select All");
  const [selectedJournalistsLength, setLength] = useState(0);
  const [trackingId, setTrackingId] = useState();
  // const navigate = useNavigate();
  const url = `${GETALLJOURNO}`;

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

  //need to remove from here end

  const [isOpen, setIsOpen] = useState(false);

  // const [storeLabel, setStoreLabel] = useState({});

  const { isdata, loading, loadMore, loadingMore } = useLeftJournoSearch(
    selectedFilters,
    selectedFilters["count"],
    url + `?SearchFilter=${searchByText}&pageSize=60&`,
    searchDeps
  );

  const [postDataToCrm, setPostDataToCrm] = useState([]);
  //useInfiniteScroll(loadMore);

  const getSelectedData = (target, journoId) => {
    handleSelect(journoId);

    AddToCrm(target.checked, journoId);
  };

  const handleSelectAll = () => {
    if (selectedJournalists.length === crmRecord.length) {
      setSelectedJournalists([]);
      setSelectAllLabel("Select All");
    } else {
      const allIds = crmRecord.map((journalist) => journalist.intJournalistId);
      setSelectedJournalists((prevSelectedJournalists) =>
        prevSelectedJournalists.length === allIds.length ? [] : allIds
      );

      setSelectAllLabel((prevLabel) =>
        prevLabel === "Select All" ? "Unselect All" : "Select All"
      );
      setExcludeJouranlists([]);
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
      selectedJournalists.length - 1 === crmRecord.length
        ? "Unselect All"
        : "Select All"
    );
  };
  useEffect(() => {
    if (selectAllLabel === "Unselect All" && !selectedJournalists.length) {
      setSelectAllLabel("Select All");
    }
  }, [crmRecord]);

  // const debounce = (func) => {
  //   let timer;
  //   return function (...args) {
  //     const context = this;
  //     if (timer) clearTimeout(timer);
  //     timer = setTimeout(() => {
  //       timer = null;
  //       func.apply(context, args);
  //     }, 300);
  //   };
  // };

  // const handleSearch = (event) => {
  //   setSearchByText(event.target.value);
  //   setSearchDeps(event.target.value.length);
  // };

  // const optimizedSearchRecords = useCallback(debounce(handleSearch), []);

  const AddToCrm = (target, intJournalistId) => {
    const postData = postDataToCrm;
    if (target) {
      postData.push(intJournalistId);
      setPostDataToCrm([...postData]);
    } else {
      let unSelectData = postDataToCrm.filter(
        (curId) => curId !== intJournalistId
      );
      setPostDataToCrm([...unSelectData]);
    }
  };
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
            for (let i = 0; i < postDataToCrm.length; i++) {
              for (let j = 0; j < crmRecord.length; j++) {
                if (
                  postDataToCrm[i] === crmRecord[j].intJournalistId &&
                  crmRecord[j].crmStatus === false
                ) {
                  crmRecord[j].crmStatus = true;
                }
              }
            }
          }
        })
        .catch((error) => error(error, "error"))
        .finally(() => {
          setPostDataToCrm([]);
          setSelectedJournalists([]);
        });
    }
    setcrmRecord([...crmRecord]);
  };

  // const goBack = () => {
  //   navigate(-1);
  // };

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
    if (loading) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [loading]);

  useEffect(() => {
    setcrmRecord(isdata?.list);
    // setShimmer(false);
  }, [isdata?.list]);

  useEffect(() => {
    setLength(selectedJournalists.length);
  }, [selectedJournalists]);

  useEffect(() => {
    if (!sVal || typeof sVal === undefined) {
      setSearchDeps(0);
      setSearchByText("");
    } else {
      let timeOut = setTimeout(() => {
        setSearchDeps(sVal.length);
        setSearchByText(sVal);
      }, 200);

      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [sVal]);

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

  return (
    <div>
      <section
        className="sticky bottom-1 left-0 top-[64px] z-10 flex gap-x-8 bg-white"
        style={{ borderBottom: "1px solid rgb(209 213 219)" }}
      >
        <div className="flex w-11/12 section gap-x-6">
          <div className="hidden w-4/12 md:flex md:w-7/12 lg:w-1/3"></div>
          <div className="flex flex-col flex-wrap self-start w-full gap-6">
            <div className="flex flex-wrap items-center justify-end p-3 pr-0 bg-white">
              <div className="relative flex gap-x-3">
                {crmRecord?.length > 0 && (
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
          </div>
        </div>
      </section>
      <SelectedFilters
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      <div className="w-11/12 p-6 py-6 pt-0 pl-8 pr-0 section">
        <section className="flex gap-x-8">
          <aside className="flex flex-col w-4/12 gap-6 mt-3 md:flex md:w-7/12 lg:w-1/3">
            <div className="relative mt-[18px] flex items-center justify-between"></div>
            {/* {!filterload && "Filter Loading..."}
            {filterload && (
              // {!loading && (
              <Filter
                prev={filterData}
                set={setFilterData}
                fData={leftFilterData}
              >
                <Lf />
              </Filter>
            )} */}
            <fieldset className="self-start w-full px-3 border border-gray-300 rounded-xl ">
              <h3 className="p-3 text-gray-900 uppercase text-md">Filters</h3>
              <div className="w-full p-3">
                <GetFiltersData
                  type="Media"
                  trackingId={trackingId}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  url={`GetMediaFilter`}
                />
                <GetFiltersData
                  trackingId={trackingId}
                  type="Outlet"
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  url={`GetOutletFilter`}
                />
                <GetFiltersData
                  trackingId={trackingId}
                  type="Beat"
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  url={`GetBeatFilter`}
                />
                <GetFiltersData
                  trackingId={trackingId}
                  type="State"
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  url={`GetStateFilter`}
                />

                <GetFiltersData
                  trackingId={trackingId}
                  type="City"
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  url={`GetCityFilter`}
                />

                <GetFiltersData
                  trackingId={trackingId}
                  type="Title"
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  url={`GetTitleFilter`}
                />

                <GetFiltersData
                  trackingId={trackingId}
                  type="Country"
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  url={`GetCountryFilter`}
                />
                <GetFiltersData
                  trackingId={trackingId}
                  type="Show"
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  url={`GetShowFilter`}
                />

                <GetFiltersData
                  trackingId={trackingId}
                  type="Language"
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  url={`GetLanguageFilter`}
                />
              </div>
            </fieldset>
          </aside>
          <article className="flex flex-col flex-wrap self-start w-full gap-6 mt-3">
            <div className="flex flex-col">
              <ul className="flex items-center text-xs text-gray-400 gap-x-1">
                <li className="flex items-center">
                  All Journalist{" "}
                  <span className="material-icons-outlined b-font text-gray-400">
                    navigate_next
                  </span>
                </li>
                <li className="flex items-center">Results</li>
              </ul>
            </div>
            <div className="flex w-full flex-wrap  self-start [&>*:last-child]:flex-none [&>*:nth-child(n-2)]:flex-none">
              {crmRecord && crmRecord?.length > 0
                ? crmRecord?.map((curItem) => (
                    <SearchRecord
                      key={curItem.intJournalistId}
                      data={curItem}
                      x={selectedFilters}
                      onCheckboxChange={getSelectedData}
                      disabled={selectAllLabel === "Unselect All" && true}
                      isSelected={selectedJournalists?.includes(
                        curItem?.intJournalistId
                      )}
                    />
                  ))
                : loading
                  ? "Loading..."
                  : "No Record Found"}
            </div>

            <div className="flex justify-center mt-2">
              {loadingMore && (
                <p className="px-4 py-1 text-gray-400 whitespace-nowrap">
                  Loading journalists...
                </p>
              )}
            </div>
          </article>
        </section>

        {selectedJournalistsLength !== 0 && (
          <div className="rounded-tb-md fixed bottom-28 right-0 rounded-bl-lg rounded-tl-lg bg-[#fac540] px-3 py-1 text-center text-sm font-medium text-[#002b5b]">
            Selected{" "}
            {selectAllLabel === "Unselect All" && isdata?.total <= STATICCOUNT
              ? isdata?.total
              : selectAllLabel === "Unselect All"
                ? STATICCOUNT
                : selectedJournalistsLength}
          </div>
        )}
        {/* <div className="absolute inset-0 bg-gray-600 opegue-4">test</div> */}
        {loading && (
          <div>
            <div className="fixed inset-0 z-50 max-h-screen bg-gray-600 opegue-4">
              <div className="absolute lft50">
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
            excludeJournalists={excludeJournalists}
          />
        )}
      </div>
    </div>
  );
};

export default JournalistSearch;
