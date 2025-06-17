const SentimentAnalysis = () => {
  return (
    <section className="container bg-red-90 mx-auto flex flex-col items-center justify-center px-5 gap-6 lg:gap-14 xl:gap-40 sm:pb-5 sm:px-10 lg:px-10 lg:flex-row">
      <article className="flex flex-col items-center lg:items-start">
        <h2 className="text-center lg:text-start text-2xl font-bold text-balance text-[#4A4A4A] sm:text-2xl lg:w-[536px]">
          Sentiment Analysis
        </h2>

        <p className="text-center break-words whitespace-normal text-[#868686] sm:text-md lg:w-[480px] lg:text-start">
          Track positive, negative, or neutral sentiment of your media mentions
          using AI-powered tone detection.
        </p>
      </article>

      <img
        className="w-[200px] sm:w-[304px] lg:w-[330px] xl:w-[400px] relative lg:-top-5"
        src="/assets/analytics-sentiment.webp"
        alt="Sentiment meter for tracking media tone using Skribe's AI-powered sentiment analysis tool."
      />
    </section>
  );
};

export default SentimentAnalysis;
