const logos = [
  {
    src: "/assets/hpe.webp",
    alt: "Hewlett Packard Enterprise - Skribe Client",
    className:
      "inline lg:block mx-6 lg:mx-0 h-[25px] object-contain sm:w-[90px] sm:h-[50px]",
  },
  {
    src: "/assets/lead-school.webp",
    alt: "LeadSchool - Skribe Client",
    className:
      "inline lg:block mx-6 lg:mx-0 h-[25px] lg:w-[122px] sm:h-[50px] object-cover opacity-70",
  },
  {
    src: "/assets/boat.webp",
    alt: "Boat - Skribe Client",
    className:
      "inline lg:block mx-6 lg:mx-0 h-[18px] lg:w-[87px] sm:h-[36px] object-cover opacity-60",
  },
  {
    src: "/assets/schneider.webp",
    alt: "Schneider Electric - Skribe Client",
    className:
      "inline lg:block mx-6 lg:mx-0 h-[20px] lg:w-[135px] sm:h-[40px] object-cover",
  },
  {
    src: "/assets/lenovo.webp",
    alt: "Lenovo - Skribe Client",
    className:
      "inline lg:block mx-6 lg:mx-0 h-[18px] lg:w-[171px] sm:h-[36px] object-cover opacity-60",
  },
  {
    src: "/assets/revolut.webp",
    alt: "Revolut - Skribe Client",
    className:
      "inline lg:block mx-6 lg:mx-0 h-[28px] lg:w-[144px] sm:h-[32px] object-cover opacity-30",
  },
];

const TrustedBy = () => {
  return (
    <section className="flex flex-col items-center py-6 lg:px-10 sm:py-10 overflow-hidden lg:container lg:mx-auto">
      <h2 className="text-[#4A4A4A] font-bold text-2xl sm:text-2xl">
        Trusted by
      </h2>

      <p className="text-[#4A4A4A] text-center text-xs font-medium sm:text-lg mb-3 lg:mb-0">
        Over 40k+ software business growing with Skribe
      </p>

      <div className="w-max hidden lg:flex lg:items-center lg:gap-10 xl:gap-20 lg:w-full lg:justify-between mt-4">
        {logos.map((logo, i) => {
          return (
            <img
              key={i}
              className={logo.className}
              src={logo.src}
              alt={logo.alt}
              width={64}
              height={64}
            />
          );
        })}
      </div>

      <div className="whitespace-nowrap mt-4">
        <div className="w-max inline-block lg:hidden lg:items-center lg:gap-10 xl:gap-20 lg:w-full lg:justify-between animate-slide">
          {logos.map((logo, i) => {
            return (
              <img
                key={i}
                className={logo.className}
                src={logo.src}
                alt={logo.alt}
                width={64}
                height={64}
              />
            );
          })}
        </div>

        <div className="lg:hidden inline-block lg:items-center lg:gap-10 xl:gap-20 lg:w-full lg:justify-between animate-slide">
          {logos.map((logo, i) => {
            return (
              <img
                key={i}
                className={logo.className}
                src={logo.src}
                alt={logo.alt}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
