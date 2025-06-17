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
          <h1 className="text-[#002B5B] text-2xl font-[700] text-center sm:text-5xl lg:text-start lg:w-[519px]">
            Start Your Day with Curated PR & Media Updates from Top Journalists
          </h1>

          <p className="text-[#002B5B] text-center text-xs sm:text-xl lg:text-lg lg:w-[489px] lg:text-start mt-2">
            Get journalist movement alerts and trending news updates from
            India's top publications delivered fresh every morning — with your
            chai.
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
          className="relative -left-4 shrink-0 w-[330px] sm:w-[430px] md:w-[500px] xl:w-[630px] sm:-left-8 lg:-left-24 xl:-left-16 lg:top-10"
          src="/assets/chai-time-hero.webp"
          alt="Search journalist movement across publications like The Times of India, The Hindu, and The Indian Express using Skribe's media intelligence platform."
        />
      </section>
    </div>
  );
};

export default Hero;
