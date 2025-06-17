const KeyBenefits = () => {
  const benefits = [
    {
      id: 1,
      heading: "Automate Outreach",
      description:
        "Save hours with ready-made journalist lists and pitch flows.",
    },
    {
      id: 2,
      heading: "Build Real Relationships",
      description:
        "Go beyond cold outreach — pitch based on journalist behavior.",
    },
    {
      id: 3,
      heading: "Gain Intelligence at Every Step",
      description:
        " From first filter to final pitch — access data-backed decisions.",
    },
  ];

  return (
    <section className="container mx-auto  px-5 gap-10 lg:gap-20 xl:gap-28 pb-10 sm:px-10 lg:px-20 lg:flex-row">
      <h2 className="text-center font-[700] text-[#333333] text-2xl sm:text-2xl lg:text-2xl">
        Benefits you get
      </h2>

      <section className="flex flex-col py-3 justify-center lg:py-16 lg:flex-row">
        {benefits.map((benefit) => {
          return (
            <article
              key={benefit.id}
              className="flex flex-col items-start justify-start border-b py-4 border-[#999999]/40 lg:py-0 lg:px-10 lg:border-b-0 lg:border-r last:border-0"
            >
              <h3 className="text-xl font-bold text-balance text-[#4A4A4A] sm:text-sm">
                {benefit.heading}
              </h3>

              <p className="text-sm break-words whitespace-normal text-[#868686] sm:text-md">
                {benefit.description}
              </p>
            </article>
          );
        })}
      </section>
    </section>
  );
};

export default KeyBenefits;
