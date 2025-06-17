const Beats = () => {
  return (
    <section className="container mx-auto flex flex-col-reverse items-center justify-center gap-6 pb-5 px-5 lg:gap-20 xl:gap-48 sm:pb-5 sm:px-10 lg:px-0 lg:flex-row">
      <img
        className="w-[300px] relative -left-2 sm:left-0 lg:top-8 sm:w-[380px] xl:w-[500px]"
        src="/assets/skribe-beat.webp"
        alt="Skribe dashboard with labeled media beats and journalist movement count, showcasing real-time tracking across 50+ editorial sectors."
      />

      <article className="flex flex-col items-center lg:items-start">
        <h2 className="text-center lg:text-start text-2xl font-bold text-balance text-[#4A4A4A] sm:text-2xl xl:w-[536px]">
          50+ Beats Covered
        </h2>

        <p className="text-center break-words whitespace-normal text-[#868686] sm:text-md lg:w-[420px] xl:w-[530px] lg:text-start">
          Get journalist coverage changes across 50+ beats — including tech,
          business, finance, health, and education. Stay ahead of the next big
          story with real-time insight.
        </p>
      </article>
    </section>
  );
};

export default Beats;
