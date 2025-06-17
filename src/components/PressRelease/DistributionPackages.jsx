"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "../ErrorAlert/ErrorContextNotification";

const DistributionPackages = () => {
  const [selectedPackages, setSelectedPackages] = useState([]);
  const router = useRouter();
  const { showNotification } = useNotification();
  const warning = (msg, type) => showNotification(msg, type);

  // Top tier packages (above horizontal line)
  const topTierPackages = [
    {
      id: "popular",
      title: "Popular Distribution",
      description:
        "Includes all-India online distribution through Skribe, confirmed posting on IANS and UNI websites, and your choice of ANI Flash or PTI Wire. Minimum guarantee of 80+ online postings.",
      type: "single",
    },
    {
      id: "premium",
      title: "Premium Distribution",
      description:
        "Includes all-India online distribution through Skribe, ANI news flash, PTI wire distribution, and confirmed posting on IANS and UNI websites. Minimum guarantee of 100+ online postings.",
      type: "single",
    },
  ];

  // Standard packages (below horizontal line)
  const standardPackages = [
    {
      id: "starter",
      title: "Starter Reach",
      description:
        "ANI + IANS + 200 websites with Disclaimer and Backlink. Entry-level national visibility",
      details: [
        "ANI + IANS + 200 websites",
        "With Disclaimer and Backlink",
        "Entry-level national visibility",
      ],
      type: "multi",
    },
    {
      id: "government",
      title: "Government Angle",
      description:
        "PTI + IANS + 200 websites with Disclaimer and Backlink. Ideal for policy, governance, CSR-related news",
      details: [
        "PTI + IANS + 200 websites",
        "With Disclaimer and Backlink",
        "Ideal for policy, governance, CSR-related news",
      ],
      type: "multi",
    },
    {
      id: "business",
      title: "Business Boost",
      description:
        "ANI + Business Standard + 200 websites with Disclaimer and Backlink. Amplifies trust for business/finance-related content",
      details: [
        "ANI + Business Standard + 200 websites",
        "With Disclaimer and Backlink",
        "Amplifies trust for business/finance-related content",
      ],
      type: "multi",
    },
    {
      id: "credibility",
      title: "Credibility Pro",
      description:
        "ANI + Live Mint + 200 websites with Disclaimer and Backlink. High-trust coverage for financial & strategic announcements",
      details: [
        "ANI + Live Mint + 200 websites",
        "With Disclaimer and Backlink",
        "High-trust coverage for financial & strategic announcements",
      ],
      type: "multi",
    },
    {
      id: "visibility",
      title: "Visibility Plus",
      description:
        "ANI + Hindustan Times + 200 websites with Disclaimer and Backlink. Perfect for public visibility campaigns",
      details: [
        "ANI + Hindustan Times + 200 websites",
        "With Disclaimer and Backlink",
        "Note: Hindustan Times does not provide indexation",
        "Perfect for public visibility campaigns",
      ],
      type: "multi",
    },
    {
      id: "policy",
      title: "Policy Plus",
      description:
        "PTI + Hindustan Times + 200 websites with Disclaimer and Backlink. Suitable for government and institutional outreach",
      details: [
        "PTI + Hindustan Times + 200 websites",
        "With Disclaimer and Backlink",
        "Note: Hindustan Times does not provide indexation",
        "Suitable for government and institutional outreach",
      ],
      type: "multi",
    },
    {
      id: "editorial",
      title: "Editorial Power Pack",
      description:
        "ANI + PTI + IANS + 200 websites with Disclaimer and Backlink. Balanced editorial distribution across trusted networks",
      details: [
        "ANI + PTI + IANS + 200 websites",
        "With Disclaimer and Backlink",
        "Balanced editorial distribution across trusted networks",
      ],
      type: "multi",
    },
    {
      id: "reputation",
      title: "Reputation Builder Plus",
      description:
        "ANI + PTI + Business Standard + IANS + 200 websites with Disclaimer and Backlink. Comprehensive reach across India's top business and news outlets",
      details: [
        "ANI + PTI + Business Standard + IANS + 200 websites",
        "With Disclaimer and Backlink",
        "Comprehensive reach across India's top business and news outlets",
      ],
      type: "multi",
    },
    {
      id: "ultimate",
      title: "Ultimate Distribution",
      description:
        "All-in-one national exposure with top-tier media including Hindustan Times posting without index",
      details: [
        "With Disclaimer and Backlink",
        "Hindustan Times posting without index",
        "All-in-one national exposure with top-tier media",
      ],
      type: "multi",
    },
  ];

  const allPackages = [...topTierPackages, ...standardPackages];

  // Clear packages data when going back
  const goBack = () => {
    try {
      const existingData = JSON.parse(
        localStorage.getItem("pressRelease") || "{}"
      );
      const updatedData = {
        ...existingData,
        packagesData: [],
        addOns: [],
      };
      localStorage.setItem("pressRelease", JSON.stringify(updatedData));
    } catch (error) {
      console.error("Error clearing packages data:", error);
    }
    router.back();
  };

  const togglePackage = (packageName) => {
    setSelectedPackages((prev) =>
      prev.includes(packageName)
        ? prev.filter((name) => name !== packageName)
        : [...prev, packageName]
    );
  };

  const isSelected = (packageName) => selectedPackages.includes(packageName);

  const showWarning = () => {
    if (selectedPackages.length === 0) {
      warning("Please make a selection", "warning");
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (showWarning()) {
      const selectedPackageData = allPackages.filter((pkg) =>
        selectedPackages.includes(pkg.id)
      );

      // Update the pressRelease structure with packages data
      try {
        const existingData = JSON.parse(
          localStorage.getItem("pressRelease") || "{}"
        );
        const updatedPressRelease = {
          ...existingData,
          packagesData: selectedPackageData.map((pkg) => ({
            title: pkg.title,
            description: pkg.description,
          })),
          // Don't clear addOns here - let the next component handle it
        };

        localStorage.setItem(
          "pressRelease",
          JSON.stringify(updatedPressRelease)
        );
      } catch (error) {
        console.error("Error updating pressRelease data:", error);
      }

      router.push("/pressrelease/disclamer/requestquote");
    }
  };

  const renderPackageCard = (pkg) => (
    <div
      key={pkg.id}
      className={`border rounded-[20px] p-3 sm:p-6 cursor-pointer transition-all flex justify-between items-stretch ${
        isSelected(pkg.id)
          ? "border border-[#318FFF] bg-[#EDF5FF]"
          : "border border-[#318FFF] hover:border-gray-300"
      }`}
      onClick={() => togglePackage(pkg.id)}
    >
      {/* Left Section */}
      <div className="flex-1 pr-4">
        <h3 className="text-md font-semibold text-gray-900 mb-1">
          {pkg.title}
        </h3>
        {pkg.type === "single" ? (
          <p className="text-sm text-[#00000080]">{pkg.description}</p>
        ) : (
          <div className="space-y-1 text-sm text-[#00000080]">
            {pkg.details.map((detail, index) => (
              <p key={index}>{detail}</p>
            ))}
          </div>
        )}
      </div>

      {/* Right Section with vertical line and button */}
      <div className="border-l pl-6 flex items-center">
        <button
          className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
            isSelected(pkg.id) ? " text-[#01438D]" : " text-[#01438D]"
          }`}
        >
          {isSelected(pkg.id) ? "Select" : "Select"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 bg-white">
      {/* Go Back Button */}
      <span
        onClick={() => goBack()}
        className="mb-4 flex cursor-pointer items-center gap-x-1 self-start py-2 text-sm font-normal text-gray-500 hover:border-gray-400 hover:text-gray-800 w-fit"
      >
        <span className="material-icons-outlined icon-16">
          arrow_back_ios_new
        </span>
        Go Back
      </span>

      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-lg font-bold text-gray-900 mb-1">
          Get Guaranteed Reach with Disclaimer-Based Distribution
        </h1>
        <p className="text-[#00000080] text-[14px] md:text-md">
          Distribute your press release to 200+ publications with confirmed
          visibility on trusted platforms. Add premium placements for maximum
          impact.
        </p>
      </div>

      {/* Feature Tags */}
      <div className="flex flex-wrap gap-3 mb-6 sm:mb-8">
        <div className="bg-[#FFF9EA] border border-[#FAC540] rounded-[12px] px-4 py-3 flex items-center">
          <div className="w-5 h-5 mr-2 rounded-sm flex items-center justify-center">
            <img src="/assets/newspaper.svg" alt="check" className="w-5 h-5" />
          </div>
          <span className="text-sm font-medium text-gray-900">
            200+ Publications
          </span>
        </div>
        <div className="bg-[#FAC5401A] border border-[#FAC540] rounded-[12px] px-4 py-2 flex items-center">
          <div className="w-5 h-5 mr-2 rounded-sm flex items-center justify-center">
            <img src="/assets/visibility.svg" alt="check" className="w-5 h-5" />
          </div>
          <span className="text-sm font-medium text-gray-900">
            Confirmed Visibility
          </span>
        </div>
        <div className="bg-[#FAC5401A] border border-[#FAC540] rounded-[12px] px-4 py-2 flex items-center">
          <div className="w-5 h-5 mr-2 rounded-sm flex items-center justify-center">
            <img src="/assets/acute.svg" alt="check" className="w-5 h-5" />
          </div>
          <span className="text-sm font-medium text-gray-900">
            Fast Turnaround
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-4">
          {topTierPackages.map(renderPackageCard)}
        </div>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center"></div>
        </div>

        <div className="space-y-4">
          {standardPackages.map(renderPackageCard)}
        </div>
      </div>

      {/* Next Step Button */}
      <div className="flex justify-end mt-8">
        <button
          onClick={handleNextStep}
          className="bg-[#01438D] text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-[#01438D]/90 transition-colors cursor-pointer"
        >
          Go to Next Step
        </button>
      </div>
    </div>
  );
};

export default DistributionPackages;
