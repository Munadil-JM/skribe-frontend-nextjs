"use client";

import { useEffect, useState } from "react";
import userService from "../../../Services/user.service";
import { GETALLJOURNO, GETEMAILQUOTA, STATICCOUNT } from "../../../constants";
import Spinner from "../../../Services/Spinner";
import TwitterRecords from "./TwitterRecords";
import GetFiltersData from "../../Filters/GetFiltersData";
import Link from "next/link";
// import Tooltip from "../../Tooltip/Tooltip";
import PitchAList from "../../Campaign/PitchAList";
import BuildCampaign from "../../Campaign/BuildCampaign";
import SelectedFilters from "../../SelectedFilters";
import { useNotification } from "../../ErrorAlert/ErrorContextNotification";

const Twitter = () => {
  const { showNotification } = useNotification();
  // const success = (msg, type) => showNotification(msg, type);
  const warning = (msg, type) => showNotification(msg, type);
  // const error = (msg, type) => showNotification(msg, type);
  const [loading, setLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({ count: 0 });
  const [getToken, setGetToken] = useState("");
  const [socialResult, setSocialResult] = useState([null]);
  const [totalResult, setTotalResult] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [initialLoad, setInitialLoad] = useState(true);
  let url = `${GETALLJOURNO}?IsX=true&pageSize=60`;

  // const [filterLoading, setFilterLoading] = useState(false);
  // const [filters, setFilters] = useState([]);

  //[/USE FOR FOLLOWER COUNT FILTER SECTION ONLY END]

  //[FOR PITCH TO CHECK EMAIL BALANCE START]
  const [selectedJournalists, setSelectedJournalists] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [listIsOpen, setListIsOpen] = useState(false);
  // const [quotaAdded, setQuotaAdded] = useState("");
  const [remainingQuota, setRemainingQuota] = useState("");
  // const [monthlyEMailQuota, setMonthlyEmailQuota] = useState("");
  // const [usedQuota, setUsedQuota] = useState("");
  // const [totalQuota, setTotalQuota] = useState("");
  // const [emailQuotaStatus, setEmailQuotaStatus] = useState(false);

  const [selectAllLabel, setSelectAllLabel] = useState("Select All");
  const [selectedJournalistsLength, setLength] = useState(0);
  //[/FOR PITCH TO CHECK EMAIL BALANCE END]

  //TRACKING ID CODE START
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
  //TRACKING ID CODE END
  //FOR URL BUILDER WHENEVER SELECT THE LEFT FILTER END

  const getSocialData = (url) => {
    setLoading(true);
    userService
      .get(url)
      .then((result) => {
        if (result?.response?.status === "Ok") {
          setSocialResult((prevData) => [...prevData, ...result.data]);
          setGetToken(result?.nextpagetoken?.token);
          setTotalResult(result?.nextpagetoken?.totalResult);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //FOR URL BUILDER WHENEVER SELECT THE LEFT FILTER START
  const urlBuilder = (token = null) => {
    let urlBuilders = url;

    for (let allKeys in selectedFilters) {
      if (selectedFilters[allKeys].length > 0) {
        // let output = selectedFilters[allKeys].map((curItem) => curItem);

        if (allKeys === "Followers" && selectedFilters[allKeys]?.length > 0) {
          // urlBuilders = `${urlBuilders}&FollowersFilter=${output}`;
          let followerExtract = selectedFilters[allKeys].map(
            (curItem) => curItem.split(" ")[0]
          );

          urlBuilders = `${urlBuilders}&FollowersFilter=${followerExtract}`;
        }
        let output = selectedFilters[allKeys].map((curItem) => {
          const match = curItem.match(/\d+/);
          return match ? parseInt(match[0], 10) : null;
        });

        if (selectedFilters[allKeys].length > 0 && allKeys === "Media") {
          urlBuilders = `${urlBuilders}&MediaFilter=${output}`;
        } else if (selectedFilters[allKeys]?.length > 0 && allKeys === "City")
          urlBuilders = `${urlBuilders}&CityFilter=${output}`;
        else if (selectedFilters[allKeys]?.length > 0 && allKeys === "Outlet")
          urlBuilders = `${urlBuilders}&OutletFilter=${output}`;
        else if (selectedFilters[allKeys]?.length > 0 && allKeys === "Beat")
          urlBuilders = `${urlBuilders}&BeatFilter=${output}`;
        // else if (selectedFilters[allKeys]?.length > 0 && allKeys === "Follower")
        //   urlBuilders = `${urlBuilders}&FollowersFilter=${output}`;

        // else if (token) urlBuilders = `${urlBuilders}&${token}`;
      }
      if (token) urlBuilders = `${urlBuilders}&${token}`;
      if (searchInput && !urlBuilders.includes("SearchFilter")) {
        urlBuilders = `${urlBuilders}&SearchFilter=${searchInput}`;
      }
    }

    url = urlBuilders + "&IsFilter=false";
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    if (searchInput) {
      let timer = setTimeout(() => {
        urlBuilder();
        setSocialResult([]);
        getSocialData(url);
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    } else {
      if (!initialLoad) {
        urlBuilder();
        setSocialResult([]);
        getSocialData(url);
      }
      setInitialLoad(false);
    }
  }, [searchInput]);

  //[CHECKBOX SELECT UNSELECT FUNCTIONALITY START]
  const getSelectedData = (target, journoId) => {
    const { checked } = target;
    if (checked && !selectedJournalists.includes(journoId)) {
      setSelectedJournalists((old) => [...old, journoId]);
    } else {
      let del = selectedJournalists.filter((curElem) => curElem !== journoId);
      setSelectedJournalists(del);
    }
  };

  //[CHECKBOX SELECT UNSELECT FUNCTIONALITY END]

  //[FOR PITCH TO CHECK MAIL BALANCE START]
  const getMailQuota = () => {
    // setEmailQuotaStatus(true);
    userService
      .get(`${GETEMAILQUOTA}`)
      .then((result) => {
        if (result?.response?.status === "Ok") {
          // setQuotaAdded(result?.data?.emailQuotaAddOn);
          setRemainingQuota(result?.data?.remainingQuota);
          // setMonthlyEmailQuota(result?.data?.monthalyEmailQuota);
          // setTotalQuota(result?.data?.totalQuota);
          // setUsedQuota(result?.data?.usedQuota);
        }
      })
      .catch((error) => {
        error(error?.message, "error");
      })
      .finally((result) => {
        // setEmailQuotaStatus(false);
      });
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

  // useEffect(() => {
  //   getMailQuota();
  // }, []);
  const handleSelectAll = () => {
    if (selectedJournalists.length === socialResult.length) {
      setSelectedJournalists([]);
      setSelectAllLabel("Select All");
    } else {
      const allIds = socialResult.map(
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

  //[/FOR PITCH TO CHECK MAIL BALANCE END]

  useEffect(() => {
    urlBuilder();
    setSocialResult([]);
    getSocialData(url);
  }, [selectedFilters]);
  useEffect(() => {
    setLength(selectedJournalists.length);
  }, [selectedJournalists]);
  useEffect(() => {
    if (loading) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [loading]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      if (getToken) {
        let token = "token=" + encodeURIComponent(getToken);
        urlBuilder(token);
        getSocialData(url);
      }
    }
  };

  useEffect(() => {
    if (selectAllLabel === "Select All") {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [selectAllLabel === "Select All", getToken]);

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
                {socialResult?.length > 0 && (
                  <>
                    <Link
                      href={""}
                      className="flex relative items-center whitespace-nowrap rounded-[5px] border border-[#002b5b] px-3  py-0 text-xs text-[#002b5b]"
                      onClick={handleSelectAll}
                    >
                      {selectAllLabel}

                      {selectedJournalists?.length > 0 && (
                        <div className="absolute -left-6 -top-4 flex h-9 w-9 items-center justify-center rounded-2xl bg-[#fac540] text-center align-middle text-xs font-bold text-[#002b5b]">
                          {selectAllLabel === "Unselect All" &&
                          totalResult <= STATICCOUNT
                            ? totalResult
                            : selectAllLabel === "Unselect All"
                              ? STATICCOUNT
                              : selectedJournalistsLength}
                        </div>
                      )}
                    </Link>
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
      <SelectedFilters
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      <div className="w-11/12 p-6 py-6 pt-0 pl-8 pr-0 section">
        <section className="flex gap-x-8">
          <aside className="flex flex-col w-4/12 gap-6 mt-3 md:flex md:w-7/12 lg:w-1/3">
            <div className="relative mt-[18px] flex items-center justify-between"></div>

            <fieldset className="self-start w-full px-3 border border-gray-300 rounded-xl ">
              <h3 className="p-3 text-gray-900 uppercase text-md">Filters</h3>
              <div className="w-full p-3">
                <GetFiltersData
                  trackingId={trackingId}
                  type="Media"
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  url={`MediaFilter?IsX=true`}
                />
                <GetFiltersData
                  trackingId={trackingId}
                  type="City"
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  url={`CityFilter?IsX=true`}
                />
                <GetFiltersData
                  trackingId={trackingId}
                  type="Outlet"
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  url={`OutletFilter?IsX=true`}
                />
                <GetFiltersData
                  trackingId={trackingId}
                  type="Beat"
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  url={`BeatFilter?IsX=true`}
                />
                <GetFiltersData
                  trackingId={trackingId}
                  type="Followers"
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  url="preDefineData"
                />
              </div>
            </fieldset>
          </aside>
          <article className="flex flex-col flex-wrap self-start w-full gap-6 mt-3">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <ul className="flex items-center text-xs text-gray-400 gap-x-1">
                  <li className="flex items-center">
                    Social
                    <span className="text-gray-400 material-icons-outlined b-font">
                      navigate_next
                    </span>
                  </li>
                  <li className="flex items-center">X</li>
                  {/* <li className="flex items-center">Total Result</li>
                  {totalResult} */}
                </ul>
              </div>

              <div className="flex items-center rounded-lg border border-gray-300 bg-white pl-2">
                <span className="material-icons-outlined text-sm text-gray-300">
                  search
                </span>
                <input
                  type="search"
                  className="text-sm w-full rounded-lg bg-white px-3 py-1 text-gray-400 focus:outline-none"
                  placeholder="Search By Name"
                  value={searchInput}
                  onChange={(e) => handleSearch(e)}
                />
              </div>
            </div>
            <div className="flex w-full flex-wrap  self-start [&>*:last-child]:flex-none [&>*:nth-child(n-2)]:flex-none">
              {/* {loading
                ? "Loading..."
                : */}
              {socialResult
                ? socialResult.length > 0
                  ? socialResult?.map((curItem, ind) => (
                      <TwitterRecords
                        key={ind}
                        data={curItem}
                        isSelected={selectedJournalists.includes(
                          curItem?.intJournalistId
                        )}
                        onCheckboxChange={getSelectedData}
                        disabled={selectAllLabel === "Unselect All" && true}
                      />
                    ))
                  : loading
                    ? "Loading..."
                    : "No Record Found"
                : "No Record Found"}
            </div>

            <div className="flex justify-center mt-2">
              {/* {loadingMore && (
                <p className="px-4 py-1 text-gray-400 whitespace-nowrap">
                  Loading journalists...
                </p>
              )} */}
            </div>
          </article>
        </section>

        {/* <div className="absolute inset-0 bg-gray-600 opegue-4">test</div> */}
        {/* {loading && (
          <div>
            <div className="fixed inset-0 z-50 max-h-screen bg-gray-600 opegue-4">
              <div className="absolute lft50">
                <Spinner status={true} />
              </div>
            </div>
          </div>
        )} */}

        {loading && (
          <div>
            <div className="fixed inset-0 z-50 max-h-screen bg-gray-600 opegue-4">
              <div className="absolute lft50">
                <Spinner status={true} />
              </div>
            </div>
          </div>
        )}
      </div>

      {listIsOpen && (
        <PitchAList
          open={listIsOpen}
          onClose={() => {
            setListIsOpen(false);
            document.body.classList.remove("overflow-hidden");
            setSelectedJournalists([]);
          }}
          selectedList={selectedJournalists}
          emailBalance={remainingQuota}
          getMail={getMailQuota}
          updateTracking=""
        />
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
          isFilter={"X"}
        />
      )}
    </div>
  );
};

export default Twitter;
