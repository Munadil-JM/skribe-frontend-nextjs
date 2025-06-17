const Hero = () => {
  return (
    <div className="bg-[#EDF5FF] overflow-hidden">
      <section className="container mx-auto flex flex-col items-center gap-10 h-[350px] sm:h-[450px] lg:h-[360px] lg:pl-20 pt-10 lg:flex-row">
        <article className="flex flex-col gap-4 px-8">
          <h1 className="font-[700] text-[#002B5B] text-center text-2xl sm:text-5xl lg:text-start lg:w-[516px]">
            Top Real Estate Delhi
          </h1>

          <p className="text-[#002B5BB2] text-xs text-center sm:text-xl lg:text-start lg:w-[579px]">
            Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
            Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
          </p>
        </article>

        <img
          className="sm:w-[600px] sm:h-[400px] lg:w-[737px] lg:h-[520px] relative left-14 sm:left-28 lg:left-0 lg:top-20"
          src="/assets/pro-journalist-list.png"
          alt="Pro Journalists List dashboard"
        />
      </section>
    </div>
  );
};

export default Hero;
