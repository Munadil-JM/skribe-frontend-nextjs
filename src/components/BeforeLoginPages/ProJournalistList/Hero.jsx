const Hero = () => {
  return (
    <div className="bg-[#EDF5FF] overflow-hidden">
      <section className="container mx-auto flex flex-col items-center gap-10 h-[350px] sm:h-[450px] lg:h-[250px] lg:pl-10 py-5 lg:flex-row">
        <article className="flex flex-col gap-4 px-8">
          <h1 className="font-bold text-[#002B5B] text-center text-2xl sm:text-4xl lg:text-start lg:w-[516px]">
            Verified Journalist Lists by Beat, City & Publication
          </h1>

          <p className="text-[#002B5BB2] text-xs text-center sm:text-lg lg:text-start lg:w-[579px]">
            Access ready-made journalist lists by sector, city, or industry.
            Perfect for PR teams looking to pitch smarter and faster across
            India.
          </p>
        </article>

        <img
          className="sm:w-[600px] sm:h-[400px] lg:w-[637px] lg:h-[380px] relative left-14 sm:left-28 lg:left-0 lg:top-20"
          src="/assets/pro-journalist-list.webp"
          alt="Pro Journalists List dashboard"
        />
      </section>
    </div>
  );
};

export default Hero;
