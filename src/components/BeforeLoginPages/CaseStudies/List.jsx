import { HiMiniArrowUpRight } from "react-icons/hi2";

const List = () => {
  return (
    <section className="container mx-auto flex flex-col gap-4 px-5 pt-5 pb-10 sm:gap-8 lg:px-10 lg:py-20">
      <article>
        <div className="flex items-center justify-center sm:justify-between mb-1 sm:mb-3">
          <h2 className="text-2xl text-center font-bold sm:text-start sm:text-2xl text-gray-700">
            List of Case Studies
          </h2>

          <button
            className="hidden sm:block cursor-pointer underline decoration-dotted font-semibold"
            type="button"
          >
            See more
          </button>
        </div>

        <p className="text-gray-700 max-w-4xl text-xs text-center sm:text-sm sm:text-start">
          Skribe helps PR teams and marketers across industries improve pitch
          accuracy, media engagement, and campaign results. Read their stories
          below.
        </p>
      </article>

      <ul className="grid grid-cols-2 sm:grid-cols-3 justify-items-center sm:justify-items-start gap-3 sm:gap-6 lg:gap-10">
        {Array.from({ length: 6 }, (_, i) => {
          return (
            <li key={i}>
              <article className="rounded-xl shadow-[5px_5px_20px_rgba(0,0,0,0.15)] w-fit bg-[#F1F1E6]">
                <div className="min-w-[120px] min-h-[80px] sm:w-[190px] md:w-[230px] sm:h-[150px] lg:w-[300px] lg:h-[180px] xl:w-[370px] xl:h-[200px] rounded-t-xl bg-[#B7B7B7]"></div>

                <div className="flex items-center justify-between p-2 lg:p-3 gap-8 sm:gap-4">
                  <div>
                    <p className="text-[#01438D] text-[10px] sm:text-xs font-bold">
                      CLICK HERE TO VIEW
                    </p>

                    <h3 className="text-[#002B5B] text-xs sm:text-base lg:text-lg font-bold">
                      CASE STUDY 1
                    </h3>
                  </div>

                  <HiMiniArrowUpRight size={20} className="text-[#002B5B]" />
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      <button
        className="text-xs sm:hidden underline decoration-dotted font-semibold cursor-pointer"
        type="button"
      >
        See more
      </button>
    </section>
  );
};

export default List;
