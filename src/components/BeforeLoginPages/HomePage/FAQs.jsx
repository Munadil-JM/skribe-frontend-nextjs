"use client";

import { useState } from "react";
import AccordionCard from "./AccordionCard";

const FAQs = () => {
  const skribeUses = [
    {
      id: 1,
      heading: "Comprehensive Media Monitoring",
      description:
        "Track millions of online, print, and broadcast sources to ensure you never miss important mentions. Skribe's media monitoring solutions provide real-time insights into your brand, competitors, and industry.",
    },
    {
      id: 2,
      heading: "Advanced Social Listening",
      description:
        "Discover what your audience is saying across social platforms. Skribe's social listening tools offer the ability to monitor and analyze online conversations, providing you with valuable insights to guide your marketing strategies.",
    },
    {
      id: 3,
      heading: "AI-Powered Analytics",
      description:
        "Harness the power of artificial intelligence to analyze large volumes of data. Skribe's analytics features help identify emerging trends, journalists impact, and market sentiment.",
    },
    {
      id: 4,
      heading: "Competitor Tracking",
      description:
        "Keep an eye on your competitors with in-depth competitor tracking tools. Understand their media presence, identify opportunities for differentiation, and adjust your strategies accordingly.",
    },
  ];

  const findJournalists = [
    {
      id: 1,
      heading: "Media Monitoring",
      description:
        "Stay informed with real-time alerts and comprehensive coverage across print, online, TV, and radio sources.",
    },
    {
      id: 2,
      heading: "Social Listening",
      description:
        "Monitor conversations on Twitter, Instagram, Facebook, and other social networks, and analyze sentiment to improve engagement strategies.",
    },
    {
      id: 3,
      heading: "Journalist Identification",
      description:
        "Find the most impactful journalists and understand their reach in your industry to enhance your PR campaigns.",
    },
    {
      id: 4,
      heading: "PR Reporting & Insights",
      description:
        "Create custom reports with detailed analytics on your media performance. Visualize trends and measure the effectiveness of your PR efforts.",
    },
  ];

  const suitableForAgencies = [
    {
      id: 1,
      heading: "Is Skribe suitable for agencies?",
      description:
        "Yes, Skribe is built with agencies in mind. Whether you're a PR, communications, or media agency, Skribe helps you discover journalists, track media movements, send targeted press releases, and measure campaign impact—all in one platform. Our powerful filters and regional reach make it easy to find the right media contacts for every client and story.",
    },
  ];

  const freeTrial = [
    {
      id: 1,
      heading: "Do you offer a free trial?",
      description:
        "Yes, Skribe offers a 30-day free trial with full access to all core features. No credit card is required to get started—just sign up and explore how Skribe can simplify your media outreach.",
    },
  ];

  const allFAQs = [
    {
      id: 1,
      title: "What is Skribe used for?",
      questions: skribeUses,
    },
    {
      id: 2,
      title: "Can Skribe help me find journalists?",
      questions: findJournalists,
    },
    {
      id: 3,
      title: "Is Skribe suitable for agencies?",
      questions: suitableForAgencies,
    },
    {
      id: 4,
      title: "Do you offer a free trial?",
      questions: freeTrial,
    },
  ];

  const [selectedTitle, setSelectedTitle] = useState(
    "What is Skribe used for?"
  );
  const [selectedQuestions, setSelectedQuestions] = useState(skribeUses);
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="bg-[#F1F1E6]">
      <section className="container mx-auto flex items-center flex-col gap-2 px-5 py-6 sm:px-6 sm:py-16">
        <h2 className="text-[#333333] text-2xl font-bold text-center sm:text-2xl">
          Skribe: Leading Media Monitoring & Social Listening Platform
        </h2>

        <p className="text-center text-sm md:text-sm xl:w-[1104px]">
          In today's fast-paced digital landscape, staying ahead of the curve is
          crucial. Skribe empowers businesses to monitor global media coverage,
          social conversations, and emerging trends in real time. Whether you're
          tracking your brand, competitors, or industry developments, Skribe
          offers AI-driven insights to enhance your PR and marketing strategies.
        </p>

        <ul className="flex pb-1 overflow-x-auto lg:w-[720px] xl:w-auto mt-4 items-center gap-2 sm:gap-4">
          {allFAQs.map((title) => {
            return (
              <li className="shrink-0" key={title.id}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTitle(title.title);
                    setSelectedQuestions(title.questions);
                  }}
                  className={`px-3 py-2 cursor-pointer rounded-lg font-semibold  border border-[#01438D] text-xs ${selectedTitle === title.title ? "bg-[#01438D] text-[#F1F1E6]" : "text-[#01438D]"} sm:font-normal sm:text-lg hover:bg-[#01438D] hover:text-white`}
                >
                  {title.title}
                </button>
              </li>
            );
          })}
        </ul>

        {selectedTitle === "What is Skribe used for?" ||
        selectedTitle === "Can Skribe help me find journalists?" ? (
          <div className="flex flex-col w-full items-center gap-4 pt-6 lg:w-fit sm:flex-row">
            <picture className="w-[323px] h-[264px] sm:w-[300px] sm:h-[200px] md:w-[400px] md:h-[350px] lg:w-[440px] relative left-2 sm:left-0">
              <source media="(min-width: 1023px)" srcSet="/assets/faq.webp" />
              <source
                media="(min-width: 768px)"
                srcSet="/assets/faq-mobile.webp"
              />
              <img
                src="/assets/faq-mobile.webp"
                alt="Frequently Asked Questions Banner"
                loading="lazy"
                className="w-[323px] h-[264px] sm:w-[300px] sm:h-[200px] md:w-[400px] md:h-[350px] lg:w-[440px] relative left-2 sm:left-0"
              />
            </picture>

            {/* <img
              className="w-[323px] h-[264px] sm:w-[300px] sm:h-[200px] md:w-[400px] md:h-[350px] lg:w-[440px] relative left-2 sm:left-0"
              src="/assets/faq.webp"
              alt="Frequently Asked Questions Banner"
            /> */}

            <section className="flex flex-col gap-3 sm:gap-6 w-full lg:w-[600px]">
              <h2 className="text-[#4A4A4A] font-bold text-sm sm:text-xl lg:text-xl">
                {selectedTitle}
              </h2>

              <div className="flex flex-col gap-2 sm:gap-4">
                {selectedQuestions.map((faq) => {
                  return (
                    <AccordionCard
                      key={faq.id}
                      heading={faq.heading}
                      isOpen={selectedId === faq.id}
                      handler={() =>
                        setSelectedId(selectedId === faq.id ? null : faq.id)
                      }
                      description={faq.description}
                    />
                  );
                })}
              </div>
            </section>
          </div>
        ) : (
          <p className="sm:text-lg text-center pt-4 sm:pt-10 sm:max-w-5xl">
            {selectedQuestions[0].description}
          </p>
        )}
      </section>
    </div>
  );
};

export default FAQs;
