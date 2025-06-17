"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import CrmRecord from "./CrmRecord";
//import useCrmData from "../../custom-hooks/useCrmData";
// import { useDispatch } from "react-redux";
import { DELCRMRECORD, GETALLJOURNO, STATICCOUNT } from "../../constants";
//import useLeftCrmFilter from "../utils/useLeftCrmFilter";
// import { useRequest } from "ahooks";
import userService from "../../Services/user.service";
// import { Filter } from "../Filters/FilterContext";
// import Lf from "../Filters/Lf";
// import { getFilter } from "../utils/Filtercb";
import { useLeftJournoSearch } from "../utils/UrlBuilder";
//import PreCrmRecord from "./CrmRecord";
import Spinner from "../../Services/Spinner";
import Tooltip from "../Tooltip/Tooltip";
import useInfiniteScroll from "../utils/useInfiniteScroll";
// import ServerError from "../../Services/ServerError";
import GetFiltersData from "../Filters/GetFiltersData";
import BuildCampaign from "../Campaign/BuildCampaign";
import SelectedFilters from "../SelectedFilters";
import { useNotification } from "../ErrorAlert/ErrorContextNotification";

const Mycrm = () => {
  const { showNotification } = useNotification();
  const success = (msg, type) => showNotification(msg, type);
  const warning = (msg, type) => showNotification(msg, type);
  const [crmRecord, setcrmRecord] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({ count: 0 });
  const [searchByText, setSearchByText] = useState("");
  const [searchDeps, setSearchDeps] = useState(0);
  //MAIN TOP RIGHT SEARCH STATE
  // const [crmRecordSearch, setCrmRecordSearch] = useState([]);
  // const [postDataToCrm, setPostDataToCrm] = useState([]);
  // const [storeDeleteRecord, setStoreDeleteRecord] = useState([]);
  const [trackingId, setTrackingId] = useState();

  const [selectedJournalists, setSelectedJournalists] = useState([]);
  const [selectAllLabel, setSelectAllLabel] = useState("Select All");
  const [selectedJournalistsLength, setLength] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const url = `${GETALLJOURNO}`;

  const { isdata, loading, loadMore, loadingMore } = useLeftJournoSearch(
    selectedFilters,
    selectedFilters["count"],
    url + `?pageSize=50&SearchFilter=${searchByText}&IsCrm=true&`, //url + "&",
    searchDeps
  );

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

  const [mobileView, setMobileView] = useState(false);
  useInfiniteScroll(loadMore);

  // const dispatch = useDispatch();
  useEffect(() => {
    setcrmRecord(isdata?.list);
  }, [isdata?.list]);

  useEffect(() => {
    setLength(selectedJournalists.length);
  }, [selectedJournalists]);
  //SEARCH RECORD ON TOP MAIN SEARCH BOX
  // const searchRecord = (sVal) => {
  //   let sortData = isdata?.list?.filter(
  //     (curItem) =>
  //       curItem?.journoName?.toLowerCase()?.includes(sVal.toLowerCase()) ||
  //       curItem?.journoCity?.vchCity
  //         ?.toLowerCase()
  //         ?.includes(sVal.toLowerCase())
  //   );

  //   setcrmRecord(sortData);
  // };

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

  //DELETE CRM RECORDS FUNCTION
  const deleteCrmRecord = async () => {
    // console.log(storeDeleteRecord)
    // return false;
    if (selectedJournalists.length <= 0) {
      warning("Please select atleast one record to delete", "warning");
      //dispatch(WarningAlert("Please select atleast one record to delete"));
    } else if (selectedJournalists.length > 0) {
      try {
        let { id } = JSON.parse(localStorage.getItem("userInfo"));
        let data = {
          clientId: 0,
          userId: id,
          jourId: selectedJournalists,
        };

        userService.delete(DELCRMRECORD, data).then((result) => {
          if (result?.message) {
            const output = crmRecord.filter(
              (cureElem) =>
                !selectedJournalists.some(
                  (delElem) => cureElem.intJournalistId === delElem
                )
            );

            setcrmRecord(output);
            success(result?.message, "success");
            //dispatch(SuccessAlert(result?.message));
            setSelectedJournalists([]);
            // logic here
          }
        });
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 300);
    };
  };

  const handleSearch = (event) => {
    setSearchByText(event.target.value);
    setSearchDeps(event.target.value.length);
  };

  const optimizedSearchRecords = useCallback(debounce(handleSearch), []);

  return (
    <div>
      <section
        className="sticky bottom-1 left-0 top-[64px] z-10 flex gap-x-8 bg-white"
        style={{ borderBottom: "1px solid rgb(209 213 219)" }}
      >
        <div className="section flex w-11/12 gap-x-6">
          <div className=" flex w-full flex-col flex-wrap gap-6 self-start">
            <div className="flex flex-wrap items-center justify-between bg-white p-3 pr-0">
              <ul className="flex items-center gap-x-1 pl-8 text-sm text-gray-400">
                <li className="flex items-center">MyCRM</li>
              </ul>
              {/* <h2 className="text-sm font-medium text-gray-600">
            All Journalists */}
              {/* {isdata?.total} */}
              {/* </h2> */}
              <div className="relative flex gap-x-3">
                <div className="section">
                  <div className="btn-group flex flex-wrap items-center  gap-x-3 md:flex-nowrap">
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
                    <div>
                      <div className="btn-group flex  flex-wrap items-center gap-4 gap-x-3 md:flex-nowrap">
                        <span className="md:hidden">
                          <Link
                            href={""}
                            onClick={() => setMobileView(!mobileView)}
                            className="material-icons-outlined rounded-[5px] border border-gray-400 px-2 py-1  text-gray-400  hover:border-gray-800 hover:text-gray-800"
                          >
                            filter_list
                          </Link>
                        </span>
                        <div className="relative flex">
                          <Link
                            className="relative flex items-center rounded-[5px] border border-[#8260b6]  px-3  py-1 text-xs  text-[#8260b6]"
                            href=""
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
                        </div>
                        <div className="relative flex">
                          <Link
                            href=""
                            onClick={() => buildCampPopup()}
                            className="relative flex items-center rounded-[5px] border border-[#8260b6]  px-3  py-1 text-xs text-[#8260b6]"
                          >
                            Create List
                          </Link>
                        </div>

                        <div className="relative flex">
                          <Tooltip content="Delete">
                            <Link
                              href={""}
                              onClick={() => deleteCrmRecord()}
                              className="material-icons-outlined text[#38185a] items-center py-[1px] custm-del-size flex cursor-pointer  rounded-[5px]  border border-[#38185a] px-2"
                            >
                              delete
                            </Link>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SelectedFilters
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      <div className="section w-11/12 p-6 py-6 pl-8 pr-0">
        <nav className="flex  flex-col items-start gap-y-4 md:flex-row md:items-center md:justify-between">
          <ul className="flex gap-x-4">
            <li>
              <Link
                href="#"
                className="border-b-2 border-gray-800 px-2 pb-1 text-gray-900"
              >
                CRM (
                {crmRecord?.length < isdata?.total
                  ? crmRecord?.length
                  : isdata?.total}
                )
              </Link>
            </li>
          </ul>
        </nav>

        <section className="relative flex min-h-[600px] w-full gap-x-8 pt-4">
          {mobileView && (
            <div className="absolute inset-0 bg-gray-600 opacity-60"></div>
          )}
          <aside
            className={
              mobileView
                ? "left:0 absolute top-40  z-0 w-4/5 lg:w-3/12"
                : "hidden w-4/12 md:flex md:w-7/12 lg:w-1/3"
            }
          >
            {mobileView && (
              <span
                onClick={() => setMobileView(!mobileView)}
                className="material-icons-outlined absolute -top-5 right-0 text-white"
              >
                close
              </span>
            )}
            <fieldset className="self-start w-full px-3 border border-gray-300 rounded-xl ">
              <h3 className="p-3 text-gray-900 uppercase text-md">Filters</h3>
              <div className="w-full p-3">
                <GetFiltersData
                  type="Media"
                  trackingId={trackingId}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  url={`GetMediaFilter?IsCrm=true`}
                />
                <GetFiltersData
                  trackingId={trackingId}
                  type="Outlet"
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  url={`GetOutletFilter?IsCrm=true`}
                />
                <GetFiltersData
                  trackingId={trackingId}
                  type="Beat"
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  url={`GetBeatFilter?IsCrm=true`}
                />
                <GetFiltersData
                  trackingId={trackingId}
                  type="State"
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  url={`GetStateFilter?IsCrm=true`}
                />

                <GetFiltersData
                  trackingId={trackingId}
                  type="City"
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  url={`GetCityFilter?IsCrm=true`}
                />

                <GetFiltersData
                  trackingId={trackingId}
                  type="Title"
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  url={`GetTitleFilter?IsCrm=true`}
                />
              </div>
            </fieldset>
          </aside>
          <article className=" flex w-full flex-col flex-wrap gap-5 self-start">
            {/* <div>{crmCount} Added to your CRM</div> */}
            <div className="flex w-full flex-wrap  self-start [&>*:last-child]:flex-none [&>*:nth-child(n-2)]:flex-none">
              {crmRecord && crmRecord?.length > 0 ? (
                crmRecord?.map((curItem) => (
                  <CrmRecord
                    // key={curItem.journalistId}
                    data={curItem}
                    x={selectedFilters}
                    key={curItem.intJournalistId}
                    // {...curItem}
                    // getDeleteRecords={deleteCrmRecord}
                    // delRecord={storeDeleteValue}
                    disabled={selectAllLabel === "Unselect All" && true}
                    onCheckboxChange={() =>
                      handleSelect(curItem?.intJournalistId)
                    }
                    isSelected={selectedJournalists?.includes(
                      curItem?.intJournalistId
                    )}

                    // onCheckboxChange = {handleCheckboxChange}
                  />
                ))
              ) : loading ? (
                "Loading..."
              ) : (
                <p className="p-5 text-sm text-center">No Record Found</p>
              )}
            </div>
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
            isFilter="CRM"
          />
        )}
      </div>
    </div>
  );
};

export default Mycrm;
