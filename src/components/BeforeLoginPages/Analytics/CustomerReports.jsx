const CustomerReports = () => {
  return (
    <section className="container mx-auto flex flex-col-reverse items-center justify-center gap-10 py-5 px-5 lg:gap-16 xl:gap-36 sm:py-10 sm:px-10 lg:px-0 lg:flex-row">
      <img
        className="w-[230px] sm:w-[320px] lg:w-[350px] xl:w-[406px]"
        src="/assets/analytics-customer.webp"
        alt="Custom analytics dashboard with campaign performance charts, sentiment pie chart, journalist engagement data, and reach metrics on Skribe reporting platform."
      />

      <article className="flex flex-col items-center lg:items-start">
        <h2 className="text-center lg:text-start text-2xl font-bold text-balance text-[#4A4A4A] sm:text-2xl lg:w-[536px]">
          Customer Reports
        </h2>

        <p className="text-center break-words whitespace-normal text-[#868686] sm:text-md lg:w-[480px] lg:text-start">
          Get executive-ready custom reports with filters for team performance,
          outlet types, and campaign ROI.
        </p>
      </article>
    </section>
  );
};

export default CustomerReports;
