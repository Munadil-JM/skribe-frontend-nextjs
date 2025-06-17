const RelevantNews = () => {
  return (
    <section className="container mx-auto flex flex-col items-center justify-center px-5 gap-5 lg:gap-10 xl:gap-20 pt-5 sm:py-10 sm:px-10 lg:px-20 lg:flex-row">
      <article className="flex flex-col items-center lg:items-start">
        <h2 className="text-center lg:text-start text-2xl font-bold text-balance text-[#4A4A4A] sm:text-2xl lg:w-[536px]">
          Relevant News Only
        </h2>

        <p className="text-center break-words whitespace-normal text-[#868686] sm:text-md lg:w-[480px] lg:text-start">
          Classify mentions as headlines, passing mentions, or grouped stories —
          so you focus on what's most relevant. Powered by AI sentiment analysis
          and journalist-level tagging.
        </p>
      </article>

      <img
        className="w-[300px] sm:w-[400px] lg:w-[350px] xl:w-[445px] relative -left-3 lg:left-0 lg:top-5"
        src="/assets/monitoring-news.webp"
        alt="Search results for The Times of India, The Hindu, and The Indian Express"
      />
    </section>
  );
};

export default RelevantNews;
