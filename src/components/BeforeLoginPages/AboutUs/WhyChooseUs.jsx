const reasons = [
  {
    id: 1,
    title: "Verified Media Intelligence",
    description:
      "Access 40K+ verified journalists across beats, languages, and geographies.",
  },
  {
    id: 2,
    title: "Built for PR Teams",
    description:
      "Designed for the unique workflows of agencies, comms teams, and corporate PR.",
  },
  {
    id: 3,
    title: "Smart Automation",
    description:
      "Automate journalist updates, coverage tracking, and pitch success measurement",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-[#F1F1E6] py-5 sm:py-10 lg:py-14 px-5 lg:px-32">
      <div className="container mx-auto">
        <h2 className="text-[#333333] text-2xl sm:text-3xl xl:text-2xl font-bold">
          Why Choose Us?
        </h2>

        <p className="text-[#666666] text-sm sm:text-sm mb-3 sm:mb-6">
          What makes Skribe unique is our deep understanding of PR workflows and
          our commitment to smarter media outreach. We're not just a platform —
          we're a partner helping brands connect with the right journalists,
          track real impact, and move faster in today's media landscape.
        </p>

        <section className="flex gap-5 sm:gap-12 flex-col sm:flex-row">
          {reasons.map((reason) => {
            return (
              <article key={reason.id} className="flex flex-col justify-center">
                <h3 className="text-[#333333] font-semibold text-lg">
                  {reason.title}
                </h3>

                <p className="text-[#666666] text-xs sm:text-sm lg:text-base">
                  {reason.description}
                </p>
              </article>
            );
          })}
        </section>
      </div>
    </section>
  );
};

export default WhyChooseUs;
