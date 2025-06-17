"use client";

import { useState } from "react";
import ContactUs from "../ContactUs";

const Hero = () => {
  const [isContactUsOpen, setIsContactUsOpen] = useState(false);

  return (
    <div className="bg-[#EDF5FF] overflow-hidden">
      <ContactUs
        open={isContactUsOpen}
        onClose={() => setIsContactUsOpen(false)}
      />

      <section className="container mx-auto flex px-5 py-8 items-center gap-10 lg:gap-2 xl:gap-20 flex-col lg:justify-between h-[450px] sm:h-auto lg:h-[520px] lg:pt-8 lg:p-0 lg:flex-row">
        <article className="flex flex-col items-center lg:items-start">
          <h1 className="text-[#002B5B] text-2xl font-bold text-center sm:text-5xl lg:text-start lg:w-[619px]">
            PR Case Studies: See How Brands Used Skribe to Boost Media Coverage
          </h1>

          <p className="text-[#002B5B] text-center text-xs sm:text-xl lg:text-lg lg:w-[510px] lg:text-start mt-2">
            Discover how brands across tech, finance, health, and more used
            Skribe to improve journalist outreach, track ROI, and elevate their
            media presence.
          </p>

          <button
            className="border w-fit cursor-pointer border-[#002B5B] bg-[#002B5B] hover:bg-[#EDF5FF] text-[#EDF5FF] hover:text-[#002B5B] px-4 py-2 font-semibold rounded-lg text-sm sm:text-lg sm:font-medium sm:px-6 sm:py-2 mt-4"
            type="button"
            onClick={() => setIsContactUsOpen(true)}
          >
            Request Demo
          </button>
        </article>

        <img
          className="shrink-0 relative left-20 md:left-48 lg:h-[530px] lg:left-0 sm:top-20 w-[360px] sm:w-[650px] lg:w-[850px]"
          src="/assets/case-studies-hero.webp"
          alt="Illustration of Skribe's Case Studies dashboard"
        />
      </section>
    </div>
  );
};

export default Hero;
