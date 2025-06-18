"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { RxTriangleDown, RxCross2, RxBox, RxCheckbox } from "react-icons/rx";
import { cityList, regionMetrix, stateList } from "../../../constants";
import userService from "../../../Services/user.service";
import GetTrackingInfo from "../../Filters/GetTrackingInfo";

const stats = [
  {
    id: 1,
    title: "Journalists",
    count: 10000,
  },
  {
    id: 2,
    title: "Cities",
    count: 120,
  },
  {
    id: 3,
    title: "States",
    count: 25,
  },
  {
    id: 4,
    title: "Outlets",
    count: 1200,
  },
  {
    id: 5,
    title: "Languages",
    count: 20,
  },
];

const Regional = () => {
  const router = useRouter();
  const pathname = usePathname();
  const stateRef = useRef(null);
  const cityRef = useRef(null);
  const [state, setState] = useState({
    stateId: "",
    stateName: "State",
  });
  const [selectedCities, setSelectedCities] = useState([]);
  const [isStateDropDownOpen, setIsStateDropDownOpen] = useState(false);
  const [isCityDropDownOpen, setIsCityDropDownOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trackingId, setTrackingId] = useState();

  let userId = JSON.parse(localStorage.getItem("userInfo"));
  const pathvalue = pathname.split("/").filter(Boolean); // removes empty parts
  const urlRead = pathvalue[0]; // first segment

  useEffect(() => {
    setTrackingId(generateUUID());
  }, []);
  let isFreebieAccount;
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    isFreebieAccount = userInfo?.role?.includes("Freebies");

    if (isFreebieAccount) {
      router.push("/dashboard");
    }
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

  const handleShowMedia = () => {
    localStorage.setItem("cities", JSON.stringify(selectedCities));
    const cities =
      selectedCities?.length > 0 &&
      selectedCities?.map((item) => item.intCityid);

    router.push(`/regional/show-media/${decodeURIComponent(cities)}`);
  };

  useEffect(() => {
    if (selectedCities.length > 0 && state?.stateName.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [selectedCities, state]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (stateRef.current && !stateRef.current.contains(e.target)) {
        setIsStateDropDownOpen(false);
      }

      if (cityRef.current && !cityRef.current.contains(e.target)) {
        setIsCityDropDownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleMouseLeave = () => {
      setIsStateDropDownOpen(false);
      setIsCityDropDownOpen(false);
    };
    const node = cityRef.current;
    const node1 = stateRef.current;
    if (node || node1) {
      node.addEventListener("mouseleave", handleMouseLeave);
      node1.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (node || node1) {
        node.removeEventListener("mouseleave", handleMouseLeave);
        node1.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  useEffect(() => {
    if (cityData.length === selectedCities.length) {
      setIsCityDropDownOpen(false);
    }
  }, [selectedCities]);

  const toggleCity = (item) => {
    // {intCityid: 1664, vchCity: 'LUCKNOW'}
    setSelectedCities((prev) => {
      const exists = prev?.some((type) => type.intCityid === item.intCityid);

      if (exists) {
        return prev.filter((type) => type.intCityid !== item.intCityid);
      } else {
        return [...prev, item];
      }
    });
  };

  const regionalState = async () => {
    setLoading(true);
    try {
      const [response1] = await Promise.all([userService.get(stateList)]);

      if (response1?.response?.status === "Ok") {
        setStateData(response1.data);
      }
    } catch (error) {
      console.log(error, "check error");
    } finally {
      setLoading(false);
    }
  };

  const fetchCities = async () => {
    setLoading(true);
    try {
      const [response1] = await Promise.all([
        userService.get(`${cityList}?StateId=${state.stateId}`),
      ]);

      if (response1?.response?.status === "Ok") {
        setCityData(response1.data);
      }
    } catch (error) {
      console.log(error, "check error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    !isFreebieAccount && regionalState();
  }, []);

  useEffect(() => {
    if (state.stateId > 0) {
      fetchCities(state.stateId);
    }
  }, [state.stateId]);

  return (
    <main className="font-inter h-screen flex flex-col">
      <div className="bg-[#E4EFF7] h-[350px] lg:h-auto flex items-center justify-center">
        <section className="container mx-auto p-5 lg:p-10 flex items-center justify-center gap-16">
          <div className="lg:w-[480px]">
            <h1 className="text-xl font-semibold text-center lg:text-3xl lg:text-start">
              Explore Regional Media by States and Cities
            </h1>

            <div className="flex items-center my-3 justify-center gap-2">
              <div
                ref={stateRef}
                className="w-full relative inline-flex flex-col"
              >
                <div
                  className="relative cursor-pointer flex items-center bg-[#FFFDF6] py-2 pl-5 w-full rounded-lg border border-[#00000033]"
                  aria-label="State"
                  role="button"
                  onClick={() => setIsStateDropDownOpen((p) => !p)}
                >
                  <img
                    src="/assets/regional-location-icon.webp"
                    alt="Location icon"
                    width={15}
                    height={15}
                    className="absolute left-2"
                  />

                  <span className="ml-2">
                    {state.stateName === "State" || state.stateName === ""
                      ? "State"
                      : state.stateName.charAt(0).toUpperCase() +
                        state.stateName.slice(1).toLowerCase()}
                  </span>

                  {state === "" ? (
                    <RxTriangleDown className="ml-auto mr-3" />
                  ) : state?.stateName === "State" ||
                    state?.stateName === "" ? (
                    <RxTriangleDown className="ml-auto mr-3" />
                  ) : (
                    <RxCross2
                      className="ml-auto mr-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        setState({ stateId: 0, stateName: "State" });
                        setCityData([]);
                        setSelectedCities([]);
                        setIsCityDropDownOpen(false);
                      }}
                    />
                  )}
                </div>

                {isStateDropDownOpen && (
                  <div className="absolute top-full -mt-[5px] w-full border border-black/20 rounded-b-lg z-50 max-h-48 overflow-scroll overflow-x-hidden">
                    {stateData?.length > 0 &&
                      stateData?.map((item, i) => {
                        return (
                          <p
                            key={item.intStateid || i}
                            className={`py-1 px-2 last:rounded-b-lg cursor-pointer hover:bg-[#EDEDED] hover:text-black ${state.stateName === item?.vchState ? "text-black bg-[#EDEDED]" : "text-black/40 bg-white"}`}
                            role="button"
                            onClick={() => {
                              GetTrackingInfo(
                                "State Filter",
                                String(item.intStateid),
                                urlRead,
                                userId.id,
                                trackingId
                              );
                              setState({
                                stateId: item.intStateid,
                                stateName: item.vchState,
                              });
                              setIsStateDropDownOpen(false);
                              setSelectedCities([]);
                            }}
                          >
                            {item.vchState.split(" ").length === 2
                              ? item.vchState
                                  .split(" ")
                                  ?.map(
                                    (word) =>
                                      word.charAt(0).toUpperCase() +
                                      word.slice(1).toLowerCase()
                                  )
                                  .join(" ")
                              : item.vchState.charAt(0).toUpperCase() +
                                item.vchState.slice(1).toLowerCase()}
                          </p>
                        );
                      })}
                  </div>
                )}
              </div>

              <div
                ref={cityRef}
                className="w-full relative inline-flex flex-col"
              >
                <div
                  className={`relative flex items-center py-2 pl-5 w-full rounded-lg border border-[#00000033] ${state.stateName === "State" ? "bg-[#E2E2E2] cursor-not-allowed" : "bg-[#FFFDF6] cursor-pointer"}`}
                  aria-label="Select Cities"
                  role="button"
                  onClick={() => {
                    if (state.stateName !== "State") {
                      setIsCityDropDownOpen((p) => !p);
                    }
                  }}
                >
                  <img
                    src="/assets/regional-location-icon.webp"
                    alt="Location icon"
                    width={15}
                    height={15}
                    className="absolute left-2"
                  />
                  <span className="ml-2">City</span>

                  <RxTriangleDown className="ml-auto mr-3" />
                </div>

                {cityData?.length > 0 && isCityDropDownOpen && (
                  <div className="absolute top-full -mt-[5px] w-full flex flex-col gap-y-1 bg-white border border-black/20 z-50 max-h-48 overflow-scroll overflow-x-hidden">
                    {cityData?.length > 0 &&
                      cityData?.map((item, i) => {
                        const isSelected = selectedCities
                          ?.map((items) => items.vchCity)
                          .includes(item.vchCity);

                        return (
                          <div key={i}>
                            <p
                              className={`w-full py-1 px-2 flex items-center justify-between cursor-pointer sm:hover:bg-[#EDEDED] sm:hover:text-black ${isSelected ? "bg-[#EDEDED] text-black" : "bg-white text-black/40"}`}
                              onClick={() => {
                                GetTrackingInfo(
                                  "City Filter",
                                  String(item.intCityid),
                                  urlRead,
                                  userId.id,
                                  trackingId
                                );
                                toggleCity(item);
                              }}
                            >
                              {item.vchCity.charAt(0).toUpperCase() +
                                item.vchCity.slice(1).toLowerCase()}
                              {isSelected ? (
                                <RxCheckbox size={17} />
                              ) : (
                                <RxBox size={15} className="mr-[1px]" />
                              )}
                            </p>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 items-center mb-3">
              {selectedCities?.length > 0 &&
                selectedCities?.map((item, i) => {
                  return (
                    <p
                      className="bg-[#528DC3] rounded-lg text-white px-2 text-sm py-1 flex items-center gap-1"
                      key={i}
                    >
                      <span>
                        {item.vchCity.charAt(0).toUpperCase() +
                          item.vchCity.slice(1).toLowerCase()}
                      </span>

                      <RxCross2
                        className="rounded-full relative -top-[1px] border-2 p-[1px] box-content cursor-pointer"
                        size={10}
                        type="RegionalCity"
                        onClick={() => toggleCity(item)}
                      />
                    </p>
                  );
                })}
            </div>

            <button
              type="button"
              className="cursor-pointer w-full p-2 rounded-lg font-semibold bg-[#002B5B] text-[#FFFFFF] disabled:text-[#888888] disabled:bg-[#B3B3B3] disabled:cursor-not-allowed"
              disabled={isButtonDisabled}
              onClick={handleShowMedia}
            >
              Show Media Landscape
            </button>
          </div>

          <img
            src="/assets/regional-hero.webp"
            alt="Regional Hero - India Map"
            className="lg:w-[300px] xl:w-[350px] hidden lg:block"
          />
        </section>
      </div>

      <div className="bg-[#FFFEF5]">
        <section className="container mx-auto p-5 sm:p-10">
          <h2 className="text-xl lg:text-3xl font-semibold text-center">
            Your Gateway to verified Regional Media Database
          </h2>

          <ul className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-2 lg:gap-4 py-5">
            {stats?.length > 0 &&
              stats.map((stat) => {
                return (
                  <li
                    key={stat.id}
                    className="text-center py-4 px-5 lg:px-6 border border-[#8EB8E0] bg-[#FFFFFE] rounded-md"
                  >
                    <p className="text-[#071F46] font-semibold text-xl sm:text-3xl lg:text-4xl">
                      {stat.count}+
                    </p>

                    <p className="text-[#071F46] text-sm sm:mt-2">
                      {stat.title}
                    </p>
                  </li>
                );
              })}
          </ul>

          <p className="text-center text-[#0E2549] sm:text-xl">
            Trusted by 200+ PR Agencies & Brands across India
          </p>
        </section>
      </div>
    </main>
  );
};

export default Regional;
