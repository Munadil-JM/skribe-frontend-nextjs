const TopMovements = () => {
  return (
    <section className="container mx-auto flex flex-col-reverse items-center justify-center px-5 gap-6 lg:gap-14 xl:gap-5 lg:pb-10 sm:px-10 lg:px-20 lg:flex-row">
      <img
        className="w-[350px] sm:w-[450px] lg:w-[530px] xl:w-[663px] relative xl:-left-8 lg:top-16"
        src="/assets/chai-time-movements.webp"
        alt="Illustration of a journalist moving from The Times of India to The Hindu, highlighting real-time media movement alerts."
      />

      <article className="flex flex-col items-center lg:items-start">
        <h2 className="text-center lg:text-start text-2xl font-bold text-balance text-[#4A4A4A] sm:text-2xl">
          Top Movements
        </h2>

        <p className="text-center break-words whitespace-normal text-[#868686] sm:text-md lg:w-[400px] xl:w-[480px] lg:text-start">
          Chai Time highlights key journalist shifts, new job roles, and beat
          realignments from national and regional media — before your
          competitors even know.
        </p>
      </article>
    </section>
  );
};

export default TopMovements;
