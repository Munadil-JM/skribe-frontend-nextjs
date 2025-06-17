"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useNotification } from "../ErrorAlert/ErrorContextNotification";
import { PressReleaseEmail } from "../../constants";
import userService from "../../Services/user.service";

const DistributionUpgrades = () => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showNotification } = useNotification();
  const warning = (msg, type) => showNotification(msg, type);

  const websiteOptions = [
    { id: "hindustanTimes", label: "Hindustan Times" },
    { id: "liveMint", label: "Live Mint" },
    { id: "ndtv", label: "NDTV" },
    { id: "htTech", label: "HT Tech" },
    { id: "htAuto", label: "HT Auto" },
    { id: "healthShots", label: "Health Shots" },
    { id: "slurrp", label: "Slurrp" },
    { id: "liveHindustan", label: "Live Hindustan (Hindi)" },
    { id: "businessStandard", label: "Business Standard (only with ANI)" },
  ];

  // Save to localStorage whenever selectedOptions changes
  const saveToLocalStorage = () => {
    try {
      const existingData = JSON.parse(
        localStorage.getItem("pressRelease") || "{}"
      );
      const selectedAddOns = websiteOptions
        .filter((option) => selectedOptions[option.id])
        .map((option) => option.label);

      const updatedPressRelease = {
        ...existingData,
        addOns: selectedAddOns,
      };

      localStorage.setItem("pressRelease", JSON.stringify(updatedPressRelease));
    } catch (error) {
      console.error("Error updating pressRelease data:", error);
    }
  };

  useEffect(() => {
    // Only save if we have some state loaded (not initial empty state)
    const hasAnyOption = Object.keys(selectedOptions).length > 0;
    if (hasAnyOption) {
      saveToLocalStorage();
    }
  }, [selectedOptions]);

  const callPressReleaseEmailAPI = async (pressReleaseData) => {
    setLoading(true);
    try {
      const response = await userService.post(
        PressReleaseEmail,
        pressReleaseData
      );

      if (response?.response?.status === "Ok") {
        console.log("Email sent successfully:", response.response.message);
        return true;
      } else {
        console.log("API call failed:", response);
        return false;
      }
    } catch (error) {
      console.log("Error calling PressReleaseEmail API:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    try {
      const existingData = JSON.parse(
        localStorage.getItem("pressRelease") || "{}"
      );
      const updatedData = {
        ...existingData,
        addOns: [],
        packagesData: [],
      };
      localStorage.setItem("pressRelease", JSON.stringify(updatedData));
    } catch (error) {
      console.error("Error clearing add-ons:", error);
    }
    router.back();
  };

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const pathname = usePathname();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  const handleRequestQuote = async () => {
    // Allow proceeding even without selections since add-ons are optional
    const hasSelectedOptions = Object.values(selectedOptions).some(
      (value) => value === true
    );

    // if (!hasSelectedOptions) {
    //   warning("Please select at least one website option before proceeding", "warning");
    //   return;
    // }

    // Save current selections to localStorage first
    saveToLocalStorage();

    // Get data from localStorage
    const pressReleaseData = localStorage.getItem("pressRelease");

    if (pressReleaseData) {
      try {
        const parsedData = JSON.parse(pressReleaseData);

        // Prepare API payload
        const apiPayload = {
          type: parsedData.type || "With Disclaimer",
          packagesData: parsedData.packagesData || [],
          addOns: parsedData.addOns || [],
        };

        console.log("API Payload:", apiPayload);

        // Call the API
        const apiSuccess = await callPressReleaseEmailAPI(apiPayload);

        if (apiSuccess) {
          setShowPopup(true);

          setTimeout(() => {
            localStorage.removeItem("pressRelease");
            router.push("/press-release");
          }, 5000);
        } else {
          warning("Failed to send email", "error");
          console.log("Failed to send email");
        }
      } catch (parseError) {
        console.log("Error parsing localStorage data:", parseError);
        warning("Error processing request data", "error");
      }
    } else {
      warning("No press release data found", "error");
    }
  };

  const clearSavedData = () => {
    try {
      const existingData = JSON.parse(
        localStorage.getItem("pressRelease") || "{}"
      );
      const updatedData = {
        ...existingData,
        addOns: [],
      };
      localStorage.setItem("pressRelease", JSON.stringify(updatedData));
      setSelectedOptions({});
    } catch (error) {
      console.error("Error clearing add-ons:", error);
    }
  };

  const selectedCount = Object.values(selectedOptions).filter(Boolean).length;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 bg-white">
      <span
        onClick={() => goBack()}
        className="mb-4 flex cursor-pointer items-center gap-x-1 self-start py-2 text-sm font-normal text-gray-500 hover:border-gray-400 hover:text-gray-800 w-fit"
      >
        <span className="material-icons-outlined icon-16">
          arrow_back_ios_new
        </span>
        Go Back
      </span>

      <div className="mb-2 sm:mb-8">
        <h1 className="text-lg font-bold text-gray-900 mb-2">
          Add Confirmed Postings on Top-Tier Websites{" "}
          <span className="text-gray-600 font-normal">(Optional Upgrades)</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {websiteOptions.map((option) => (
          <div key={option.id} className="flex items-center">
            <input
              type="checkbox"
              id={option.id}
              checked={selectedOptions[option.id] || false}
              onChange={() => handleCheckboxChange(option.id)}
              className="w-3 h-3 text-[#01438D] bg-gray-100 border-gray-300 rounded"
            />
            <label
              htmlFor={option.id}
              className={`ml-2 text-sm text-[#000000] cursor-pointer ${loading ? "opacity-50" : ""}`}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>

      <div className="text-right mb-3">
        <span className="text-sm text-[#00000080]">Extra Charges*</span>
      </div>
      <div className="w-full border-t border-gray-300"></div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 mb-8 mt-4">
        <div className="bg-[#FAC5401A] rounded-[20px] border border-[#FAC540] p-4 sm:p-6">
          <h2 className="text-[16px] md:text-md font-bold text-gray-900 mb-4">
            Every Distribution Combo Comes With:
          </h2>

          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gray-800 rounded-full mr-3"></div>
              <span className="text-sm text-gray-900">
                All-India Distribution
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gray-800 rounded-full mr-3"></div>
              <span className="text-sm text-gray-900">
                Confirmed Posting on IANS and UNI
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gray-800 rounded-full mr-3"></div>
              <span className="text-sm text-gray-900">
                Enhanced News Trail Report
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gray-800 rounded-full mr-3"></div>
              <span className="text-sm text-gray-900">Google News Tagging</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gray-800 rounded-full mr-3"></div>
              <span className="text-sm text-gray-900">SEO Optimization</span>
            </div>
          </div>
        </div>

        <div className="bg-[#FAC5401A] rounded-[20px] border border-[#FAC540] p-4 sm:p-6">
          <h2 className="text-[16px] md:text-md font-bold text-gray-900 mb-4">
            Add More Power to Your Release
          </h2>

          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gray-800 rounded-full mr-3"></div>
              <span className="text-sm text-gray-900">
                Complimentary Logo with all Packages
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gray-800 rounded-full mr-3"></div>
              <span className="text-sm text-gray-900">
                Coverage Reports (same day if sent before 1 PM)
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gray-800 rounded-full mr-3"></div>
              <span className="text-sm text-gray-900">
                Additional Images (Available upon request)
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gray-800 rounded-full mr-3"></div>
              <span className="text-sm text-gray-900">
                Video Inclusion (Available upon request)
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gray-800 rounded-full mr-3"></div>
              <span className="text-sm text-gray-900">
                Release Turnaround: Typically under 60 minutes
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <span className="text-sm text-[#00000080]">Prepaid Payment Terms</span>
        {selectedCount > 0 && (
          <button
            onClick={clearSavedData}
            className="text-xs text-gray-500 hover:text-gray-700 underline"
          >
            Clear Selection ({selectedCount})
          </button>
        )}
      </div>

      <button
        onClick={handleRequestQuote}
        disabled={loading}
        className={`w-full py-3 px-6 rounded-[16px] text-sm font-medium transition-colors ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#01438D] text-white hover:bg-[#003366] cursor-pointer"
        }`}
      >
        {loading ? "Processing..." : "Request a Quote"}
      </button>

      {showPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="bg-white rounded-[20px] p-8 max-w-md w-full mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center mb-6">
              <img
                src="/assets/greentick.svg"
                alt="check"
                className="w-[100px] h-[100px]"
              />
            </div>

            <div className="text-center">
              <p className="text-gray-800 text-md leading-relaxed mb-4">
                We have received a request and
                <br />
                we will connect with you shortly
              </p>
              <p className="text-sm text-gray-600">
                {selectedCount > 0
                  ? `${selectedCount} upgrade${selectedCount !== 1 ? "s" : ""} selected`
                  : "No upgrades selected"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DistributionUpgrades;
