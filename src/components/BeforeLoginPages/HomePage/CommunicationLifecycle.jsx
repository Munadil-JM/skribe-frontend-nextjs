const CommunicationLifecycle = () => {
  return (
    <section className="px-5 relative py-5 lg:px-10 lg:py-10 bg-white">
      <div className="mx-auto container flex justify-center items-center flex-col lg:flex-row lg:gap-20 py-5 px-5 sm:px-10 rounded-xl">
        <div className="lg:w-2/5">
          <img
            className="absolute top-0 hidden lg:block"
            src="/assets/home-database-design.webp"
            alt="Abstract vertical bars in different shades"
            width={100}
          />

          <h2 className="font-bold sm:font-extrabold text-2xl leading-[1] text-center lg:text-start mb-2 text-[#01438D] sm:text-[44px]">
            India's Smartest PR Workflow — From Discovery to Impact
          </h2>

          <p className="text-center lg:text-start">
            Deliver personalized campaigns with precision, monitor results in
            real time, and prove PR value — all from one intelligent platform.
          </p>
        </div>

        <section className="grid grid-cols-1 lg:w-3/5 sm:grid-cols-2 items-center gap-3 sm:gap-4">
          <div className="py-4 px-3 rounded-lg w-full">
            {/* <img
              className="w-[170px] my-4"
              src="/assets/lifecycle-1.webp"
              width={180}
              alt="Illustration of Step 1: Discover"
            /> */}

            <picture className="w-[170px] my-4">
              <source
                media="(min-width: 1023px)"
                srcSet="/assets/lifecycle-1.webp"
              />
              <source
                media="(min-width: 768px)"
                srcSet="/assets/lifecycle-1-mobile.webp"
              />
              <img
                src="/assets/lifecycle-1-mobile.webp"
                alt="Illustration of Step 1: Discover"
                width="200px"
                height="200px"
                className="w-[170px] my-4"
              />
            </picture>

            <span className="w-fit text-xs font-medium rounded-md py-1 px-2 text-[#333333] border border-[#333333] sm:text-md">
              Step 1
            </span>

            <h3 className="text-[#01438D] my-2 font-semibold sm:text-lg mt-2">
              Discover
            </h3>

            <p className="text-[#666666] text-xs sm:text-sm">
              Browse 40,000+ verified journalists by beat, publication,
              language, or location. See what they cover and how best to pitch —
              all in one place.
            </p>
          </div>

          <div className="py-4 px-3 rounded-lg w-full">
            <picture className="w-[260px] my-4">
              <source
                media="(min-width: 1023px)"
                srcSet="/assets/lifecycle-2.webp"
              />
              <source
                media="(min-width: 768px)"
                srcSet="/assets/lifecycle-2-mobile.webp"
              />
              <img
                src="/assets/lifecycle-2-mobile.webp"
                alt="Illustration of Step 2: Discover"
                width="200px"
                height="200px"
                className="w-[260px] my-4"
              />
            </picture>

            {/* <img
              className="w-[260px] my-4"
              src="/assets/lifecycle-2.webp"
              width={260}
              alt="Illustration of Step 1: Discover"
            /> */}

            <span className="w-fit text-xs font-medium rounded-md py-1 px-2 text-[#333333] border border-[#333333] sm:text-md">
              Step 2
            </span>

            <h3 className="text-[#01438D] my-2 font-semibold sm:text-lg">
              Design Your Campaign
            </h3>

            <p className="text-[#666666] text-xs sm:text-sm">
              Use AI-powered templates and insights to craft personalized
              campaigns that match each journalist's interests and tone — at
              scale.
            </p>
          </div>

          <div className="py-4 px-3 rounded-lg w-full">
            <picture className="w-[200px] lg:w-[220px] my-4">
              <source
                media="(min-width: 1023px)"
                srcSet="/assets/lifecycle-3.webp"
              />
              <source
                media="(min-width: 768px)"
                srcSet="/assets/lifecycle-3-mobile.webp"
              />
              <img
                src="/assets/lifecycle-3-mobile.webp"
                alt="Illustration of Step 3: Discover"
                width="200px"
                height="200px"
                className="w-[200px] lg:w-[220px] my-4"
              />
            </picture>
            {/* <img
              className="w-[200px] lg:w-[220px] my-4"
              src="/assets/lifecycle-3.webp"
              width={220}
              alt="Illustration of Step 1: Discover"
            /> */}

            <span className="w-fit text-xs font-medium rounded-md py-1 px-2 text-[#333333] border border-[#333333] sm:text-md">
              Step 3
            </span>

            <h3 className="text-[#01438D] my-2 font-semibold sm:text-lg">
              Monitor Your Brand
            </h3>

            <p className="text-[#666666] text-xs sm:text-sm">
              See how your brand is mentioned across top outlets. Track
              sentiment, trends, and get alerts that help you stay ahead.
            </p>
          </div>

          <div className="py-4 px-3 rounded-lg w-full">
            <picture className="w-[200px] lg:w-[200px] my-4">
              <source
                media="(min-width: 1023px)"
                srcSet="/assets/lifecycle-4.webp"
              />
              <source
                media="(min-width: 768px)"
                srcSet="/assets/lifecycle-4-mobile.webp"
              />
              <img
                src="/assets/lifecycle-4-mobile.webp"
                alt="Illustration of Step 4: Discover"
                width="200px"
                height="200px"
                className="w-[200px] lg:w-[200px] my-4"
              />
            </picture>
            {/* <img
              className="w-[200px] lg:w-[200px] my-4"
              src="/assets/lifecycle-4.webp"
              width={200}
              alt="Illustration of Step 1: Discover"
            /> */}

            <span className="w-fit text-xs font-medium rounded-md py-1 px-2 text-[#333333] border border-[#333333] sm:text-md">
              Step 4
            </span>

            <h3 className="text-[#01438D] my-2 font-semibold sm:text-lg">
              Track PR ROI
            </h3>

            <p className="text-[#666666] text-xs sm:text-sm">
              Measure PR impact with reach, share of voice, and campaign
              performance — all backed by clear, actionable analytics.
            </p>
          </div>
        </section>
      </div>
    </section>
  );
};

export default CommunicationLifecycle;
