const KnowTheirBeat = () => {
  return (
    <section className="container mx-auto flex flex-col-reverse items-center justify-center gap-10 sm:py-5 px-5 lg:gap-20 lg:py-0 sm:px-10 lg:px-0 lg:flex-row">
      <img
        className="w-[280px] sm:w-[350px] xl:w-[449px] relative left-12 sm:left-16 lg:top-20 lg:left-4"
        src="/assets/dc-know-beat.webp"
        alt="Illustration showing journalist profile with contact info and coverage topics"
      />

      <article className="flex flex-col items-center lg:items-start">
        <h2 className="text-2xl text-center lg:text-start font-bold text-balance text-[#4A4A4A] sm:text-2xl ">
          Know Their Beat, Before You Pitch
        </h2>

        <p className="text-sm text-center lg:text-start break-words whitespace-normal text-[#868686] sm:text-md lg:w-[420px]">
          Each journalist profile includes beat tags, recent articles, topic
          history, and previous media affiliations — so you never pitch blindly
          again. Leverage these insights to craft relevant, timely pitches that
          resonate with what journalists are already writing about.
        </p>
      </article>
    </section>
  );
};

export default KnowTheirBeat;
