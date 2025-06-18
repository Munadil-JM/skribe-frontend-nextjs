"use client";

import { useEffect, useState } from "react";
import userService from "../../../Services/user.service";
import { instaFilter, instagram } from "../../../constants";
import InstaRecords from "./InstaRecords";
// import GetFiltersData from "../../Filters/GetFiltersData";
import InstaFilters from "../InstaFilters";
import Spinner from "../../../Services/Spinner";

const Instagram = () => {
  const [loading, setLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({ count: 0 });
  const [getToken, setGetToken] = useState("");
  const [socialResult, setSocialResult] = useState([null]);
  const [searchInput, setSearchInput] = useState("");
  const [initialLoad, setInitialLoad] = useState(true);
  let url = `${instagram}?pageSize=20`;

  const [filterLoading, setFilterLoading] = useState(false);
  const [filters, setFilters] = useState([]);
  const [followerCount, setFollowerCount] = useState([
    "<20k",
    ">20k>200k",
    ">500k<1M",
    ">1M<10M",
    ">10M",
  ]);
  //[/USE FOR FOLLOWER COUNT FILTER SECTION ONLY END]

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
          v = c == "x" ? r : (r & 0x3) | 0x8;
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
        let output = selectedFilters[allKeys].map((curItem) => curItem);
        if (selectedFilters[allKeys].length > 0 && allKeys === "Categories") {
          urlBuilders = `${urlBuilders}&str_Catg=${output}`;
        } else if (
          selectedFilters[allKeys]?.length > 0 &&
          allKeys === "Follower"
        )
          urlBuilders = `${urlBuilders}&str_folwr=${output}`;
        else if (token) urlBuilders = `${urlBuilders}&${token}`;
      }
      if (searchInput && !urlBuilders.includes("srtxt")) {
        urlBuilders = `${urlBuilders}&srtxt=${searchInput}`;
      }
    }

    url = urlBuilders + "&IsFilter=false";
  };
  const filterApi = async (url) => {
    setFilterLoading(true);
    await userService
      .get(url)
      .then((response) => {
        if (response?.response?.status === "Ok") {
          setFilters(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching filters:", error.response);
      })
      .finally(() => {
        setFilterLoading(false);
      });
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

  useEffect(() => {
    urlBuilder();
    setSocialResult([]);
    getSocialData(url);
  }, [selectedFilters]);

  useEffect(() => {
    filterApi(instaFilter);
  }, []);

  useEffect(() => {
    if (loading) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [loading]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        if (getToken) {
          // urlBuilder += "&token=" + encodeURIComponent(getToken);
          let token = (url += "&token=" + encodeURIComponent(getToken));
          urlBuilder(token);
          getSocialData(url);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [getToken]);

  return (
    <div>
      {" "}
      {/* <div>{getToken}</div> */}
      <section
        className="sticky bottom-1 left-0 top-[64px] z-10 flex gap-x-8 bg-white"
        style={{ borderBottom: "1px solid rgb(209 213 219)" }}
      >
        <div className="section flex w-11/12 gap-x-6">
          <div className="hidden w-4/12 md:flex md:w-7/12 lg:w-1/3"></div>
          <div className="flex w-full flex-col flex-wrap gap-6 self-start">
            {/* <div className="flex flex-wrap items-center justify-end bg-white p-3 pr-0">
              test
            </div> */}
          </div>
        </div>
      </section>
      {Object.keys(selectedFilters)?.length > 0 && (
        <div className="section w-11/12 pr-0 pt-4">
          <div className="flex flex-wrap gap-2 pl-6">
            <div className="flex flex-wrap  items-center rounded-md px-2">
              {Object.keys(selectedFilters).map((key, index) => (
                <div key={index} className="flex items-center text-sm">
                  {key !== "count" && key + ":"}
                  {selectedFilters[key]?.length > 0 &&
                    selectedFilters[key]?.map((curItem, ind) => {
                      return (
                        <div key={ind}>
                          <div className="m-1 flex items-center rounded-md border border-gray-400 px-2">
                            {curItem}
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
      <div className="section w-11/12 p-6 py-6 pl-8 pr-0 pt-0">
        <section className="flex gap-x-8">
          <aside className="mt-3 hidden w-4/12 flex-col gap-6 md:flex md:w-7/12 lg:w-1/3">
            <div className="relative mt-[18px] flex items-center justify-between"></div>

            <fieldset className="w-full self-start rounded-xl border border-gray-300 px-3 ">
              <h3 className="p-3 text-gray-900 uppercase text-md">Filters</h3>
              <div className="w-full p-3">
                <InstaFilters
                  type="Categories"
                  trackingId={trackingId}
                  filterLoading={filterLoading}
                  filters={filters}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                />
                <InstaFilters
                  type="Follower"
                  trackingId={trackingId}
                  filters={followerCount}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                />
              </div>
            </fieldset>
          </aside>
          <article className="mt-3 flex w-full flex-col flex-wrap gap-6 self-start">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <ul className="flex items-center gap-x-1 text-xs text-gray-400">
                  <li className="flex items-center">
                    Social
                    <span className="material-icons-outlined b-font text-gray-400">
                      navigate_next
                    </span>
                  </li>
                  <li className="flex items-center">Instagram</li>
                </ul>
              </div>
              <div className="flex items-center rounded-lg border border-gray-300 bg-white  pl-2">
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
                      <InstaRecords key={ind} data={curItem} />
                    ))
                  : loading
                    ? "Loading..."
                    : "No Record Found"
                : "No Record Found"}
            </div>

            <div className="mt-2 flex justify-center">
              {/* {loadingMore && (
                <p className="whitespace-nowrap px-4  py-1 text-gray-400">
                  Loading journalists...
                </p>
              )} */}
            </div>
          </article>
        </section>

        {/* <div className="opegue-4 absolute inset-0 bg-gray-600">test</div> */}
        {/* {loading && (
          <div>
            <div className="opegue-4 fixed inset-0 z-50  max-h-screen bg-gray-600">
              <div className="lft50 absolute">
                <Spinner status={true} />
              </div>
            </div>
          </div>
        )} */}

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

export default Instagram;
