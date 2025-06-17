"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
//import useOutletByMediaType from "../utils/useOutletByMediaType";
import { GETOUTLETBYMEDIATYPE } from "../../constants";
//import LeftFilter from "./MediaLeftFilter";
import MediaOutletSearchRecord from "./MediaOutletSearchRecord";
import Spinner from "../../Services/Spinner";
import { useSearchContext } from "../../context/MainSearchContext";
import GetFiltersData from "../Filters/GetFiltersData";
import userService from "../../Services/user.service";
import SelectedFilters from "../SelectedFilters";

const MediaTypeOutlet = ({ outletId, name }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [outletResult, setOutletResult] = useState([]);
  const [result, setResult] = useState([]);
  const [languageFilter, setLanguageFilter] = useState([]);
  const [cityFilter, setCityFilter] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  //const { outlet, isLoading } = useOutletByMediaType(id);

  const [noRecord, setNoRecord] = useState(true);
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

  const [selectedFilters, setSelectedFilters] = useState({ count: 0 });
  let url = `${GETOUTLETBYMEDIATYPE}${outletId}`;

  const getOutletData = (url) => {
    setLoading(true);
    userService
      .get(url)
      .then((result) => {
        if (result?.response?.status === "Ok") {
          setResult(result?.data);
          setOutletResult(result?.data);
          setCityFilter(result?.filters?.city);
          setLanguageFilter(result?.filters?.language);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearch = (val) => {
    //const { value: val } = event.target;

    const filteredOutlet = result?.filter((data) => {
      return data?.value?.toLowerCase().includes(val?.toLowerCase());
    });
    setOutletResult(filteredOutlet);
    if (filteredOutlet.length > 0) {
      setNoRecord(false);
    } else {
      setNoRecord(true);
    }
  };

  const clearButton = () => {
    setSearchInput("");
    setOutletResult(outletResult);
  };

  useEffect(() => {
    if (searchInput.length > 0) handleSearch(searchInput);
  }, [searchInput]);

  const goBack = () => {
    router.back();
  };

  //FOR URL BUILDER WHENEVER SELECT THE LEFT FILTER START
  const urlBuilder = (token = null) => {
    let urlBuilders = url;

    for (let allKeys in selectedFilters) {
      if (selectedFilters[allKeys].length > 0) {
        // let output = selectedFilters[allKeys].map((curItem) => curItem);

        let output = selectedFilters[allKeys].map((curItem) => {
          const match = curItem.match(/\d+/);
          return match ? parseInt(match[0], 10) : null;
        });

        if (selectedFilters[allKeys].length > 0 && allKeys === "Media") {
          urlBuilders = `${urlBuilders}&MediaFilter=${output}`;
        } else if (selectedFilters[allKeys]?.length > 0 && allKeys === "City")
          urlBuilders = `${urlBuilders}&CityFilter=${output}`;
        else if (selectedFilters[allKeys]?.length > 0 && allKeys === "Language")
          urlBuilders = `${urlBuilders}&LanguageFilter=${output}`;
        else if (token) urlBuilders = `${urlBuilders}&${token}`;
      }
      if (selectedFilters[allKeys].length > 0) {
        url = urlBuilders + "&IsFilter=false";
      } else {
        url = urlBuilders + "&IsFilter=true";
      }
    }
  };

  useEffect(() => {
    urlBuilder();
    setOutletResult([]);
    getOutletData(url);
  }, [selectedFilters]);

  useEffect(() => {
    if (loading) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [loading]);

  return (
    <div>
      <SelectedFilters
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      <div className="section w-11/12 p-6 py-6 pl-8 pr-0">
        <section className="flex gap-x-8">
          <aside className="mt-[27px] flex w-4/12 flex-col gap-6 md:flex md:w-7/12 lg:w-1/3">
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
              <h3 className="p-3 text-gray-900 uppercase text-md">Filters</h3>
              <div className="w-full p-3">
                <GetFiltersData
                  type="Language"
                  trackingId={trackingId}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  geoData={languageFilter}
                  // url="LanguageMedia"
                />
                <GetFiltersData
                  type="City"
                  trackingId={trackingId}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  geoData={cityFilter}
                  // url="geoMedia"
                />

                {/* <GetFiltersData
                  trackingId={trackingId}
                  type="Language"
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  url={`GetLanguageFilter`}
                /> */}
                {/* <GetFiltersData
                  trackingId={trackingId}
                  type="City"
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  url={`GetCityFilter`}
                /> */}
              </div>
            </fieldset>
          </aside>
          <article className="mt-[12px] flex w-full flex-col flex-wrap gap-6 self-start">
            <div className="flex justify-between">
              <ul className="flex items-center gap-x-1 text-xs text-gray-400">
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
                      </span>
                    </li>{" "}
                  </>
                )}

                {outletId === "6" && (
                  <>
                    <li className="flex items-center">
                      <Link
                        href={`/mediaTypeOutlet/6/Online`}
                        className="hover:text-gray-700"
                      >
                        Online
                      </Link>
                      <span className="material-icons-outlined b-font text-gray-400">
                        navigate_next
                      </span>{" "}
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
                    <li className="flex items-center">
                      Wire Services
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

                {outletId === "22" && (
                  <>
                    <li className="flex items-center">
                      Freelancer
                      <span className="material-icons-outlined b-font text-gray-400">
                        navigate_next
                      </span>
                    </li>
                  </>
                )}
                <li className="flex items-center">
                  Results {outletResult?.length}
                </li>
              </ul>

              <div className="flex items-center rounded-lg border border-gray-300 bg-white  pl-2">
                <span className="material-icons-outlined text-sm text-gray-300">
                  search
                </span>
                <input
                  type="text"
                  className="text-sm w-full rounded-lg bg-white px-3 py-1 text-gray-400 focus:outline-none"
                  placeholder="Search By Name"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e?.target?.value)}
                  onKeyUp={(e) => handleSearch(e.target.value)}
                />
                {searchInput?.length > 0 && (
                  <span
                    onClick={clearButton}
                    className="material-icons-outlined icon-14 cursor-pointer pr-2 text-xs uppercase text-gray-700 hover:text-gray-900 hover:underline hover:no-underline"
                  >
                    close
                  </span>
                )}
              </div>
            </div>
            <div className="flex w-full flex-wrap  self-start [&>*:last-child]:flex-none [&>*:nth-child(n-2)]:flex-none">
              {/* {noRecord && !loading && "No Record Found"} */}
              {outletResult
                ? outletResult?.length > 0
                  ? outletResult.map((curItem) => (
                      <MediaOutletSearchRecord
                        key={curItem.id}
                        data={curItem}
                        outletId={outletId}
                      />
                    ))
                  : loading
                    ? "Loading..."
                    : "No Record Found"
                : "No Record Found"}
            </div>

            {/*{!noMore && (  <div className="mt-2 flex justify-center">
            <button
              className="whitespace-nowrap rounded-[5px] border border-gray-400 px-4  py-1 text-gray-400  hover:border-gray-800 hover:text-gray-800"
              type="button"
              onClick={loadMore}
            >
              {loadingMore ? "Loading more..." : "Load more"}
            </button>
          </div>)} */}

            {/* <div>{!shimmer && "Loading..."}</div> */}
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
      </div>
    </div>
  );
};

export default MediaTypeOutlet;
