const AccordionCard = ({ heading, description, isOpen, handler }) => {
  return (
    <article className="flex flex-col justify-between px-3 py-2 rounded-xl bg-white sm:px-6 w-full xl:w-[613px]">
      <div
        className="flex justify-between items-center gap-4 cursor-pointer"
        onClick={handler}
        role="button"
        tabIndex={0}
      >
        <h3 className="text-[#333333] font-[600] sm:font-medium text-sm sm:text-xl lg:text-lg">
          {heading}
        </h3>

        <span className="text-2xl sm:text-4xl">{isOpen ? "-" : "+"}</span>
      </div>

      {isOpen && (
        <p className="text-[#333333] text-balance text-sm sm:text-base">
          {description}
        </p>
      )}
    </article>
  );
};

export default AccordionCard;
