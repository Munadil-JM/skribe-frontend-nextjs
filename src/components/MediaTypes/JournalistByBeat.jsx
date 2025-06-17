"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Spinner from "../../Services/Spinner";
import { PRECRM_POSTDATA, GETALLJOURNO, STATICCOUNT } from "../../constants";
import { useSearchContext } from "../../context/MainSearchContext";
import BuildCampaign from "../Campaign/BuildCampaign";
import { useLeftJournoSearch } from "../utils/UrlBuilder";
import JournalistSearchRecord from "./JournalistSearchRecord";
import userService from "../../Services/user.service";
import { useAllBeat } from "../utils/useAllBeat";
import GetFiltersData from "../Filters/GetFiltersData";
import SelectedFilters from "../SelectedFilters";
import { useNotification } from "../ErrorAlert/ErrorContextNotification";

const JournalistByBeat = ({ selected }) => {
  const { showNotification } = useNotification();
  const success = (msg, type) => showNotification(msg, type);
  const warning = (msg, type) => showNotification(msg, type);
  // const error = (msg, type) => showNotification(msg, type);
  const [sel, setSel] = useState([]);
  const { mediaBeat, isLoadingBeat } = useAllBeat();
  const [paramUrl, setParamURL] = useState([selected]);
  const [selectedFilters, setSelectedFilters] = useState({ count: 0 });
  const [searchByText, setSearchByText] = useState("");
  const [searchDeps, setSearchDeps] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [journalistResult, setJournalistResult] = useState([]);
  const [selectAllLabel, setSelectAllLabel] = useState("Select All");
  const [selectedJournalistsLength, setLength] = useState(0);
  const [trackingId, setTrackingId] = useState();
  const url = `${GETALLJOURNO}`;

  const router = useRouter();

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

  const { sVal } = useSearchContext();

  const { isdata, loading, loadMore, loadingMore, noMore } =
    useLeftJournoSearch(
      selectedFilters,
      selectedFilters["count"],
      url + `?beatFilter=${paramUrl}&SearchFilter=${searchByText}&pageSize=60&`,
      searchDeps,
      paramUrl
    );

  const [postDataToCrm, setPostDataToCrm] = useState([]);

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
    setSearchByText(event.target.value);
    setSearchDeps(event.target.value.length);
  };

  const optimizedSearchRecords = useCallback(debounce(handleSearch), []);
  const goBack = () => {
    router.back();
  };

  const handleSelectAll = () => {
    const allIds = journalistResult?.map(
      (journalist) => journalist?.intJournalistId
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
    AddToCrm(target, journoId);
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
    const { value, checked } = target;
    const postData = postDataToCrm;
    if (checked) {
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
    } else if (selectedJournalists?.length > 5) {
      warning("You can not add more than 5 journalists", "warning");
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
          }
        })
        .catch((error) => error(error, "error"))
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

  const clearBeats = (unselectId) => {
    if (sel.length > 1) {
      const updatedStateA = sel.filter((item) => item.beatid !== unselectId);
      setSel(updatedStateA);
    } else {
      warning("You can not remove last seleted beat", "warning");
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      loadMore();
    }
  };

  useEffect(() => {
    if (mediaBeat?.length > 0) {
      const intArray = selected.split(",").map((item) => parseInt(item, 10));
      const filteredStateA = mediaBeat.filter((item) =>
        intArray.includes(item.beatid)
      );
      setSel(filteredStateA);
    }
  }, [mediaBeat?.length, selected]);

  useEffect(() => {
    if (sel && sel.length > 0) {
      const extractId = sel.map((curItem) => curItem.beatid);
      setParamURL([extractId]);
    }
  }, [sel]);

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
    setJournalistResult(isdata?.list);
  }, [isdata?.list]);
  const [selectedJournalists, setSelectedJournalists] = useState([]);

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

  // useEffect(() => {
  // router.push(`/journalist-by-beat/${paramUrl}`);
  //   console.log("params: ", paramUrl);
  // }, [paramUrl]);

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
              <div className="relative flex gap-x-3">
                {journalistResult?.length > 0 && (
                  <>
                    <Link
                      href={""}
                      className="flex items-center whitespace-nowrap rounded-[5px] border border-[#002b5b] px-3  py-0 text-xs  text-[#002b5b]"
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
      <div className="section w-12/12  pl-8 pr-0">
        <div className="section w-11/12 py-6">
          <div className="mb-2 flex flex-wrap items-center gap-1">
            {sel.length > 0 && (
              <div className="flex items-center rounded-md  py-1 text-sm">
                Selected Beats :
              </div>
            )}
            {sel?.map((curItem, index) => (
              <div
                key={index}
                className="m-1 flex text-sm items-center rounded-md border border-gray-400 px-2 text-gray-600"
              >
                {curItem.beatName}
                <Link
                  href=""
                  onClick={() => clearBeats(curItem.beatid)}
                  className="material-icons-outlined icon-16 rounded-full text-gray-400 hover:text-gray-800"
                >
                  close
                </Link>
              </div>
            ))}

            <SelectedFilters
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />
          </div>

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
              <fieldset className="w-full self-start rounded-xl border border-gray-300 px-3 ">
                <h3 className="px-3 py-3 font-medium uppercase text-gray-900">
                  Filters
                </h3>
                <div className="w-full p-3">
                  <GetFiltersData
                    trackingId={trackingId}
                    type="Media"
                    selectedFilters={selectedFilters}
                    setSelectedFilters={setSelectedFilters}
                    url={`GetMediaFilter?BeatFilter=${selected}`}
                  />

                  <GetFiltersData
                    trackingId={trackingId}
                    type="Outlet"
                    selectedFilters={selectedFilters}
                    setSelectedFilters={setSelectedFilters}
                    url={`GetOutletFilter?BeatFilter=${selected}`}
                  />

                  <GetFiltersData
                    trackingId={trackingId}
                    type="City"
                    selectedFilters={selectedFilters}
                    setSelectedFilters={setSelectedFilters}
                    url={`GetCityFilter?BeatFilter=${selected}`}
                  />

                  <GetFiltersData
                    trackingId={trackingId}
                    type="Title"
                    selectedFilters={selectedFilters}
                    setSelectedFilters={setSelectedFilters}
                    url={`GetTitleFilter?BeatFilter=${selected}`}
                  />

                  <GetFiltersData
                    trackingId={trackingId}
                    type="Language"
                    selectedFilters={selectedFilters}
                    setSelectedFilters={setSelectedFilters}
                    url={`GetLanguageFilter?BeatFilter=${selected}`}
                  />
                </div>
              </fieldset>
            </aside>
            <article className="mt-[12px] flex w-full flex-col flex-wrap gap-6 self-start">
              <div className="flex flex-col">
                <ul className="flex items-center gap-x-1 text-xs text-gray-400">
                  <li className="flex items-center">
                    {sel.length > 0 && "Beat"}
                    <span className="material-icons-outlined b-font text-gray-400">
                      navigate_next
                    </span>
                  </li>
                  <li>Results {isdata?.total}</li>
                </ul>
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
                        onCheckboxChange={getSelectedData}
                        disabled={selectAllLabel === "Unselect All" && true}
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
              <div className="mt-2 flex justify-center">
                {loadingMore && (
                  <p className="whitespace-nowrap px-4  py-1 text-gray-400">
                    Loading journalists...
                  </p>
                )}
              </div>
            </article>
          </section>
        </div>
        {isOpen && (
          <BuildCampaign
            selectAllLabel={selectAllLabel}
            open={isOpen}
            filterValue={selectedFilters}
            beatFilter={selected}
            onClose={() => {
              setIsOpen(false);
              document.body.classList.remove("overflow-hidden");
            }}
            selectedJournalists={selectedJournalists}
          />
        )}
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
        {loading && (
          <div>
            <div className="opegue-4 fixed inset-0 z-50  max-h-screen bg-gray-600">
              <div className="lft50 absolute">
                <Spinner status={true} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalistByBeat;
