const Reports = () => {
  return (
    <section className="container mx-auto flex flex-col items-center justify-center px-5 gap-6 lg:gap-16 xl:gap-40 py-5 sm:py-10 sm:px-10 lg:px-20 lg:flex-row">
      <article className="flex flex-col items-center lg:items-start">
        <h2 className="text-center lg:text-start text-2xl font-bold text-balance text-[#4A4A4A] sm:text-2xl xl:w-[536px]">
          Reports Every Monday
        </h2>

        <p className="text-center break-words whitespace-normal text-[#868686] sm:text-md lg:w-[420px] xl:w-[530px] lg:text-start">
          Receive Monday reports highlighting key journalist job changes, beat
          realignments, and shifts in editorial focus — across national and
          regional media.
        </p>
      </article>

      <img
        className="w-[205px] sm:w-[330px] xl:w-[415px] relative lg:top-5"
        src="/assets/skribe-report.webp"
        alt="Visual of weekly media report with profile image and tags for tech and business beats"
      />
    </section>
  );
};

export default Reports;
