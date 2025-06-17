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

      <section className="container mx-auto flex px-8 py-8 items-center gap-10 lg:gap-2 xl:gap-20 flex-col lg:justify-between lg:h-[520px] lg:pt-8 lg:p-0 lg:flex-row">
        <article className="flex flex-col items-center lg:items-start lg:pl-10">
          <h1 className="text-[#002B5B] text-2xl font-bold text-center sm:text-5xl lg:text-start lg:w-[589px]">
            AI-Powered Media Intelligence for Smarter PR Campaigns
          </h1>

          <p className="text-[#002B5B] text-center text-xs sm:text-xl lg:text-lg lg:w-[489px] lg:text-start mt-2">
            Skribe empowers PR teams and marketing leaders with AI-driven media
            intelligence, journalist discovery, and PR automation—ensuring
            higher ROI and faster execution.
          </p>

          <button
            className="border w-fit cursor-pointer border-[#002B5B] bg-[#002B5B] hover:bg-[#EDF5FF] text-[#EDF5FF] hover:text-[#002B5B] px-4 py-2 font-semibold rounded-lg text-sm sm:text-lg sm:font-medium sm:px-6 sm:py-2 mt-4"
            type="button"
            onClick={() => setIsContactUsOpen(true)}
          >
            Request Demo
          </button>
        </article>

        <picture className="sm:w-[680px] sm:h-[430px] lg:w-[980px] lg:h-[630px] shrink-0 relative lg:top-20">
          <source media="(min-width: 1023px)" srcSet="/assets/home-hero.webp" />
          <source media="(min-width: 768px)" srcSet="/assets/home-hero.webp" />
          <img
            src="/assets/home-hero-mobile.webp"
            alt="Illustration of Skribe's AI-powered media intelligence dashboard"
            width={980}
            height={630}
          />
        </picture>
      </section>
    </div>
  );
};

export default Hero;
