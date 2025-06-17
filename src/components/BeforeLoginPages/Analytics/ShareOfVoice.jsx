const ShareOfVoice = () => {
  return (
    <section className="container mx-auto flex flex-col-reverse items-center justify-center gap-10 sm:pb-5 px-5 lg:gap-20 xl:gap-40 sm:px-10 lg:px-0 lg:flex-row">
      <img
        className="w-[220px] sm:w-[240px] lg:w-[280px] xl:w-[340px] relative left-7 lg:left-0 lg:top-10"
        src="/assets/analytics-voice.webp"
        alt="Chart visualizing distribution of media coverage across competitors for share of voice analysis on Skribe platform."
      />

      <article className="flex flex-col items-center lg:items-start">
        <h2 className="text-center lg:text-start text-2xl font-bold text-balance text-[#4A4A4A] sm:text-2xl lg:w-[536px]">
          Share of Voice
        </h2>

        <p className="text-center break-words whitespace-normal text-[#868686] sm:text-md lg:w-[480px] lg:text-start">
          Measure your share of voice across key channels — print, digital, and
          social — and benchmark against competitors.
        </p>
      </article>
    </section>
  );
};

export default ShareOfVoice;
