"use client";

import { useState } from "react";
import ContactUs from "../ContactUs";
import { useRouter } from "next/navigation";

const ChooseSkribe = () => {
  const [isContactUsOpen, setIsContactUsOpen] = useState(false);
  // const navigate = useNavigate();
  const router = useRouter();

  return (
    <section className="flex flex-col items-center py-8 px-6  sm:py-16 bg-[#F1F1E6]">
      <ContactUs
        open={isContactUsOpen}
        onClose={() => setIsContactUsOpen(false)}
      />

      <h2 className="font-bold text-2xl text-center sm:text-4xl lg:text-2xl text-gray-700">
        Make your work Easy
      </h2>

      <p className="text-xs text-center sm:text-lg max-w-4xl lg:px-36 text-gray-600">
        Choose Skribe and shine a light on your brand with real-time journalist
        insights, campaign tracking, and automated reporting.
      </p>

      <hr className="bg-gray-600 w-full sm:w-[600px] h-[2px] mt-4 px-6 sm:px-0" />

      <div className="relative flex items-center gap-6 mt-4">
        <button
          className="text-[#01438D] cursor-pointer border border-[#01438D] rounded-lg py-2 px-3 font-semibold text-xs sm:px-5 sm:py-3 sm:text-md"
          type="button"
          onClick={() => setIsContactUsOpen(true)}
        >
          Request Demo
        </button>

        <div className="absolute -top-4 left-1/2 h-4 w-[1px] bg-black" />

        <p className="text-[#333333] border rounded-full border-black p-2 sm:p-3 text-xs sm:text-md font-semibold">
          OR
        </p>

        <button
          className="text-white cursor-pointer bg-[#01438D] rounded-lg py-2 px-3 text-xs font-semibold sm:py-3 sm:px-5 sm:text-md"
          type="button"
          onClick={() => router.push("/signup")}
        >
          TRY FOR FREE
        </button>
      </div>
    </section>
  );
};

export default ChooseSkribe;
