"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname, useParams } from "next/navigation";
import BeatPopup from "../AllBeats/BeatPopup";
import { GEOBYCITY } from "../../constants";

import MainSearchContext, {
  useSearchContext,
} from "../../context/MainSearchContext";
import logo from "../assets/skribe-logo2.png";
import GetTrackingInfo from "../Filters/GetTrackingInfo";
import userService from "../../Services/user.service";
import HeaderLock from "../Tooltip/HeaderLock";
import tokenService from "../../Services/token.service";

const Searchbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mediaDropDown, setMediaDropDown] = useState(false);
  const [mediaDdValue, setMediaDdValue] = useState("Select Type");
  const [journalistSearch, setJournalistSearch] = useState("");
  const pathname = usePathname();
  const hideSearchBox = pathname.startsWith("/advance-search");
  const [currentPath, setCurrentPath] = useState(pathname);
  const previousPath = useRef(pathname);
  const testRef = useRef();
  const mediaRef = useRef();
  const geoSuggest = useRef();

  //[DROP DOWN CITY SUGGESTION DATA STORE START]
  const [loading, setLoading] = useState(false);
  const [showSuggetion, setShowSuggetion] = useState(false);
  const [citySuggestion, setCitySuggestion] = useState([]);
  const router = useRouter();
  //[DROP DOWN CITY SUGGESTION DATA STORE END]

  //FOLLOWING CODE FOR TRACKING
  const [roleType, setRoleType] = useState(tokenService.getLocalRole());
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setUserId(JSON.parse(localStorage.getItem("userInfo")));
  }, []);

  let pathvalue = pathname.split("/").filter((part) => part !== "");
  let urlRead = pathvalue[0];
  // console.log(urlRead, "check urlRead value");

  const outSide = (e) => {
    if (mediaRef.current && !mediaRef.current.contains(e.target)) {
      setMediaDropDown(false);
    }
    if (testRef.current && testRef.current.contains(e.target)) {
      setMediaDropDown(true);
    }

    if (geoSuggest.current && !geoSuggest.current.contains(e.target)) {
      setShowSuggetion(false);
    }
  };

  const getMediaValue = (eVal) => {
    setSearchVal("");
    setMediaDdValue(eVal);
    setMediaDropDown(false);
  };

  const { setSearchVal } = useSearchContext();
  const { id, outletId, name, cityId } = useParams();
  const storeValue = (e) => {
    const { value } = e.target;

    if (
      currentPath === `/mediaTypeOutlet/${id}/${name}` ||
      currentPath === "/media-types"
    ) {
      setJournalistSearch(value);
    } else if (value === "") {
      setJournalistSearch("");
      setSearchVal("");
    } else {
      setJournalistSearch(value);
      setSearchVal("");
    }
  };

  //WHEN CHOOSE LEFT PANEL NAVIGATION FROM DISCOVERY THEN
  //SEARCH DD VALUE WILL BE SEELCTED
  useEffect(() => {
    if (urlRead === `journalist-search`) {
      setMediaDdValue("All Journalists");
    } else if (urlRead === "media-types") {
      setMediaDdValue("MediaTypes");
      setSearchVal("");
    }
  }, [urlRead]);

  //[DROP DOWN GEO BY CITY CODE START]
  const byCityUrl = `${GEOBYCITY}?type=GEO`;
  const byOutletUrl = `${GEOBYCITY}?type=Outlet`;
  const geoCity = async (commonUrl) => {
    setLoading(true);
    setCitySuggestion([]);
    setShowSuggetion(true);
    try {
      const url1 = `${commonUrl}&searchText=${journalistSearch}`;
      const [response1] = await Promise.all([userService.get(url1)]);
      if (response1?.response?.status === "Ok") {
        setCitySuggestion(response1.data);
      } else if (response1?.response?.status === "Ok") {
      }
    } catch (error) {
      console.log(error, "check error");
    } finally {
      setLoading(false);
    }
  };

  //[USEEFFECT FOR GEO BY CITY DROP DOWN START]
  useEffect(() => {
    setShowSuggetion(false);
  }, [journalistSearch.length === 0]);
  useEffect(() => {
    if (mediaDdValue === "City" && journalistSearch?.length >= 2) {
      let timer = setTimeout(() => {
        geoCity(byCityUrl);
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
    if (mediaDdValue === "Outlet" && journalistSearch?.length >= 2) {
      let timer = setTimeout(() => {
        geoCity(byOutletUrl);
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [journalistSearch?.length]);
  //[/USEEFFECT FOR GEO BY CITY DROP DOWN END]

  //[/DROP DOWN GEO BY CITY CODE END]
  const searchFun = () => {
    setSearchVal(journalistSearch);

    if (journalistSearch && currentPath === "/journalist-search") {
      GetTrackingInfo(
        "journalistHeader",
        journalistSearch,
        urlRead,
        userId.id,
        ""
      );
    }
  };

  useEffect(() => {
    if (previousPath.current !== pathname) {
      setCurrentPath(pathname);
      previousPath.current = pathname;
    }
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("click", outSide);
    return () => {
      window.removeEventListener("click", outSide);
    };
  }, []);
  // console.log(citySuggestion, "check city suggetion");
  const changeUrl = (val, id, mediaType) => {
    localStorage.setItem("geoCity", val);
    setShowSuggetion(false);
    setJournalistSearch("");
    if (mediaType) {
      router.push(`/journalist-by-outlet/${mediaType}/${id}/${val}`);
    } else {
      router.push(`/geo/${id}`);
    }
  };
  return (
    <>
      <div className="flex items-center">
        <MainSearchContext>
          <div className="hidden pr-2 md:pr-10 lg:flex">
            <Link href="/dashboard">
              <img src={logo.src} alt="image" width="80" />
            </Link>
          </div>
        </MainSearchContext>
        <BeatPopup
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
            document.body.classList.remove("overflow-hidden");
          }}
        />
      </div>
      <div
        className={`${hideSearchBox ? "hidden" : "flex"} relative md:justify-center justify-between w-full md:w-auto md:gap-y-0 gap-y-2 pl-0 rounded-[10px] md:bg-white md:flex-row border-2 border-[#002b5b]`}
      >
        <div className="flex justify-between bg-white rounded-[10px]">
          <Link
            href="#"
            ref={testRef}
            onClick={() => setMediaDropDown(!mediaDropDown)}
            className="flex w-full lg:w-[143px] cursor-pointer items-center gap-x-1 px-2 py-2 text-sm text-gray-400"
          >
            {mediaDdValue}
            <span className="ml-auto text-gray-400 material-icons-outlined">
              arrow_drop_down
            </span>
          </Link>
        </div>

        <div className="md:flex md:relative items-stretch border-l-2 border-[#002b5b]">
          <div className="flex h-full justify-between bg-white rounded-[10px]">
            <div className="flex items-center">
              <span className="pl-2 text-sm text-[#002b5b] material-icons-outlined">
                search
              </span>
              <input
                type="search"
                className="p-2 px-3 text-sm text-gray-600 w-full xl:w-[280px] focus:outline-none"
                placeholder="Search"
                // disabled={
                //   currentPath === "/media-types" ||
                //   currentPath === "/dashboard" ||
                //   currentPath === "/skribe365" ||
                //   currentPath === "/favorites" ||
                //   currentPath === `/mediaTypeOutlet/${id}/${name}` ||
                //   currentPath === `/journalistProfile/${id}` ||
                //   (currentPath ===
                //     `/journalistByOutlet/${outletId}/${id}/${encodeURIComponent(
                //       name
                //     )}` &&
                //     true)
                // }
                value={journalistSearch}
                onChange={(e) => storeValue(e)}
              />
              {showSuggetion && (
                <div
                  ref={geoSuggest}
                  className="w-full flex flex-col absolute left-0 top-[41px] shadow-xl bg-white max-h-36 overflow-scroll overflow-x-hidden rounded-bl-lg rounded-rb-lg rounded-tr-lg"
                >
                  <ul className="w-full">
                    {citySuggestion ? (
                      citySuggestion?.length > 0 ? (
                        citySuggestion?.map((curItem) => {
                          if (
                            curItem.isRegional &&
                            roleType?.includes("Freebies")
                          ) {
                            return (
                              <li>
                                <Link
                                  href="#"
                                  onClick={() => {
                                    setShowSuggetion(false);
                                    setJournalistSearch("");
                                  }}
                                  className="cursor-pointer flex items-center p-1 text-sm
                                    text-gray-500 gap-x-2 hover:bg-gray-200
                                    hover:text-gray-700"
                                >
                                  {!!mediaDdValue &&
                                  mediaDdValue !== "Outlet" ? (
                                    <span className="pl-1 text-lg text-gray-400 material-icons-outlined">
                                      location_city
                                    </span>
                                  ) : (
                                    <span className="pl-1 text-lg text-gray-400 material-icons-outlined">
                                      newspaper
                                    </span>
                                  )}
                                  <span className="flex-12">
                                    {curItem.value.slice(0, 1).toUpperCase()}
                                    {curItem.value.slice(1).toLowerCase()}
                                  </span>
                                  <span className="text-gray-500">
                                    <HeaderLock
                                      left="-right-[10px]"
                                      top="top-[5px]"
                                      leftPosition="-left-[0px]"
                                      topPosititon="top-[38px]"
                                      title="Feature Locked!"
                                    />
                                  </span>
                                </Link>
                              </li>
                            );
                          } else if (curItem.isRegional) {
                            return (
                              <li>
                                <Link
                                  href="/regional"
                                  onClick={() => {
                                    setShowSuggetion(false);
                                    setJournalistSearch("");
                                  }}
                                  className="cursor-pointer flex items-center p-1 text-sm
                                    text-gray-500 gap-x-2 hover:bg-gray-200
                                    hover:text-gray-700"
                                >
                                  {!!mediaDdValue &&
                                  mediaDdValue !== "Outlet" ? (
                                    <span className="pl-1 text-lg text-gray-400 material-icons-outlined">
                                      location_city
                                    </span>
                                  ) : (
                                    <span className="pl-1 text-lg text-gray-400 material-icons-outlined">
                                      newspaper
                                    </span>
                                  )}
                                  <span className="flex-12">
                                    {curItem.value.slice(0, 1).toUpperCase()}
                                    {curItem.value.slice(1).toLowerCase()}
                                    <span className="text-[10px] ml-2 text-blue-600 border border-blue-600 px-1">
                                      Explore Regional
                                    </span>
                                  </span>
                                </Link>
                              </li>
                            );
                          } else {
                            return (
                              <li>
                                <span
                                  onClick={() =>
                                    changeUrl(
                                      curItem.value,
                                      curItem.id,
                                      curItem.meditId
                                    )
                                  }
                                  className="cursor-pointer flex items-center p-1 text-sm
                                    text-gray-500 gap-x-2 hover:bg-gray-200
                                    hover:text-gray-700"
                                >
                                  {!!mediaDdValue &&
                                  mediaDdValue !== "Outlet" ? (
                                    <span className="pl-1 text-lg text-gray-400 material-icons-outlined">
                                      location_city
                                    </span>
                                  ) : (
                                    <span className="pl-1 text-lg text-gray-400 material-icons-outlined">
                                      newspaper
                                    </span>
                                  )}
                                  <span className="flex-12">
                                    {curItem.value.slice(0, 1).toUpperCase()}
                                    {curItem.value.slice(1).toLowerCase()}
                                  </span>
                                </span>
                              </li>
                            );
                          }
                        })
                      ) : loading ? (
                        <li className="flex p-1 text-sm text-gray-500">
                          Loading...
                        </li>
                      ) : (
                        <li className="flex p-1 text-sm text-gray-500">
                          No Record Found
                        </li>
                      )
                    ) : (
                      <li className="flex p-1 text-sm text-gray-500">
                        No Record Found
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
            <input
              type="button"
              value="Search"
              className={`${
                mediaDdValue === "Outlet" || mediaDdValue === "City"
                  ? "bg-gray-300"
                  : "bg-[#FAC540] cursor-pointer"
              } px-3 py-2 font-medium text-xs text-[#002B5B] rounded-[7px] rounded-l-[0px] focus:outline-none`}
              onClick={() => searchFun()}
              disabled={mediaDdValue === "Outlet" || mediaDdValue === "City"}
            />
          </div>
        </div>
        {mediaDropDown && (
          <div
            ref={mediaRef}
            className="absolute left-0 top-[41px] z-[200] flex  w-[160px]  rounded-lg bg-gray-100 text-sm shadow-md"
          >
            <ul className="flex flex-col flex-grow">
              <li>
                <Link
                  href="/media-types"
                  name="MediaTypes"
                  className="flex p-2 rounded-lg hover:bg-gray-200"
                  onClick={(e) => getMediaValue(e.target.name)}
                >
                  Media Types
                </Link>
              </li>

              <li>
                <Link
                  className="flex p-2 hover:bg-gray-200"
                  href="/journalist-search"
                  name="All Journalists"
                  onClick={(e) => getMediaValue(e.target.name)}
                >
                  Journalists
                </Link>
              </li>
              <li>
                <Link
                  className="flex p-2 hover:rounded-lg hover:bg-gray-200"
                  name="Outlet"
                  href="#"
                  onClick={(e) => {
                    getMediaValue(e.target.name);
                  }}
                >
                  Outlet
                </Link>
              </li>
              <li>
                <Link
                  className="flex p-2 hover:rounded-lg hover:bg-gray-200"
                  name="Beats"
                  href="#"
                  onClick={(e) => {
                    setIsOpen(true);
                    getMediaValue(e.target.name);
                    document.body.classList.add("overflow-hidden");
                  }}
                >
                  Beats
                </Link>
              </li>
              <li>
                <Link
                  name="City"
                  href="#"
                  className="flex p-2 rounded-lg hover:bg-gray-200"
                  onClick={(e) => getMediaValue(e.target.name)}
                >
                  City
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Searchbar;
