"use client";

import React from "react";
import { useRouter } from "next/navigation";

const BrandStory = () => {
  const router = useRouter();

  const goBack = () => {
    localStorage.removeItem("pressRelease");
    router.back();
  };

  const handleExploreClick = (distributionType) => {
    const pressReleaseData = {
      type:
        distributionType === "transparent"
          ? "With Disclaimer"
          : "Without Disclaimer",
      packagesData: [],
      addOns: [],
    };

    // Store in localStorage with unified structure
    localStorage.setItem("pressRelease", JSON.stringify(pressReleaseData));

    if (distributionType === "transparent") {
      router.push("/press-release/disclaimer");
    } else {
      router.push("/press-release/non-disclaimer");
    }
  };

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

      <div className="mb-6 sm:mb-8">
        <h1 className="text-lg font-bold text-gray-900 mb-1">
          Find the Right Fit for Your Brand's Story
        </h1>
        <p className="text-[#00000080] text-[14px] md:text-md">
          Whether you want broad organic editorial reach or a transparent
          disclaimer-based release, Skribe lets you align your distribution
          strategy with your brand goals and audience.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 max-w-[1200px]">
        <div className="bg-[#FAC5401A] rounded-[20px] border border-[#FAC540] p-4 sm:p-6 flex flex-col min-h-[500px] lg:min-h-[530px]">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-[16px] md:text-md font-bold text-gray-900">
              Transparent Distribution{" "}
              <span className="text-gray-600 text-sm font-normal">
                (With Disclaimer)
              </span>
            </h2>
            <p className="text-[#00000080] text-[12px]">
              Choose full transparency with clearly labeled paid placements.
              Ideal for regulatory-focused sectors or brands that value open
              disclosure.
            </p>
          </div>

          <div className="space-y-3 mb-6 sm:mb-8 flex-grow">
            <div className="flex items-center bg-[#318FFF] text-white px-3 sm:px-4 py-2 rounded-md">
              <span className="text-sm font-medium">
                100+ guaranteed online postings
              </span>
              <div className="ml-auto w-5 h-5 flex items-center justify-center flex-shrink-0">
                <img
                  src="/assets/whitetick.svg"
                  alt="check"
                  className="w-4 h-4"
                />
              </div>
            </div>

            <div className="flex items-center text-[#01438D] px-3 sm:px-4 py-2 rounded-md">
              <span className="text-sm font-medium">
                Published Across a vast wire network
              </span>
              <div className="ml-auto w-5 h-5 flex items-center justify-center flex-shrink-0">
                <img
                  src="/assets/bluetick.svg"
                  alt="check"
                  className="w-4 h-4"
                />
              </div>
            </div>

            <div className="flex items-center bg-[#318FFF] text-white px-3 sm:px-4 py-2 rounded-md">
              <span className="text-sm font-medium">
                Indexed by major search engines
              </span>
              <div className="ml-auto w-5 h-5 flex items-center justify-center flex-shrink-0">
                <img
                  src="/assets/whitetick.svg"
                  alt="check"
                  className="w-4 h-4"
                />
              </div>
            </div>

            <div className="flex items-center text-[#01438D] px-3 sm:px-4 py-2 rounded-md">
              <span className="text-sm font-medium">
                Ideal for compliance heavy industries
              </span>
              <div className="ml-auto w-5 h-5 flex items-center justify-center flex-shrink-0">
                <img
                  src="/assets/bluetick.svg"
                  alt="check"
                  className="w-4 h-4"
                />
              </div>
            </div>
          </div>

          <button
            onClick={() => handleExploreClick("transparent")}
            className="w-full bg-[#01438D] text-white py-3 px-6 cursor-pointer rounded-md mt-auto text-sm"
          >
            Explore
          </button>
        </div>

        <div className="bg-[#FAC5401A] rounded-[20px] border border-[#FAC540] p-4 sm:p-6 flex flex-col min-h-[500px] lg:min-h-[556px]">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-[16px] md:text-md font-bold text-gray-900 mb-1">
              Organic Look Distribution{" "}
              <span className="text-gray-600 font-normal text-sm">
                (Without Disclaimer)
              </span>
            </h2>
            <p className="text-[#00000080] text-[12px]">
              Get your story placed seamlessly within top-tier media outlets -
              without any "sponsored" labels. Perfect for premium brand
              perception.
            </p>
          </div>

          <div className="space-y-3 mb-6 sm:mb-8 flex-grow">
            <div className="flex items-center bg-[#318FFF] text-white px-3 sm:px-4 py-2 rounded-md">
              <span className="text-sm font-medium">
                Handpicked top publications
              </span>
              <div className="ml-auto w-5 h-5 flex items-center justify-center flex-shrink-0">
                <img
                  src="/assets/whitetick.svg"
                  alt="check"
                  className="w-4 h-4"
                />
              </div>
            </div>

            <div className="flex items-center text-[#01438D] px-3 sm:px-4 py-2 rounded-md">
              <span className="text-sm font-medium">
                Native Editorial Style Placement
              </span>
              <div className="ml-auto w-5 h-5 flex items-center justify-center flex-shrink-0">
                <img
                  src="/assets/bluetick.svg"
                  alt="check"
                  className="w-4 h-4"
                />
              </div>
            </div>

            <div className="flex items-center bg-[#318FFF] text-white px-3 sm:px-4 py-2 rounded-md">
              <span className="text-sm font-medium">
                No Disclosure or Sponsor Tag
              </span>
              <div className="ml-auto w-5 h-5 flex items-center justify-center flex-shrink-0">
                <img
                  src="/assets/whitetick.svg"
                  alt="check"
                  className="w-4 h-4"
                />
              </div>
            </div>

            <div className="flex items-center text-[#01438D] px-3 sm:px-4 py-2 rounded-md">
              <span className="text-sm font-medium">
                Boost Trust and Authenticity
              </span>
              <div className="ml-auto w-5 h-5 flex items-center justify-center flex-shrink-0">
                <img
                  src="/assets/bluetick.svg"
                  alt="check"
                  className="w-4 h-4"
                />
              </div>
            </div>
          </div>

          <button
            onClick={() => handleExploreClick("organic")}
            className="w-full bg-[#01438D] text-white cursor-pointer py-3 px-6 rounded-md mt-auto text-sm"
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandStory;
