const ServicesTrack = () => {
  return (
    <section className="container mx-auto flex flex-col-reverse items-center justify-center gap-10 pb-5 px-5 lg:gap-20 xl:gap-20 sm:pb-10 sm:px-10 lg:px-0 lg:flex-row">
      <img
        className="w-[270px] sm:w-[400px] lg:h-[180px] xl:w-[523px] xl:h-[258px]"
        src="/assets/monitoring-services.webp"
        alt="Monitor and track over 10k+ services from metro cities to tier 3 towns"
      />

      <article className="flex flex-col items-center lg:items-start ">
        <h2 className="text-center lg:text-start text-2xl font-bold text-balance text-[#4A4A4A] sm:text-2xl">
          Over 10K+ Services Tracked
        </h2>

        <p className="text-center break-words whitespace-normal text-[#868686] sm:text-md lg:w-[475px] lg:text-start">
          Monitor your brand's media presence across 10,000+ news outlets,
          blogs, forums, and local media — from metro cities to tier 3 towns.
        </p>
      </article>
    </section>
  );
};

export default ServicesTrack;
