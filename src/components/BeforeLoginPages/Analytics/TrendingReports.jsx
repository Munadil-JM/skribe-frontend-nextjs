const TrendingReports = () => {
  return (
    <section className="container mx-auto flex flex-col items-center justify-center px-5 gap-6 lg:gap-10 xl:gap-24 sm:py-10 sm:px-10 lg:px-20 lg:flex-row">
      <article className="flex flex-col items-center lg:items-start">
        <h2 className="text-center lg:text-start text-2xl font-bold text-balance text-[#4A4A4A] sm:text-2xl lg:w-[536px]">
          Trending Reports
        </h2>

        <p className="text-center break-words whitespace-normal text-[#868686] sm:text-md lg:w-[480px] lg:text-start">
          Stay updated with AI-curated reports highlighting spikes in brand
          mentions, PR impact, and competitive media trends.
        </p>
      </article>

      <img
        className="w-[264px] sm:w-[350px] lg:w-[400px] xl:w-[491px] relative lg:top-10"
        src="/assets/analytics-reports.webp"
        alt="Bar graph showing brand mentions over time, representing AI-generated trending media reports on Skribe's analytics dashboard."
      />
    </section>
  );
};

export default TrendingReports;
