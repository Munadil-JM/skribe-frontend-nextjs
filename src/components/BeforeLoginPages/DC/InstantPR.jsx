const InstantPR = () => {
  return (
    <section className="container mx-auto flex flex-col items-center justify-center gap-10 sm:py-5 px-5 lg:gap-10 xl:gap-20 lg:py-0 sm:px-10 lg:px-0 lg:flex-row">
      <article className="flex flex-col items-center lg:items-start">
        <h2 className="text-2xl text-center lg:text-start font-bold text-balance text-[#4A4A4A] sm:text-2xl xl:w-[486px]">
          Instant PR Workflows
        </h2>

        <p className="text-sm break-words text-center lg:text-start whitespace-normal text-[#868686] sm:text-md lg:w-[480px]">
          Build, edit, and export targeted journalist lists in minutes. Use
          advanced filtering + auto-tagging to create media lists aligned with
          your campaign's geography, topic, or audience — without manual effort.
          Automated templates and workflow shortcuts help reduce turnaround time
          by 70%.
        </p>
      </article>

      <img
        className="w-[270px] sm:w-[320px] xl:w-[449px] relative left-4 lg:top-10 lg:left-0"
        src="/assets/database-pr.webp"
        alt="Illustration showing journalist profile with contact info and coverage topics"
      />
    </section>
  );
};

export default InstantPR;
