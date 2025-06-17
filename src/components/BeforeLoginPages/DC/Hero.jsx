import { useState } from "react";
import ContactUs from "../ContactUs";

const Hero = () => {
  const journalistsCount = "40K+";
  const influencersCount = "2L+";
  const articlesCount = "3M";
  const [isContactUsOpen, setIsContactUsOpen] = useState(false);

  return (
    <div className="bg-[#EDF5FF] overflow-hidden">
      <ContactUs
        open={isContactUsOpen}
        onClose={() => setIsContactUsOpen(false)}
      />

      <section className="container mx-auto flex flex-col gap-10 items-center py-8 h-[400px] sm:h-[520px] lg:p-0  lg:pt-10 lg:flex-row">
        <article className="flex flex-col items-center lg:items-start lg:pl-10">
          <h1 className="text-[#002B5B] text-2xl font-bold text-center sm:text-5xl lg:text-start lg:w-[513px]">
            India's Most Powerful Media Database & Outreach Engine
          </h1>

          <p className="text-[#002B5B] text-center text-xs sm:text-xl lg:text-lg lg:w-[489px] lg:text-start mt-2">
            Find the right journalists. Personalize pitches. Build long-term
            media relationships — all on one platform.
          </p>

          <button
            className="border w-fit cursor-pointer border-[#002B5B] bg-[#002B5B] hover:bg-[#EDF5FF] text-[#EDF5FF] hover:text-[#002B5B] px-4 py-2 font-semibold rounded-lg text-sm sm:text-lg sm:font-medium sm:px-6 sm:py-2 mt-4"
            type="button"
            onClick={() => setIsContactUsOpen(true)}
          >
            Request Demo
          </button>
        </article>

        <div className="relative shrink-0 left-20 sm:left-32 lg:left-28">
          <img
            className="sm:w-[680px] sm:h-[430px] lg:w-[980px] lg:h-[630px] shrink-0 relative lg:top-20"
            src="/assets/home-hero.webp"
            alt="Illustration of Skribe's AI-powered media intelligence dashboard"
          />

          <div className="absolute top-16 sm:top-28 lg:top-60 -left-10 lg:-left-40 shadow-[0_4px_20px_rgba(0,0,0,0.25)] bg-[#F1F1E6] flex items-center gap-5 sm:gap-10 lg:gap-16 rounded-md sm:rounded-xl p-3 sm:p-9 lg:p-11 border-2 border-black/30">
            <div className="text-[#01438D] flex flex-col items-center">
              <span className="font-semibold text-xl sm:text-5xl lg:text-6xl">
                {journalistsCount}
              </span>
              <span className="text-[10px] sm:text-sm">JOURNALISTS</span>
            </div>

            <div className="text-[#FF7A00] flex flex-col items-center">
              <span className="font-semibold text-2xl sm:text-5xl lg:text-6xl">
                {influencersCount}
              </span>
              <span className="text-[10px] sm:text-sm">INFLUENCERS</span>
            </div>

            <div className="text-black flex flex-col items-center">
              <span className="font-semibold text-2xl sm:text-5xl lg:text-6xl">
                {articlesCount}
              </span>
              <span className="text-[10px] sm:text-sm">ARTICLES</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
