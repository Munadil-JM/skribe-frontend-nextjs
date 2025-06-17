import TrustedBy from "./TrustedBy";

const Dummy = () => {
  return (
    <section className="overflow-hidden flex flex-col gap-10 items-center pt-12 px-6 sm:gap-20 sm:pt-20 sm:px-20">
      <div className="container mx-auto">
        <section className="flex flex-col items-center gap-2">
          <h2 className="text-[#4A4A4A] font-bold text-2xl text-center sm:text-2xl">
            Augmented Intelligence
          </h2>

          <p className="text-sm text-[#333333] text-center sm:text-lg">
            We analyse connections between brands, people, and products to help
            teams identify key concepts, sentiments, and relationships.
          </p>
        </section>

        <div className="flex flex-col items-center">
          <picture className="lg:max-w-[80%]">
            <source
              media="(min-width: 1023px)"
              srcSet="/assets/home-research.webp"
            />
            <source
              media="(min-width: 768px)"
              srcSet="/assets/home-research-mobile.webp"
            />
            <img
              src="/assets/home-research-mobile.webp"
              alt="Faq"
              width="100%"
            />
          </picture>

          <TrustedBy />
        </div>
      </div>
    </section>
  );
};

export default Dummy;
