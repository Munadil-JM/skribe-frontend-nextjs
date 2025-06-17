"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PressReleaseEmail } from "../../constants";
import userService from "../../Services/user.service";

const NonDisclaimer = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const goBack = () => {
    localStorage.removeItem("pressRelease");
    router.back();
  };

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

  const handleRequestQuote = async () => {
    // Get data from localStorage
    const pressReleaseData = localStorage.getItem("pressRelease");

    if (pressReleaseData) {
      try {
        const parsedData = JSON.parse(pressReleaseData);
        const apiPayload = {
          type: parsedData.type || "Without Disclaimer",
          packagesData: parsedData.packagesData || [],
          addOns: parsedData.addOns || [],
        };

        console.log("API Payload:", apiPayload);

        // Call the API
        const apiSuccess = await callPressReleaseEmailAPI(apiPayload);

        if (apiSuccess) {
          setShowPopup(true);

          // Navigate to dashboard after 5 seconds, independent of popup
          setTimeout(() => {
            localStorage.removeItem("pressRelease");
            router.push("/press-release");
          }, 5000);
        } else {
          console.log("Failed to send email");
        }
      } catch (parseError) {
        console.log("Error parsing localStorage data:", parseError);
      }
    } else {
      console.log("No pressRelease data found in localStorage");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-4 md:p-6 lg:p-8 bg-white">
      {/* Back Button */}
      <span
        onClick={goBack}
        className="mb-4 flex cursor-pointer items-center gap-x-1 self-start py-2 text-sm font-normal text-gray-500 hover:border-gray-400 hover:text-gray-800 w-fit"
      >
        <span className="material-icons-outlined icon-16">
          arrow_back_ios_new
        </span>
        Go Back
      </span>

      {/* Header Section */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Want to Appear in Top Media Without a Disclaimer?
        </h1>
        <p className="text-[#00000080] text-sm md:text-md mb-4 md:mb-6">
          Get featured editorially across 170+ leading publications without
          sponsored tags. Perfect for brand stories, founder interviews, trend
          insights, and more.
        </p>

        <div className="mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
            What Is Non-Disclaimer Distribution?
          </h2>

          <p className="text-xs md:text-sm font-semibold text-[#00000080] mb-1">
            Key Benefits:
          </p>
          <ul className="text-xs md:text-sm text-[#00000080] mb-3 md:mb-4">
            <li className="flex items-start mb-1">
              <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Editorial-style coverage without "sponsored" or "disclaimer"
              labels
            </li>
            <li className="flex items-start mb-1">
              <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Offers brand credibility in organic content format
            </li>
            <li className="flex items-start mb-1">
              <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Distributed through Skribe's media partners and journalist network
            </li>
            <li className="flex items-start">
              <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Amplifies reach to premium audiences (CEO/Investor/Follow
              partners)
            </li>
          </ul>

          <p className="text-sm  md:text-[16px] font-medium text-[#000000]">
            No tags, no disclaimers—just real journalism.
          </p>
        </div>
      </div>

      {/* Section A: Guaranteed Coverage */}
      <div className="mb-6 md:mb-8">
        <h3 className="text-lg md:text-xl font-bold text-[#000000] mb-2 md:mb-3">
          A. Guaranteed Coverage
        </h3>
        <p className="text-xs md:text-sm text-[#00000080] mb-3 md:mb-4">
          Includes editorial placements where visibility is pre-confirmed via
          partnerships or editorial agreements
        </p>

        <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-3 md:mb-4">
          <img
            src="/assets/Upturn.svg"
            alt="Upturn"
            className="w-[120px] md:w-[140px] h-[40px] md:h-[50px]"
          />
          <img
            src="/assets/Latestly.svg"
            alt="Latest.ly"
            className="w-[130px] md:w-[150px] h-[40px] md:h-[50px]"
          />
          <img
            src="/assets/HansIndia.svg"
            alt="The Hans India"
            className="w-[70px] md:w-[90px] h-[40px] md:h-[50px]"
          />
          <img
            src="/assets/APN.svg"
            alt="APN News"
            className="w-[200px] md:w-[240px] h-[40px] md:h-[50px]"
          />
          <img
            src="/assets/DNA.svg"
            alt="DNA"
            className="w-[80px] md:w-[100px] h-[40px] md:h-[50px]"
          />
        </div>

        <p className="text-sm md:text-[16px] text-[#000000]">
          Note: Full list shared upon quote request, tailored by industry and
          campaign.
        </p>
      </div>

      {/* Section B: Non-Guaranteed Editorial Partners */}
      <div className="mb-6 md:mb-8">
        <h3 className="text-lg md:text-xl font-bold text-[#000000] mb-2 md:mb-3">
          B. Non-Guaranteed Editorial Partners
        </h3>
        <p className="text-xs md:text-sm text-[#00000080] mb-3 md:mb-4">
          Editorial publications we regularly work with, coverage based on
          relevance and merit.
        </p>

        <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-3 md:mb-4">
          <img
            src="/assets/Times.svg"
            alt="The Times"
            className="w-[75px] md:w-[95px] h-[40px] md:h-[50px]"
          />
          <img
            src="/assets/BT.svg"
            alt="BT"
            className="w-[50px] md:w-[60px] h-[40px] md:h-[50px]"
          />
          <img
            src="/assets/IndiaTV.svg"
            alt="India TV"
            className="w-[130px] md:w-[150px] h-[40px] md:h-[50px]"
          />
          <img
            src="/assets/ThePioneer.svg"
            alt="The Pioneer"
            className="w-[160px] md:w-[190px] h-[40px] md:h-[50px]"
          />
          <img
            src="/assets/TheHindu.svg"
            alt="The Hindu"
            className="w-[90px] md:w-[110px] h-[40px] md:h-[50px]"
          />
          <img
            src="/assets/TheStatesman.svg"
            alt="The Statesman"
            className="w-[210px] md:w-[250px] h-[40px] md:h-[50px]"
          />
        </div>

        <p className="text-sm md:text-[16px] text-[#000000]">
          Note: Full list shared upon quote request, tailored by industry and
          campaign.
        </p>
      </div>

      {/* Section C: Regional & Do-Follow Publications */}
      <div className="mb-6 md:mb-8">
        <h3 className="text-lg md:text-xl font-bold text-[#000000] mb-2 md:mb-3">
          C. Regional & Do-Follow Publications
        </h3>
        <p className="text-xs md:text-sm text-[#00000080] mb-3 md:mb-4">
          We also partner with our 150 regional and state publications for
          widespread city-level and SEO-friendly distribution.
        </p>

        <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-3 md:mb-4">
          <img
            src="/assets/News18.svg"
            alt="News18"
            className="w-[75px] md:w-[95px] h-[40px] md:h-[50px]"
          />
          <img
            src="/assets/Lokmat.svg"
            alt="Lokmat"
            className="w-[100px] md:w-[120px] h-[40px] md:h-[50px]"
          />
          <img
            src="/assets/Bangla.svg"
            alt="Bangla"
            className="w-[90px] md:w-[110px] h-[40px] md:h-[50px]"
          />
          <img
            src="/assets/Jugaad.svg"
            alt="Jugaad"
            className="w-[75px] md:w-[95px] h-[40px] md:h-[50px]"
          />
          <img
            src="/assets/MotorODs.svg"
            alt="MotorODs"
            className="w-[220px] md:w-[270px] h-[40px] md:h-[50px]"
          />
          <img
            src="/assets/StartupInsider.svg"
            alt="Startup Insider"
            className="w-[100px] md:w-[120px] h-[40px] md:h-[50px]"
          />
        </div>

        <p className="text-sm md:text-md text-[#000000]">
          Note: Full list shared upon quote request, tailored by industry and
          campaign.
        </p>
      </div>

      {/* Why Choose Skribe Section */}
      <div className="mb-8 md:mb-12">
        <h3 className="text-lg md:text-xl font-bold text-[#000000] mb-2 md:mb-3">
          Why Choose Skribe for Editorial PR?
        </h3>

        <ul className="text-xs md:text-sm text-[#00000080]">
          <li className="flex items-start mb-1">
            <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Credibility through editorial voice
          </li>
          <li className="flex items-start mb-1">
            <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            No sponsorship or advertorial tags
          </li>
          <li className="flex items-start mb-1">
            <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Higher trust from media and readers
          </li>
          <li className="flex items-start mb-1">
            <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            SEO-indexed, long-term visibility
          </li>
          <li className="flex items-start">
            <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Trusted by PR firms, start-ups, and large enterprises
          </li>
        </ul>
      </div>

      {/* Bottom Section */}
      <div className="text-center ">
        <p className="text-xs md:text-sm text-[#00000080]  mb-4">
          Prepaid Payment Terms
        </p>

        <button
          onClick={handleRequestQuote}
          disabled={loading}
          className={`w-full ${loading ? "bg-gray-400" : "bg-[#01438D] hover:bg-[#01438D]/90"} text-white py-3 px-6 rounded-[16px] text-sm font-medium transition-colors`}
        >
          {loading ? "Processing..." : "Request a Quote"}
        </button>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="bg-white rounded-[20px] p-5 md:p-8 max-w-md w-full mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center mb-4 md:mb-4">
              <img
                src="/assets/greentick.svg"
                alt="check"
                className="w-[80px] md:w-[100px] h-[80px] md:h-[100px]"
              />
            </div>

            <div className="text-center">
              <p className="text-gray-800 text-sm md:text-md leading-relaxed mb-4">
                We have received a request and
                <br />
                we will connect with you shortly
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NonDisclaimer;
