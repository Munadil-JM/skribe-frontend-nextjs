const DiscoverJournalist = () => {
  return (
    <section className="container mx-auto flex flex-col items-center justify-center px-5 gap-10 py-10 lg:gap-10 xl:gap-20 sm:pt-16 sm:px-10 lg:px-20 lg:flex-row">
      <article className="flex flex-col items-center lg:items-start">
        <h2 className="text-2xl font-bold text-center lg:text-start text-balance text-[#4A4A4A] sm:text-2xl xl:w-[486px]">
          Discover the Right Journalists
        </h2>

        <p className="text-sm break-words text-center lg:text-start whitespace-normal text-[#868686] sm:text-md lg:w-[480px]">
          Quickly search, sort, and filter over 40,000+ verified journalists
          using attributes that matter — beat, location, designation, language,
          and publication. Get the most relevant matches in seconds, thanks to
          Skribe's AI-powered media discovery engine.
        </p>
      </article>

      <img
        className="w-[300px] sm:w-[330px] xl:w-[458px]"
        src="/assets/database-contacts.webp"
        alt="Discover the right journalist using sort and filtering list"
      />
    </section>
  );
};

export default DiscoverJournalist;
