const KnowAboutSkribe = () => {
  return (
    <section className="container mx-auto flex flex-col items-center justify-center px-5 gap-0 lg:gap-10 xl:gap-32 pt-10 lg:py-0 lg:px-10 lg:flex-row">
      <article className="flex flex-col items-center lg:items-start">
        <h2 className="text-center lg:text-start text-2xl font-bold text-balance text-[#4A4A4A] sm:text-2xl lg:w-[536px]">
          Do you want to know more About Skribe?
        </h2>

        <p className="text-center break-words whitespace-normal text-[#868686] sm:text-md lg:w-[480px] lg:text-start">
          Skribe was founded to help PR professionals simplify journalist
          discovery and outreach. We are proud to support over 40,000 users
          across agencies and enterprises.
        </p>
      </article>

      <img
        className="w-[300px] sm:w-[350px] lg:w-[400px] xl:w-[525px] relative top-8 sm:top-14"
        src="/assets/about-us-know-about.webp"
        alt="Skribe logo with a document icon, representing media intelligence and journalist discovery platform."
      />
    </section>
  );
};

export default KnowAboutSkribe;
