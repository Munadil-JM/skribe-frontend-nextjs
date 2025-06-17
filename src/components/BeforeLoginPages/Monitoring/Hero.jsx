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

      <section className="container mx-auto flex px-8 py-8 items-center gap-10 lg:gap-2 xl:gap-20 flex-col lg:justify-between h-[450px] sm:h-[600px] lg:h-[520px] lg:pt-8 lg:p-0 lg:flex-row">
        <article className="flex flex-col items-center lg:items-start lg:pl-10">
          <h1 className="text-[#002B5B] text-2xl font-bold text-center sm:text-5xl lg:text-start">
            Monitor Your Brand in Real Time Across Digital, Print, and Broadcast
            Media
          </h1>

          <p className="text-[#002B5B] text-center text-xs sm:text-xl lg:text-lg lg:w-[489px] lg:text-start mt-2">
            Track media mentions across 10K+ services, understand sentiment, and
            get alerts on the stories that matter most to your brand.
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
          className="shrink-0 relative left-10 sm:left-20 md:left-48 sm:w-[650px] lg:w-[1000px] lg:left-0 lg:top-16"
          src="/assets/monitoring-hero.webp"
          alt="Illustration of Skribe's monitoring dashboard"
        />
      </section>
    </div>
  );
};

export default Hero;
