const ReTarget = () => {
  return (
    <section className="container mx-auto flex flex-col items-center justify-center px-5 gap-10 lg:gap-10 xl:gap-20 pb-10 sm:px-10 lg:px-20 lg:flex-row">
      <article className="flex flex-col items-center lg:items-start ">
        <h2 className="text-2xl text-center lg:text-start font-bold text-balance text-[#4A4A4A] sm:text-2xl xl:w-[489px]">
          Re-Target Smarter
        </h2>

        <p className="text-sm break-words text-center lg:text-start whitespace-normal text-[#868686] sm:text-md lg:w-[480px]">
          Track pitch performance by recipient — opens, clicks, replies — and
          re-targetbased on outcomes. Know who's warm, who's cold, and who needs
          a follow-up — with real-time engagement visibility.
        </p>
      </article>

      <img
        className="w-[300px] sm:w-[340px] xl:w-[448px] relative lg:top-20"
        src="/assets/connect-schedule.webp"
        alt="Skribe dashboard showing engagement alerts and scheduling tools for retargeting journalists"
      />
    </section>
  );
};

export default ReTarget;
