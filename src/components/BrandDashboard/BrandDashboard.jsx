"use client";

import { useEffect, useState } from "react";
import ChartStats from "./ChartStats";
import TopJournalist from "./TopJournalist";
import { BRANDTRACKER } from "../../constants";
// import Articles from "./Brands";
import Brands from "./Brands";
import SpokesPerson from "./SpokesPerson";
import SetBrandPopup from "./BrandKeywords/SetBrandPopup";
import userService from "../../Services/user.service";
import dummy_brand from "../assets/dummy_brand.jpg";
import { useNotification } from "../ErrorAlert/ErrorContextNotification";

const BrandDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateRange, setDateRange] = useState("last6Month");
  const [dateStatus, setDateStatus] = useState(true);
  const [isSpokespersonVisible, setIsSpokespersonVisible] = useState(true);
  const [render, setRender] = useState(false);

  // BRAND POPUP DATA
  const [brand, setBrand] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [competitor, setCompetitor] = useState([]);
  const [spokePerson, setSpokesPerson] = useState([]);
  const [message, setMessage] = useState({ type: "", message: "" });
  const { showNotification } = useNotification();
  // const success = (msg, type) => showNotification(msg, type);
  const warning = (msg, type) => showNotification(msg, type);
  // const error = (msg, type) => showNotification(msg, type);

  const GetBrandData = async () => {
    try {
      setIsLoading(true);
      const [res1] = await Promise.all([userService.get(BRANDTRACKER)]);
      if (res1?.response?.status === "Ok") {
        setBrand(res1?.result?.brands);
        setCompetitor(res1?.result?.competitor);
        setSpokesPerson(res1?.result?.spokePerson);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetBrandData();

    // Set default date range and calculate the dates
    const calculatedEndDate = new Date().toISOString().split("T")[0];
    setEndDate(calculatedEndDate);

    let calculatedStartDate = "";
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    calculatedStartDate = yesterday.toISOString().split("T")[0];

    setStartDate(calculatedStartDate); // Set the start date for past 24 hours

    // Update date range to last1Month
    setDateRange("last6Month");
  }, []);

  const handleDateRangeChange = (e) => {
    const range = e.target.value;
    setDateRange(range);
    let calculatedStartDate = "";
    let calculatedEndDate = new Date().toISOString().split("T")[0];
    setEndDate(calculatedEndDate);

    switch (range) {
      case "past24Hours":
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        calculatedStartDate = yesterday.toISOString().split("T")[0];
        setDateStatus(true);
        break;
      case "last3Days":
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
        calculatedStartDate = threeDaysAgo.toISOString().split("T")[0];
        setDateStatus(true);
        break;
      case "last1Week":
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        calculatedStartDate = oneWeekAgo.toISOString().split("T")[0];
        setDateStatus(true);
        break;
      case "last1Month":
        calculatedStartDate = new Date(Date.now() - 30 * 86400000)
          .toISOString()
          .split("T")[0];
        setDateStatus(true);
        break;
      case "last6Month":
        let today = new Date();
        let startDate = new Date(today); // Start with the current date
        startDate.setMonth(today.getMonth() - 6);
        calculatedStartDate = startDate.toISOString().split("T")[0];
        setDateStatus(true);
        break;
      case "customDateRange":
        setDateStatus(false);
        setEndDate("");
        break;
      default:
        setStartDate("");
        setDateStatus(true);
        return;
    }
    setStartDate(calculatedStartDate);
  };

  useEffect(() => {
    // Set the start and end date for "past24Hours"
    handleDateRangeChange({ target: { value: "last6Month" } });
  }, []);

  // Timer to clear the message after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  const closePopup = () => {
    if (spokePerson?.length === 0) {
      let text =
        "Please complete your configuration to add Competitors and Spokesperson";
      let confirm = warning(text, "warning");
      if (!confirm) {
        return;
      }
    } else {
      setIsOpen(false);
      setRender(!render);
      document.body.classList.remove("overflow-hidden");
    }
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    // Check if the selected end date is before the start date
    if (new Date(newEndDate) < new Date(startDate)) {
      // Optionally, you can show an alert or reset the end date
      warning("End date cannot be earlier than start date.", "warning");
      return;
    }
    setEndDate(newEndDate);
  };

  return (
    <>
      {/* Conditional rendering for when brand length is 0 */}
      {!isLoading && brand?.length === 0 ? (
        <div className="relative px-8 pb-6 xl:w-11/12 w-12/12 xl:pl-8 section">
          <div className="absolute flex flex-col left-1/2 top-1/2 w-4/5 py-10 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-4 shadow-2xl shadow-gray-600 md:w-3/5 lg:w-3/5 xl:w-3/5 z-[50]">
            <h2 className="text-xl text-gray-700 font-bold text-center pb-2">
              Get started with your Brand!
            </h2>
            <p className="text-center text-gray-700 text-sm text-balance mb-4">
              Get ahead of your competition by tracking relevant keywords for
              your brand and competitors. Set your preferences to stay updated
              and gain insights.
            </p>
            <span
              className="bg-gray-600 cursor-pointer text-white rounded-md text-center px-8 mx-10 py-3 text-md"
              onClick={() => {
                setIsOpen(true);
                document.body.classList.add("overflow-hidden");
              }}
            >
              Configure your Brand
            </span>
          </div>
          <img src={dummy_brand.src} alt="" className="blur-md h-full" />
        </div>
      ) : isLoading ? (
        <>
          <div className="absolute left-1/2 top-1/2 w-4/5 -translate-x-1/2 -translate-y-1/2 rounded-lg md:w-3/5 lg:w-3/5 xl:w-2/5 z-[55] text-center">
            Loading...
          </div>

          <img src={dummy_brand.src} alt="" className="blur-md h-full" />
        </>
      ) : (
        // Show the dashboard content only if the brand is configured and data is loaded
        <div className="min-h-screen font-poppins">
          <div className="p-2 xl:w-11/12 w-12/12 xl:px-8 section flex flex-col xl:flex-row items-center justify-between">
            <div className="flex flex-col mt-0 ml-4">
              <ul className="flex items-center text-xs text-gray-400 gap-x-1">
                <li className="flex items-center">
                  Home
                  <span className="items-center text-gray-400 material-icons-outlined b-font">
                    navigate_next
                  </span>
                </li>
                <li className="flex items-center">Brand Dashboard</li>
              </ul>
            </div>

            <div className="flex flex-col justify-end gap-2 text-sm md:flex-row ">
              <span
                className="cursor-pointer border border-[#002b5b] flex items-center px-3 py-1 text-xs text-[#002b5b] rounded-md"
                onClick={() => {
                  setIsOpen(true);
                  document.body.classList.add("overflow-hidden");
                }}
              >
                Edit Brand Configuration
              </span>

              <div className="border-[1px] border-black/10 bg-gray-100 rounded-[5px]">
                <select
                  className="p-1 px-2 text-xs border-0 text-gray-500 cursor-pointer rounded-md focus:outline-none"
                  placeholder="Select Date Range"
                  width={{ base: "100%", xl: "200px" }}
                  size={"sm"}
                  onChange={handleDateRangeChange}
                  focusbordercolor="transparent"
                  border={"none"}
                  value={dateRange} // Set the value of the dropdown to the state value
                >
                  <option value="">Select Date Range</option>
                  <option value="past24Hours">Past 24 Hours</option>
                  <option value="last3Days">Last 3 Days</option>
                  <option value="last1Week">Last 1 week</option>
                  <option value="last1Month">Last 1 Month</option>
                  <option value="last6Month">Last 6 Months</option>
                  <option value="customDateRange">Custom Date Range</option>
                </select>
              </div>

              <div className="flex flex-col gap-2 md:flex-row">
                <div className="border-[1px] border-black/10 bg-gray-100 rounded-[5px]">
                  <input
                    className="text-black/50 xl:w-[120px] w-full p-1 rounded-md focus:outline-none"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="Start Date"
                    variant="filled"
                    sx={{
                      bg: "rgba(51, 51, 51, 0.1)",
                    }}
                    size={"sm"}
                    disabled={dateStatus}
                    focusbordercolor="transparent"
                    border={"none"}
                    id="startDateInput"
                  />
                </div>
                <div className="border-[1px] border-black/10 bg-gray-100 rounded-[5px]">
                  <input
                    className="text-black/50 xl:w-[120px] w-full p-1 rounded-md  focus:outline-none"
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange} // Update this line to call the handler
                    placeholder="End Date"
                    variant="filled"
                    sx={{
                      bg: "rgba(51, 51, 51, 0.1)",
                    }}
                    size={"sm"}
                    disabled={dateStatus}
                    focusbordercolor="transparent"
                    border={"none"}
                    id="endDateInput"
                  />
                </div>
              </div>
            </div>
          </div>
          <hr className="mb-4 text-black/10" />
          <div className="px-2 xl:px-8 pb-6 xl:w-11/12 w-12/12 xl:pl-8 section">
            <div className="flex flex-col w-full gap-6 xl:ml-4">
              <ChartStats
                startDate={startDate}
                endDate={endDate}
                render={render}
              />
              <TopJournalist
                startDate={startDate}
                endDate={endDate}
                render={render}
              />
              <p className="font-[500] text-[18px] text-[#333] ">Articles:</p>
              <div className="flex flex-col justify-between gap-4 md:items-center md:flex-row">
                <div>
                  <ul className="flex text-[15px] text-[#666] cursor-pointer gap-x-2">
                    <li>
                      <button
                        onClick={() => setIsSpokespersonVisible(true)}
                        className={`px-2 pb-1 hover:border-b-2 cursor-pointer border-[#000] ${
                          isSpokespersonVisible
                            ? "border-b-2 text-[#000] font-[500]"
                            : ""
                        }`}
                      >
                        Brands
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setIsSpokespersonVisible(false)}
                        className={`px-2 pb-1 hover:border-b-2 cursor-pointer border-[#000] ${
                          !isSpokespersonVisible
                            ? "border-b-2 text-[#000] font-[500]"
                            : ""
                        }`}
                      >
                        Spokesperson
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              {isSpokespersonVisible ? (
                <Brands tab={isSpokespersonVisible} render={render} />
              ) : (
                <SpokesPerson render={render} />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Brand Popup */}
      <SetBrandPopup
        open={isOpen}
        onClose={() => closePopup()}
        brand={brand}
        competitor={competitor}
        spokePerson={spokePerson}
        GetBrandData={GetBrandData}
        message={message}
        setMessage={setMessage}
      />
    </>
  );
};

export default BrandDashboard;
