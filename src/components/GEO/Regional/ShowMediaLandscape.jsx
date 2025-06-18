"use client";

import { useState, useEffect, useRef } from "react";
// import { FiInfo } from "react-icons/fi";
import Link from "next/link";
import { RxArrowLeft } from "react-icons/rx";
import GraphStats from "./GraphStats";
import MediaOutletTable from "./MediaOutletTable";
import JournalistsTable from "./JournalistsTable";
import {
  GEOMEDIADENSITY,
  GEOOUTLET,
  GEOSTATS,
  GETALLJOURNO_REGIONAL,
  PRECRM_POSTDATA,
  regionMediaGraph,
  regionMetrix,
} from "../../../constants";
import userService from "../../../Services/user.service";
import { useNotification } from "../../ErrorAlert/ErrorContextNotification";
import BuildCampaign from "../../Campaign/BuildCampaign";
// import GetTrackingInfo from "../../Filters/GetTrackingInfo";
// import Filters from "./Filters";
import GetFiltersData from "./Filters";
import SelectedFilters from "../../SelectedFilters";

const ShowMediaLandscape = ({ cityId }) => {
  // const outletRef = useRef(null);
  // const citiesRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState("Media Outlet");
  // const [isMediaTypeDropDownOpen, setIsMediaTypeDropDownOpen] = useState(false);
  // const [isOutletDropDownOpen, setIsOutletDropDownOpen] = useState(false);
  // const [isCitiesDropDownOpen, setIsCitiesDropDownOpen] = useState(false);
  // const [selectedMediaType, setSelectedMediaType] = useState([]);
  // const [selectedOutlets, setSelectedOutlets] = useState([]);
  const [mediaValues, setMediaValues] = useState([]);
  const [cityFilter, setCityFilter] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [dynamicCities, setDynamicCities] = useState([]);

  //added by me......
  const [dynamicMediaUrl, setDynamicMediaUrl] = useState("");
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  // setDynamicMedia
  const [trackingId, setTrackingId] = useState();
  const [loading, setLoading] = useState(true);
  const [totalJournalists, setTotalJournalists] = useState(0);
  const [geoData, setGeoData] = useState([]);
  const [totalResult, setTotalResult] = useState("");
  const [uniqueOutlet, setUniqueOutlet] = useState("");
  const [sortData, setSortData] = useState("");
  const [mediaFilter, setMediaFilter] = useState([]);
  const [languageFilter, setLanguageFilter] = useState([]);
  const [outletFilter, setOutletFilter] = useState([]);
  const [getToken, setGetToken] = useState("");
  const [selectAllLabel, setSelectAllLabel] = useState("Select All");
  const [selectedJournalists, setSelectedJournalists] = useState([]);
  const [selectedJournalistsLength, setLength] = useState(0);
  const [postDataToCrm, setPostDataToCrm] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({ count: 0 });
  const [showJourno, setShowJourno] = useState(false);
  const [byJournalist, setbyJournalist] = useState([]);
  //code for geo stats
  const [geoStatData, setGeoStatData] = useState([]);
  const [cityCount, setCityCount] = useState([]);
  const [langCount, setLangCount] = useState([]);
  const [mediaGraph, setMediaGraph] = useState([]);
  const [regionalMatrix, setRegionalMatrix] = useState({});
  // const { cityId } = useParams();
  //  const [cityId] = useState("1064");
  const { showNotification } = useNotification();
  const success = (msg, type) => showNotification(msg, type);
  const warning = (msg, type) => showNotification(msg, type);
  const error = (msg, type) => showNotification(msg, type);

  //CODE FOR ALL TOP 4 GRAPHS START
  let data1 = `${GEOSTATS}?CityFilter=${decodeURIComponent(cityId)}`;
  let data2 = `${GEOMEDIADENSITY}?CityFilter=${decodeURIComponent(cityId)}`;
  let data3 = `${regionMetrix}?CityFilter=${decodeURIComponent(cityId)}`;
  let data4 = `${regionMediaGraph}?CityFilter=${decodeURIComponent(cityId)}`;

  const geoStatsCount = async () => {
    // setLoading(true);
    try {
      const url1 = data1;
      const url2 = data2;
      const url3 = data3;
      const url4 = data4;
      const selectedArray = decodeURIComponent(cityId)?.split(",").map(Number);
      const [response1, response2, response3, response4] = await Promise.all([
        userService.get(url1),
        userService.get(url2),
        userService.post(url3, selectedArray),
        userService.get(url4),
      ]);

      if (response1?.response?.status === "Ok") {
        setGeoStatData(response1.data);
      }
      if (response2?.response?.status === "Ok") {
        setCityCount(response2.data?.cityCount || []);
        setLangCount(response2.data?.langCount || []);
      }
      if (response3?.response?.status === "Ok") {
        setRegionalMatrix(response3.data);
      }
      if (response4?.response?.status === "Ok") {
        setMediaGraph(response4.mediaCount);
      }
    } catch (error) {
      console.log(error, "check error");
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    geoStatsCount();
  }, [cityId]);

  //CODE FOR ALL TOP 4 GRAPHS END

  const getGeoJournalist = async (finalUrl) => {
    setLoading(true);
    try {
      const url4 = finalUrl;
      const [response4] = await Promise.all([userService.get(url4)]);

      if (response4?.response?.status === "Ok") {
        setbyJournalist((old) => [...old, ...response4?.data]);
        setTotalJournalists(response4?.nextpagetoken?.totalResult);
        setGetToken(response4?.nextpagetoken?.token);
        // setMediaFilter(response4?.filters?.mediaFilter);
        // setLanguageFilter(response4?.filters?.languageFilter);
        // setOutletFilter(response4?.filters?.outletFilter);
      }
    } catch (error) {
      console.log(error, "check error");
    } finally {
      setLoading(false);
    }
  };

  //OUTLET API CALL FOR REGIONAL DATA HERE
  const regionalOutlet = async (finalUrl) => {
    setLoading(true);
    try {
      const url3 = finalUrl;

      const [response3] = await Promise.all([userService.get(url3)]);
      if (response3?.response?.status === "Ok") {
        setGeoData((old) => [...old, ...response3?.data]);
        setGetToken(response3?.nextpagetoken?.token);
        setTotalResult(response3?.nextpagetoken?.totalResult);
        setUniqueOutlet(response3?.uniqueOutlet);
        // setMediaFilter(response3?.filters?.mediaFilter);
        // setLanguageFilter(response3?.filters?.languageFilter);
        // setOutletFilter(response3?.filters?.outletFilter);
      }
    } catch (error) {
      console.log(error, "check error");
    } finally {
      setLoading(false);
    }
  };

  // let url = `${GEOOUTLET}`;
  // let getJour = `${GETALLJOURNO}`;

  //FOR URL BUILDER WHENEVER SELECT THE FILTER START
  const urlBuilder = (baseUrl, dynamicCities, currentAppliedSearch) => {
    let urlBuilders = baseUrl;

    for (let allKeys in selectedFilters) {
      if (selectedFilters[allKeys].length > 0) {
        let output = selectedFilters[allKeys].map((curItem) => {
          const match = curItem.match(/\d+/);
          return match ? parseInt(match[0], 10) : null;
        });

        if (allKeys === "Media Type") {
          urlBuilders = `${urlBuilders}&MediaFilter=${output}`;
        } else if (allKeys === "Language") {
          urlBuilders = `${urlBuilders}&LanguageFilter=${output}`;
        } else if (allKeys === "Outlet") {
          urlBuilders = `${urlBuilders}&OutletFilter=${output}`;
        }
      }
    }

    // Explicitly add dynamicCities as a CitiesFilter
    if (dynamicCities?.length > 0) {
      urlBuilders = `${urlBuilders}&CitiesFilter=${dynamicCities.join(",")}`;
    }

    if (currentAppliedSearch) {
      if (showJourno) {
        urlBuilders = `${urlBuilders}&SearchFilter=${encodeURIComponent(currentAppliedSearch)}`;
      } else {
        urlBuilders = `${urlBuilders}&searchText=${encodeURIComponent(currentAppliedSearch)}`;
      }
    }

    const hasFilters = Object.values(selectedFilters).some(
      (filters) => filters.length > 0
    );

    urlBuilders = `${urlBuilders}&IsFilter=${hasFilters ? "true" : "true"}`;
    return urlBuilders;
  };

  // STEP 2: API call only when dynamicCities, cityId, or showJourno change
  useEffect(() => {
    const handler = setTimeout(() => {
      if (!cityId && dynamicCities.length === 0) return;

      const baseUrl = showJourno
        ? `${GETALLJOURNO_REGIONAL}?CityFilter=${dynamicCities.length > 0 ? dynamicCities : cityId}&isRegionalSorting=true`
        : `${GEOOUTLET}?&sortOrder=${sortData}&CityFilter=${dynamicCities.length > 0 ? dynamicCities : cityId}`;

      const finalUrl = urlBuilder(baseUrl, dynamicCities, appliedSearch);

      if (showJourno) {
        getGeoJournalist(finalUrl);
        setbyJournalist([]);
      } else {
        regionalOutlet(finalUrl);
        setGeoData([]);
      }
    }, 100); // debounce for 100ms

    return () => clearTimeout(handler);
  }, [dynamicCities, cityId, showJourno, sortData, appliedSearch]);

  const sortBy = () => {
    setSortData(sortData === "" ? "desc" : sortData === "desc" ? "" : "desc");
  };

  //LOAD MORE COMMAN FUNCTION FOR BOTH TABS
  const loadMore = () => {
    if (!cityId && dynamicCities.length === 0) return;
    const baseUrl = showJourno
      ? `${GETALLJOURNO_REGIONAL}?CityFilter=${dynamicCities.length > 0 ? dynamicCities : cityId}&isRegionalSorting=true`
      : `${GEOOUTLET}?sortOrder=${sortData}&CityFilter=${dynamicCities.length > 0 ? dynamicCities : cityId}`;

    const finalUrl = urlBuilder(baseUrl, dynamicCities, appliedSearch);
    if (getToken && !showJourno) {
      let token = "token=" + encodeURIComponent(getToken);
      regionalOutlet(finalUrl + "&" + token);
    } else {
      let token = "token=" + encodeURIComponent(getToken);
      getGeoJournalist(finalUrl + "&" + token);
    }
  };

  //BUILD CAMPAIGN CODE
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

  //ADD IN CRM
  const getSelectedData = (target, journoId) => {
    handleSelect(journoId);

    AddToCrm(target.checked, journoId);
  };

  //ADD TO CRM CODE
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

  //HANDLE SINGLE SELECT TO ADD CRM ETC.
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

  //HANDLE SELECT ALL CODE
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

  //SET SELECTED JOURNALIST LENGTH
  useEffect(() => {
    setLength(selectedJournalists.length);
  }, [selectedJournalists]);

  useEffect(() => {
    if (selectedFilters["Outlet"]?.length > 0) {
      delete selectedFilters["Outlet"];
    }
  }, [selectedFilters["Media Type"]?.length]);

  //FILTER USE ----> URL FOR SELECTED VALUES FROM FILTER
  useEffect(() => {
    let mediaFilter = null;
    let cityFilter = cityId;
    let hasMedia = false;

    // Now loop through the keys
    for (let allKeys in selectedFilters) {
      if (selectedFilters[allKeys].length > 0) {
        let output = selectedFilters[allKeys].map((curItem) => {
          const match = curItem.match(/\d+/);
          return match ? parseInt(match[0], 10) : null;
        });

        if (allKeys === "Media Type") {
          mediaFilter = output;
          hasMedia = true;
        }

        if (allKeys === "Cities") {
          setDynamicCities(output);
          cityFilter = output;
        }
      } else {
        // Clear dynamic cities if Cities array is empty
        if (allKeys === "Cities") {
          setDynamicCities([]);
          cityFilter = cityId;
        }
      }
    }

    // Set URL only once after processing filters
    let url = `GetOutletFilter?`;
    if (hasMedia) {
      url += `MediaFilter=${mediaFilter}&`;
    }
    url += `CityFilter=${cityFilter}`;
    setDynamicMediaUrl(url);
  }, [selectedFilters]);

  //TRACKING CODE FOR BACKEND
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
  //TRACKING USEEFFECT CODE FOR BACKEND
  useEffect(() => {
    setTrackingId(generateUUID());
    let cityFilterBind = JSON.parse(localStorage.getItem("cities"));
    if (cityFilterBind && cityFilterBind.length > 0) {
      setCityFilter(cityFilterBind);
    }
  }, []);

  // STEP 1: Update dynamicCities when selectedFilters["Cities"] changes
  useEffect(() => {
    const cityFilter = selectedFilters["Cities"] || [];
    const output = cityFilter
      .map((curItem) => {
        const match = curItem.match(/\d+/);
        return match ? parseInt(match[0], 10) : null;
      })
      .filter(Boolean); // Remove nulls
    setDynamicCities(output);
  }, [selectedFilters]);

  //TAB CHANGES MEDIA OUTLET/ALL JOURNALIST
  const showJournoFun = (type) => {
    if (type) {
      setShowJourno(true);
    } else {
      setShowJourno(false);
    }
    setSelectedFilters({ count: 0 });
    setSelectAllLabel("Select All");
    setSelectedJournalists([]);
    setSearch("");
    setAppliedSearch("");
  };

  return (
    <main className="font-inter">
      <p className="container mx-auto flex items-center gap-2 py-2 px-5">
        {regionalMatrix?.stateMatrix?.vchState
          ?.split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ")}
        {/* <FiInfo /> */}
      </p>

      <hr className="text-black/10" />

      <section className="flex flex-wrap md:flex-nowrap justify-between container mx-auto">
        <article className="border-l border-black/10 py-3 px-5 sm:first:border-none flex-grow border-b md:border-b-0">
          <div className="flex items-center gap-1">
            <img
              src="/assets/showmedia-population.webp"
              alt="Population"
              width={15}
              height={15}
            />
            <span className="text-sm">Total Population</span>
          </div>

          <p className="text-[#666666] text-xl sm:text-2xl mt-1 font-semibold">
            {regionalMatrix?.stateMatrix?.totalPopulation || "N/A"}
          </p>
        </article>

        <article className="border-l border-black/10 py-3 px-5 sm:first:border-none flex-grow border-b md:border-b-0">
          <div className="flex items-center gap-1">
            <img
              src="/assets/showmedia-gdp.webp"
              alt="GSDP"
              width={15}
              height={15}
            />
            <span className="text-sm">GSDP</span>
          </div>

          <p className="text-[#666666] text-xl sm:text-2xl mt-1 font-semibold">
            {regionalMatrix?.stateMatrix?.gdp || "N/A"}
          </p>
        </article>

        <article className="border-l border-black/10 py-3 px-5 sm:first:border-none flex-grow border-b md:border-b-0">
          <div className="flex items-center gap-1">
            <img
              src="/assets/showmedia-literacyrate.webp"
              alt="Literacy Rate"
              width={15}
              height={15}
            />
            <span className="text-sm">Literacy Rate</span>
          </div>

          <p className="text-[#666666] text-xl sm:text-2xl mt-1 font-semibold">
            {regionalMatrix?.stateMatrix?.literacyRate || "N/A"}
          </p>
        </article>

        <article className="border-l border-black/10 py-3 px-5 sm:first:border-none flex-grow border-b md:border-b-0">
          <div className="flex items-center gap-1">
            <img
              src="/assets/showmedia-staterank.webp"
              alt="State Rank"
              width={15}
              height={15}
            />
            <span className="text-sm">Capital City</span>
          </div>

          <p className="text-[#666666] text-xl sm:text-2xl mt-1 font-semibold">
            {regionalMatrix?.capitalCity?.charAt(0)?.toUpperCase() +
              regionalMatrix?.capitalCity?.slice(1)?.toLowerCase() || "N/A"}
          </p>
        </article>

        <article className="border-l border-black/10 py-3 px-5 sm:first:border-none flex-grow border-b md:border-b-0">
          <div className="flex items-center gap-1">
            <img
              src="/assets/showmedia-income.webp"
              alt="State Rank"
              width={15}
              height={15}
            />
            <span className="text-sm">Per Capita Income</span>
          </div>

          <p className="text-[#666666] text-xl sm:text-2xl mt-1 font-semibold">
            {regionalMatrix?.stateMatrix?.perCapitaIncome || "N/A"}
          </p>
        </article>
      </section>

      <GraphStats
        uniqueOutlet={uniqueOutlet}
        langCount={langCount}
        cityCount={cityCount}
        geoStatData={geoStatData}
        mediaType={mediaGraph}
        totalResult={totalResult}
      />

      <div className="container mx-auto">
        <Link
          href={"/regional"}
          className="px-5 flex flex-start w-fit items-center gap-1 pt-4 font-medium text-sm"
        >
          <RxArrowLeft size={15} />
          Back
        </Link>
      </div>

      <div className="flex  flex-col sm:flex-row sm:items-center justify-between container gap-4 mx-auto pt-8 pb-0 px-5">
        <div className="flex items-center gap-3 text-sm">
          <p
            className={`${selectedOption === "Media Outlet" && "underline underline-offset-4 decoration-2 decoration-[#002B5B] font-medium"} cursor-pointer`}
            onClick={() => {
              showJournoFun(false);
              setSelectedOption("Media Outlet");
            }}
          >
            Media Outlet
          </p>

          <p
            className={`${selectedOption === "Journalists" && "underline underline-offset-4 decoration-2 decoration-[#002B5B] font-medium"} cursor-pointer`}
            onClick={() => {
              showJournoFun(true);
              setSelectedOption("Journalists");
            }}
          >
            Journalists
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center sm:justify-between gap-4 lg:w-1/2">
          <div className="sm:w-full relative inline-flex gap-4">
            <GetFiltersData
              type="Media Type"
              trackingId={trackingId}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              url={`GetMediaFilter?CityFilter=${dynamicCities?.length > 0 ? dynamicCities : cityId}`}
            />
            {!showJourno && (
              <GetFiltersData
                type="Language"
                trackingId={trackingId}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                url={`GetLanguageFilter?CityFilter=${dynamicCities?.length > 0 ? dynamicCities : cityId}`}
                // toggleMediaType={toggleMediaType}
              />
            )}
            {showJourno && (
              <GetFiltersData
                type="Outlet"
                trackingId={trackingId}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                // url={`GetOutletFilter`}
                url={`${dynamicMediaUrl ? dynamicMediaUrl : `GetOutletFilter?CityFilter=${dynamicCities?.length > 0 ? dynamicCities : cityId}`}`}
                // setDynamicMedia
              />
            )}
            <GetFiltersData
              type="Cities"
              trackingId={trackingId}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              url={`GetCityFilter?CityFilter=${cityId}`}
              // url={`GetCityFilter?CityFilter=${dynamicCities?.length > 0 ? dynamicCities : cityId}`}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between container gap-4 mx-auto pb-4">
        <SelectedFilters
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      </div>

      {!showJourno ? (
        <MediaOutletTable
          search={search}
          setSearch={(e) => setSearch(e.target.value)}
          applySearch={() => setAppliedSearch(search)}
          data={geoData}
          load={loading}
          token={getToken}
          loadMore={loadMore}
          sortBy={sortBy}
          selectedCities={dynamicCities?.length > 0 ? dynamicCities : cityId}
        />
      ) : (
        <JournalistsTable
          search={search}
          setSearch={(e) => setSearch(e.target.value)}
          applySearch={() => setAppliedSearch(search)}
          load={loading}
          token={getToken}
          selectAllLabel={selectAllLabel}
          loadMore={loadMore}
          selectedJournalistsLength={selectedJournalistsLength}
          showJourno={showJourno}
          byJournalist={byJournalist}
          handleSelectAll={handleSelectAll}
          totalJournalists={totalJournalists}
          addInCRM={addInCRM}
          disabled={selectAllLabel === "Unselect All" && true}
          onCheckboxChange={getSelectedData}
          selectedJournalists={selectedJournalists}
          buildCampPopup={buildCampPopup}
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
          cityFilterbyJourno={
            selectedCities?.length > 0 ? selectedCities : cityId
          }
        />
      )}
    </main>
  );
};

export default ShowMediaLandscape;
