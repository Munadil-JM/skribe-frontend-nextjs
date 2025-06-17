const EnjoyInsights = () => {
  return (
    <section className="container mx-auto flex flex-col items-center justify-center px-5 gap-6 lg:gap-16 xl:gap-10 sm:pt-10 sm:px-10 lg:px-20 lg:flex-row">
      <article className="flex flex-col items-center lg:items-start">
        <h2 className="text-center lg:text-start text-2xl font-bold text-balance text-[#4A4A4A] sm:text-2xl xl:w-[536px]">
          Enjoy Insights with your Chai
        </h2>

        <p className="text-center break-words whitespace-normal text-[#868686] sm:text-md lg:w-[400px] xl:w-[480px] lg:text-start">
          Every morning, receive real-time data on trending journalists, rising
          storylines, and beat-level insights — powered by Skribe's AI.
        </p>
      </article>

      <img
        className="w-[280px] sm:w-[370px] lg:w-[400px] xl:w-[525px] relative lg:top-12"
        src="/assets/chai-time-insights.webp"
        alt="Dashboard showing volume trends over time and category-wise distribution of journalist activity, powered by Skribe AI."
      />
    </section>
  );
};

export default EnjoyInsights;
