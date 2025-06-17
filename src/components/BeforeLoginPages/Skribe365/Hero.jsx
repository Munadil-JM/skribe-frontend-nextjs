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
          <h1 className="text-[#002B5B] text-2xl font-[700] text-center sm:text-5xl lg:text-start lg:w-[560px]">
            Get Weekly Journalist Beat Updates & Media Movement Alerts
          </h1>

          <p className="text-[#002B5B] text-center text-xs sm:text-xl lg:text-lg lg:w-[489px] lg:text-start mt-2">
            Skribe 365 delivers curated journalist movement and beat updates to
            your inbox every Monday — across over 50+ sectors and publications.
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
          className="shrink-0 relative -left-8 md:-left-16 2xl:left-0 lg:top-10 w-[450px] sm:w-[650px] sm:h-[400px] lg:w-[730px] lg:h-[450px]"
          src="/assets/skribe-hero.webp"
          alt="Illustration showing journalist movement between media outlets, featuring profile cards and publication names"
        />
      </section>
    </div>
  );
};

export default Hero;
