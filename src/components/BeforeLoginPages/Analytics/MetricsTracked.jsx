const MetricsTracked = () => {
  return (
    <section className="container mx-auto flex flex-col items-center justify-center px-5 gap-6 lg:gap-14 xl:gap-20 pb-5 sm:py-10 sm:px-10 lg:flex-row">
      <article className="flex flex-col items-center lg:items-start">
        <h2 className="text-center lg:text-start text-2xl font-bold text-balance text-[#4A4A4A] sm:text-2xl lg:w-[536px]">
          Metrics Tracked
        </h2>

        <p className="text-center break-words whitespace-normal text-[#868686] sm:text-md lg:w-[480px] lg:text-start">
          Access data on mentions by channel, media type, language, and region —
          tracked across over 10K+ sources.
        </p>
      </article>

      <img
        className="w-[250px] sm:w-[330px] lg:w-[370px] xl:w-[480px]"
        src="/assets/analytics-metrics.webp"
        alt="Multiple data visualizations showing volume over time, mentions by type, and share of voice metrics across media channels in Skribe's tracking interface."
      />
    </section>
  );
};

export default MetricsTracked;
