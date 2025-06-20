"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const brandGoals = ["Awareness", "Reach", "Conversions", "A/B Testing"];

export default function CampaignForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    budget: "",
    brandName: "",
    brandGoals: "Awareness",
    description: "",
  });
  const [brandGoalsDropDownOpen, setBrandGoalsDropDownOpen] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Check if required fields are filled
  const isFormValid =
    formData.title.trim() !== "" && formData.description.trim() !== "";

  const handleShortlistClick = () => {
    if (isFormValid) {
      router.push("/discover-social");
    }
  };

  return (
    <main className="font-inter">
      <div className="max-w-[1170px] mx-auto pb-20">
        {/* Navigation breadcrumb */}
        <div className="flex items-center gap-1 my-6">
          <span className="text-[#686BC7] font-[700] cursor-pointer underline">
            Create
          </span>
          <span className="text-[#0000004D] font-[700]"> &gt;</span>
          <span className="text-[#0000004D] ml-2">Discover &gt; </span>

          <span className="text-[#0000004D] ml-2">Shortlist &gt; </span>

          <span className="text-[#0000004D] ml-2">Engage</span>
        </div>

        {/* Main form container */}
        <div className="bg-[#F0EDE6] rounded-[15px] border border-[#00000033] p-6">
          {/* Header */}
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-[#E96D70]">
              Let's get started! Tell us about your Campaign
            </h2>
          </div>

          <div className="space-y-3">
            <div className="mb-3">
              <div className="grid grid-cols-2 gap-4">
                {/* Title Input */}
                <div>
                  <label className="block text-sm font-semibold text-[#1E1E1E] mb-1">
                    Give your campaign a title
                    <span className="text-[#FF0000]">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="For Eg. Diwali Lifestyle Campaign"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border text-sm border-gray-300 rounded-lg outline-none text-md placeholder-gray-400 bg-[#FAFAFA] "
                  />
                </div>

                {/* Start and End Dates */}
                <div>
                  <label className="block text-sm font-semibold text-[#1E1E1E] mb-1">
                    Date
                  </label>
                  <div className="grid grid-cols-2 gap-2 ">
                    {/* Start Date */}
                    <div className="relative w-full">
                      <input
                        className="!w-full block px-3 py-2 border border-gray-300 rounded-lg outline-none text-sm bg-[#FAFAFA]"
                        type="date"
                        max={today}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>

                    {/* End Date */}
                    <div className="relative w-full">
                      <input
                        className="!w-full block px-3 py-2 border border-gray-300 rounded-lg outline-none text-sm bg-[#FAFAFA]"
                        type="date"
                        min={startDate}
                        max={today}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-semibold text-[#1E1E1E] mb-1">
                Budget
              </label>
              <div className="relative grid grid-cols-2 gap-4">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                    ₹
                  </span>
                  <input
                    type="number"
                    name="budget"
                    placeholder="1,00,000.00"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full pl-6 pr-4 py-2 border border-gray-300 rounded-lg outline-none text-sm placeholder-gray-400 bg-[#FAFAFA]"
                  />
                </div>
              </div>
            </div>

            {/* Brand Name and Goals */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#1E1E1E] mb-1">
                  Brand Name
                </label>
                <input
                  type="text"
                  name="brandName"
                  placeholder="For Eg. Skribe Media"
                  value={formData.brandName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none text-sm placeholder-gray-400 bg-[#FAFAFA]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1E1E1E] mb-1">
                  Brand Goals
                </label>

                <div className="relative">
                  <div className="">
                    <div
                      // ref={stateRef}
                      className="w-full relative inline-flex flex-col"
                    >
                      <div
                        className="relative cursor-pointer flex items-center bg-white py-2 w-full rounded-lg border border-[#00000033]"
                        aria-label="State"
                        role="button"
                        onClick={() => setBrandGoalsDropDownOpen((p) => !p)}
                      >
                        <span className="ml-2 text-sm">
                          {formData.brandGoals}
                        </span>
                      </div>

                      {brandGoalsDropDownOpen && (
                        <div className="absolute mt-1 top-full w-full border border-black/20 rounded-lg z-50 max-h-48">
                          {brandGoals.map((item, i) => {
                            return (
                              <p
                                key={i}
                                className={`py-1 px-2 last:rounded-b-lg first:rounded-t-lg text-sm cursor-pointer hover:bg-[#EDEDED] hover:text-black ${item === formData.brandGoals ? "text-black font-semibold bg-white" : "text-black/90 bg-white"}`}
                                role="button"
                                onClick={() => {
                                  setFormData((p) => ({
                                    ...p,
                                    brandGoals: item,
                                  }));
                                  setBrandGoalsDropDownOpen(false);
                                }}
                              >
                                {item}
                              </p>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-[#1E1E1E] mb-1">
                Briefly describe the Campaign.
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  name="description"
                  placeholder="Write a description under 300 characters."
                  value={formData.description}
                  onChange={handleInputChange}
                  maxLength={300}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-[12px] outline-none text-sm placeholder-gray-400 resize-none bg-[#FAFAFA]"
                />
                <div className="absolute bottom-3 right-4 text-xs text-gray-400">
                  {formData.description.length}/300
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center items-center sticky bg-[#F0EDE6] bottom-0 py-3 border-t-2 border-black/30">
        <div className="flex w-full max-w-[1170px] justify-end">
          <button
            onClick={handleShortlistClick}
            className={`px-4 py-2 rounded-lg ml-auto text-sm font-medium outline-none ${isFormValid ? "bg-[#E96D70] text-white cursor-pointer hover:bg-[#ff4f4f]" : "bg-[#989898] cursor-not-allowed text-[#434343]"}`}
          >
            Discover Influencers
          </button>
        </div>
      </div>
    </main>
  );
}
