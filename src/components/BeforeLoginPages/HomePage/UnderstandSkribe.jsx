import Link from "next/link";

const useCases = [
  {
    id: 1,
    imageSrc: "/assets/home-pr-agencies.webp",
    title: "PR Agencies",
    desc: "Boost productivity with smart PR workflows tailored for agencies.",
  },
  {
    id: 2,
    imageSrc: "/assets/home-pr-teams.webp",
    title: "In house PR Teams",
    desc: "Align strategy, execution, and insights across your internal PR team.",
  },
  {
    id: 3,
    imageSrc: "/assets/home-marketing-heads.webp",
    title: "Marketing Heads",
    desc: "Maximize visibility in earned media with data-backed PR performance.",
  },
  {
    id: 4,
    imageSrc: "/assets/home-founders.webp",
    title: "Founders",
    desc: "Shape your brand story and reach media faster with Skribe	AI-powered platform.",
  },
];

const UnderstandSkribe = () => {
  return (
    <section className="container mx-auto flex flex-col items-center justify-center gap-6 xl:gap-10 py-5 px-5 sm:py-10 lg:px-10">
      <aside className="flex flex-col items-center gap-2 lg:gap-4">
        <div className="flex flex-col lg:gap-2">
          <h2 className="text-2xl font-bold text-balance text-[#4A4A4A] sm:text-2xl text-center">
            The AI Partner for PR
          </h2>

          <p className="text-sm break-words whitespace-normal text-[#868686] sm:text-md text-center">
            We work with Agency and Enterprise pros to drive campaign success
            and improve PR ROIs.
          </p>
        </div>

        <Link
          href="/signup"
          className="w-fit rounded-md bg-[#002B5B] px-5 py-2 text-sm sm:text-md font-bold text-[#E0E0E0] hover:bg-white border hover:border-[#002B5B] hover:text-[#002B5B]"
        >
          Try it Out
        </Link>
      </aside>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-6">
        {useCases.map((useCase) => {
          return (
            <li
              key={useCase.id}
              className="first:bg-[#EDF5FF] bg-white last:bg-[#EDF5FF] shadow-[0px_3px_8px_rgba(0,0,0,0.15)] p-2 sm:p-4 rounded-lg"
            >
              <article className="flex items-center gap-3 justify-between">
                <img
                  src={useCase.imageSrc}
                  alt={useCase.title}
                  width="100"
                  height="100"
                />

                <div>
                  <h3 className="text-[#002B5B] font-bold text-lg">
                    {useCase.title}
                  </h3>

                  <p className="text-[#002B5B] text-sm">{useCase.desc}</p>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default UnderstandSkribe;
