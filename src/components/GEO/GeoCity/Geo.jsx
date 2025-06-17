"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import PodcastTooltip from "../../Tooltip/PodcastTooltip";
// import CityBreakDown from "./CityBreakDown";
import Link from "next/link";
import userService from "../../../Services/user.service";
import {
  GEOMEDIADENSITY,
  GEOOUTLET,
  GEOSTATS,
  GETALLJOURNO,
} from "../../../constants";
import Spinner from "../../../Services/Spinner";
// import GetFiltersData from "../../Filters/GetFiltersData";
// import { useLeftJournoSearch } from "../../utils/UrlBuilder";
import { PRECRM_POSTDATA, STATICCOUNT } from "../../../constants";
import MediaRank from "./MediaRank";
import GeoStats from "./GeoStats";
import GeoByJourno from "./GeoByJourno";
// import { useSearchContext } from "../../../context/MainSearchContext";
import BuildCampaign from "../../Campaign/BuildCampaign";
import SelectedFilters from "../../SelectedFilters";
import { useNotification } from "../../ErrorAlert/ErrorContextNotification";

const Geo = ({ cityId }) => {
  const [mediaFilter, setMediaFilter] = useState([]);
  const [languageFilter, setLanguageFilter] = useState([]);
  const [outletFilter, setOutletFilter] = useState([]);
  // const { sVal } = useSearchContext();
  const { showNotification } = useNotification();
  const success = (msg, type) => showNotification(msg, type);
  const warning = (msg, type) => showNotification(msg, type);
  // const error = (msg, type) => showNotification(msg, type);

  const [loading, setLoading] = useState(false);
  const [trackingId, setTrackingId] = useState();
  const [selectedFilters, setSelectedFilters] = useState({ count: 0 });
  const [showJourno, setShowJourno] = useState(false);
  // const [initialHit, setInitialHit] = useState(false);
  const [getToken, setGetToken] = useState("");

  const [geoData, setGeoData] = useState([]);
  const [geoToken, setGeoToken] = useState("");
  const [outletResults, setOutletResults] = useState("");
  const [byJournalist, setbyJournalist] = useState([]);

  let url = `${GEOOUTLET}?CityFilter=${cityId}`;
  let getJour = `${GETALLJOURNO}?CityFilter=${cityId}`;
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

  const [geoStatData, setGeoStatData] = useState([]);
  const [cityCount, setCityCount] = useState([]);
  const [langCount, setLangCount] = useState([]);
  const [uniqueOutlet, setUniqueOutlet] = useState("");
  const [selectedJournalists, setSelectedJournalists] = useState([]);
  const [selectAllLabel, setSelectAllLabel] = useState("Select All");
  const [selectedJournalistsLength, setLength] = useState(0);
  const [postDataToCrm, setPostDataToCrm] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [totalJournalists, setTotalJournalists] = useState(0);
  let storeData = localStorage.getItem("geoCity");
  let data1 = `${GEOSTATS}?CityFilter=${cityId}`;
  let data2 = `${GEOMEDIADENSITY}?CityFilter=${cityId}`;
  const GeoStatsCount = async () => {
    // setLoading(true);
    try {
      const url1 = data1;
      const url2 = data2;

      const [response1, response2] = await Promise.all([
        userService.get(url1),
        userService.get(url2),
      ]);

      if (response1?.response?.status === "Ok") {
        setGeoStatData(response1.data);
      }
      if (response2?.response?.status === "Ok") {
        setCityCount(response2.data?.cityCount);
        setLangCount(response2.data?.langCount);
      }
    } catch (error) {
      console.log(error, "check error");
    } finally {
      // setLoading(false);
    }
  };
  useEffect(() => {
    GeoStatsCount();
  }, [cityId]);

  // console.log(uniqueOutlet, "unique outlet here...");

  //get BY MEDIA RANK AND LEFT FILTERS
  const geoWithFilter = async (finalUrl) => {
    setLoading(true);
    try {
      const url3 = finalUrl;

      const [response3] = await Promise.all([userService.get(url3)]);

      if (response3?.response?.status === "Ok") {
        setGeoData((old) => [...old, ...response3.data]);
        setUniqueOutlet(response3?.uniqueOutlet);
        setGeoToken(response3?.nextpagetoken?.token);
        setOutletResults(response3?.nextpagetoken?.totalResult);
        setMediaFilter(response3?.filters?.mediaFilter);
        setLanguageFilter(response3?.filters?.languageFilter);
        setOutletFilter(response3?.filters?.outletFilter);
      }
    } catch (error) {
      console.log(error, "check error");
    } finally {
      setLoading(false);
    }
  };

  //FOR URL BUILDER WHENEVER SELECT THE LEFT FILTER START
  const urlBuilder = (baseUrl) => {
    let urlBuilders = baseUrl;

    for (let allKeys in selectedFilters) {
      if (selectedFilters[allKeys].length > 0) {
        let output = selectedFilters[allKeys].map((curItem) => {
          const match = curItem.match(/\d+/);
          return match ? parseInt(match[0], 10) : null;
        });

        if (allKeys === "Media") {
          urlBuilders = `${urlBuilders}&MediaFilter=${output}`;
        } else if (allKeys === "Language") {
          urlBuilders = `${urlBuilders}&LanguageFilter=${output}`;
        } else if (allKeys === "Outlet") {
          urlBuilders = `${urlBuilders}&OutletFilter=${output}`;
        }
      }
    }
    // Adjust IsFilter based on selectedFilters
    const hasFilters = Object.values(selectedFilters).some(
      (filters) => filters.length > 0
    );
    urlBuilders = `${urlBuilders}&IsFilter=${hasFilters ? "false" : "true"}`;
    return urlBuilders;
  };

  //BY JOURNALIST TAB FETCH CALL START

  const getGeoJournalist = async (finalUrl) => {
    setLoading(true);
    try {
      const url4 = finalUrl;
      const [response4] = await Promise.all([userService.get(url4)]);
      setTotalJournalists(response4?.nextpagetoken?.totalResult);
      if (response4?.response?.status === "Ok") {
        setbyJournalist((old) => [...old, ...response4?.data]);
        setGetToken(response4?.nextpagetoken?.token);
        setMediaFilter(response4?.filters?.mediaFilter);
        setLanguageFilter(response4?.filters?.languageFilter);
        setOutletFilter(response4?.filters?.outletFilter);
      }
    } catch (error) {
      console.log(error, "check error");
    } finally {
      setLoading(false);
    }
  };

  // const initialCall = useRef(true);
  // useEffect(() => {

  //   if (initialCall.current) {
  //     initialCall.current = false;

  //     let baseUrl = showJourno ? getJour : url;
  //     const finalUrl = urlBuilder(baseUrl);

  //     if (showJourno) {
  //       getGeoJournalist(finalUrl);
  //       setbyJournalist([]);
  //     } else {
  //       geoWithFilter(finalUrl);
  //     }
  //   }
  // }, [selectedFilters, cityId]);

  const isInitialRender = useRef(true); // Ref to track the first render
  useEffect(() => {
    if (isInitialRender.current) {
      // Skip the logic for the first render
      isInitialRender.current = false;
      return;
    }

    let baseUrl;
    if (showJourno) {
      baseUrl = getJour;
    } else {
      baseUrl = url;
    }

    const finalUrl = urlBuilder(baseUrl);

    if (showJourno) {
      getGeoJournalist(finalUrl);
      setbyJournalist([]);
    } else {
      geoWithFilter(finalUrl);
      if (Object.keys(selectedFilters).length > 0) {
        setGeoData([]);
      }
    }
  }, [selectedFilters, cityId]);

  const showJournoFun = useMemo(() => {
    return (type) => {
      if (type) {
        setShowJourno(true);
      } else {
        setShowJourno(false);
      }
      setSelectedFilters({ count: 0 });
      setSelectAllLabel("Select All");
      setSelectedJournalists([]);
    };
  }, [showJourno]);

  useEffect(() => {
    setTrackingId(generateUUID());
  }, []);

  //ON SCROLL HIT BY JOURNO TAB
  const handleScroll = () => {
    const finalUrl = urlBuilder(getJour);
    if (getToken) {
      let token = "token=" + encodeURIComponent(getToken);
      getGeoJournalist(finalUrl + "&" + token);
    }
  };

  const loadMore = () => {
    const finalUrl = urlBuilder(url);
    if (geoToken) {
      let token = "token=" + encodeURIComponent(geoToken);
      geoWithFilter(finalUrl + "&" + token);
    }
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
      selectedJournalists.length - 1 === byJournalist.length
        ? "Unselect All"
        : "Select All"
    );
  };

  useEffect(() => {
    if (selectAllLabel === "Unselect All" && !selectedJournalists.length) {
      setSelectAllLabel("Select All");
    }
  }, [byJournalist]);

  const handleSelectAll = () => {
    if (selectedJournalists.length === byJournalist.length) {
      setSelectedJournalists([]);
      setSelectAllLabel("Select All");
    } else {
      const allIds = byJournalist.map(
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
      warning("you can not add to crm more than 5 Journalist", "warning");
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
              for (let j = 0; j < byJournalist.length; j++) {
                if (
                  postDataToCrm[i] === byJournalist[j].intJournalistId &&
                  byJournalist[j].crmStatus === false
                ) {
                  byJournalist[j].crmStatus = true;
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
    setLength(selectedJournalists.length);
  }, [selectedJournalists]);

  useEffect(() => {
    setSelectedFilters({ count: 0 });
  }, [cityId]);

  return (
    <>
      <section
        className="sticky bottom-1 left-0 top-[64px] z-10 flex gap-x-8 bg-white"
        style={{ borderBottom: "1px solid rgb(209 213 219)" }}
      >
        <div className="flex w-11/12 pt-0 pl-8 pr-0 section gap-x-6">
          <div className="hidden w-4/12 md:flex md:w-7/12 lg:w-1/3">
            <h2 className="text-sm flex items-center font-medium text-gray-500 py-4">
              {/* {geoStatData?.city?.slice(0, 1).toUpperCase()} */}
              {!!storeData &&
                storeData
                  ?.split(" ")
                  ?.map(
                    (word) =>
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  )
                  .join(" ")}
              &nbsp;
              <PodcastTooltip content="GEO Description" />
            </h2>
          </div>
          <div className="flex flex-col flex-wrap self-start w-full gap-6">
            <div className="flex flex-wrap items-center justify-end p-3 pr-0 bg-white">
              <div className="relative flex gap-x-3"></div>
            </div>
          </div>
        </div>
      </section>
      <main className="w-11/12 p-6 py-6 pt-0 pl-8 pr-0 mt-6 section">
        <GeoStats
          outletResults={outletResults}
          langCount={langCount}
          cityCount={cityCount}
          outCount={uniqueOutlet}
          geoStatData={geoStatData}
        />
      </main>
      <nav className="flex justify-between w-11/12 pl-8 pr-0 section">
        <div>
          <ul className="flex font-medium text-gray-500 gap-x-2">
            <li>
              <Link
                href=""
                onClick={() => showJournoFun(false)}
                className={`${
                  !showJourno && "border-b-2 border-[#002b5b] text-gray-600"
                }cursor-pointer px-2 pb-1 text-sm text-[#333] font-medium hover:border-b-2 border-[#002b5b] `}
              >
                Media Rank
              </Link>
            </li>
            <li>
              <Link
                href=""
                onClick={() => showJournoFun(true)}
                className={`${
                  showJourno && "border-b-2 border-[#002b5b] text-gray-600"
                }cursor-pointer px-2 pb-1  text-sm text-[#333] font-medium hover:border-b-2 border-[#002b5b]`}
              >
                Journalist
              </Link>
            </li>
          </ul>
        </div>
        {showJourno && (
          <div className="relative flex gap-x-3">
            {byJournalist?.length > 0 && (
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
                      totalJournalists <= STATICCOUNT
                        ? totalJournalists
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
        )}
      </nav>
      <SelectedFilters
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />

      {!showJourno ? (
        <MediaRank
          data={geoData}
          cityId={cityId}
          geoToken={geoToken}
          loadMore={loadMore}
          load={loading}
          trackingId={trackingId}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          mediaFilter={mediaFilter}
          languageFilter={languageFilter}
          outletFilter={outletFilter}
        />
      ) : (
        <GeoByJourno
          data={byJournalist}
          getToken={getToken}
          handleScroll={handleScroll}
          load={loading}
          cityId={cityId}
          trackingId={trackingId}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          setSelectedJournalists={setSelectedJournalists}
          disabled={selectAllLabel === "Unselect All" && true}
          onCheckboxChange={getSelectedData}
          selectedJournalists={selectedJournalists}
          // mediaFilter={mediaFilter}
          // languageFilter={languageFilter}
          // outletFilter={outletFilter}
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
          cityFilterbyJourno={cityId}
        />
      )}

      {loading && (
        <div>
          <div className="fixed inset-0 z-50 max-h-screen bg-gray-600 opegue-4">
            <div className="absolute lft50">
              <Spinner status={true} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Geo;
