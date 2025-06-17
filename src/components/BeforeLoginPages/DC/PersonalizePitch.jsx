const PersonalizePitch = () => {
  return (
    <section className="container mx-auto flex flex-col-reverse items-center justify-center px-5 gap-5 pb-10 lg:gap-20 xl:gap-32 sm:pt-10 sm:px-10 lg:px-20 lg:flex-row">
      <img
        className="w-[300px] sm:w-[440px] xl:w-[538px] relative lg:top-10"
        src="/assets/connect-personalization.webp"
        alt="User interface for customizing media pitches with brand and competitor keyword inputs on Skribe's media intelligence platform."
      />

      <article className="flex flex-col items-center lg:items-start">
        <h2 className="text-2xl font-bold text-center lg:text-start text-balance text-[#4A4A4A] sm:text-2xl xl:w-[536px]">
          Personalize Every Pitch
        </h2>

        <p className="text-sm text-center lg:text-start break-words whitespace-normal text-[#868686] sm:text-md lg:w-[480px]">
          Move beyond the spray-and-pray approach. Skribe shows you engagement
          patterns, tone preferences, and topic familiarity for each journalist.
          Use this data to write personalized emails that speak to their beat,
          tone, and publishing behavior — improving pitch success rates
          significantly.
        </p>
      </article>
    </section>
  );
};

export default PersonalizePitch;
