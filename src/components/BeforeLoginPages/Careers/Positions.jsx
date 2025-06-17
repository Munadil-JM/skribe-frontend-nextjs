import { Pagination } from "swiper/modules";
import { HiArrowUpRight } from "react-icons/hi2";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

const Positions = () => {
  const positions = [
    {
      id: 1,
      title: "Research Analyst",
      description:
        "Track journalist movements and maintain media databases. Ideal for detail-oriented professionals with a passion for media trends.",
      image: "/assets/positions-search-icon.png",
    },
    {
      id: 2,
      title: "HR Intern",
      description:
        "Assist with recruitment, onboarding, and employee engagement activities. A great opportunity to gain hands-on experience in HR operations at a fast-growing media tech startup.",
      image: "/assets/positions-pen-icon.png",
    },
    {
      id: 3,
      title: "Developer",
      description:
        "Build and scale Skribe's tech infrastructure. Work with React, Node.js, and AI integrations.",
      image: "/assets/positions-code-icon.png",
    },
    {
      id: 4,
      title: "Research Analyst",
      description:
        "Track journalist movements and maintain media databases. Ideal for detail-oriented professionals with a passion for media trends.",
      image: "/assets/positions-search-icon.png",
    },
    {
      id: 5,
      title: "HR Intern",
      description:
        "Assist with recruitment, onboarding, and employee engagement activities. A great opportunity to gain hands-on experience in HR operations at a fast-growing media tech startup.",
      image: "/assets/positions-pen-icon.png",
    },
    {
      id: 6,
      title: "Developer",
      description:
        "Build and scale Skribe's tech infrastructure. Work with React, Node.js, and AI integrations.",
      image: "/assets/positions-code-icon.png",
    },
  ];

  return (
    <section className="container mx-auto py-5 px-5 lg:py-10 lg:px-10">
      <h2 className="text-xl font-bold mb-1 px-5 text-center lg:text-start sm:text-2xl">
        Open positions
      </h2>

      <p
        className={`${positions.length > 0 ? "block" : "hidden"} text-[#666666] text-xs text-center lg:text-start lg:text-sm px-5`}
      >
        We're building a smarter PR future — and we're hiring. Explore open
        roles in research, design, development, and social media. Let's grow
        together.
      </p>

      {positions.length > 0 ? (
        <Swiper
          className="w-full !pb-12 !pt-5 !px-5 lg:!pt-10 custom-swiper-pagination"
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={40}
          breakpoints={{
            0: { slidesPerView: 1 },
            720: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1580: { slidesPerView: 5 },
          }}
        >
          {positions.map((position) => {
            return (
              <SwiperSlide key={position.id} className="!h-auto flex">
                <article className="h-full flex flex-col gap-5 lg:gap-10 rounded-lg p-5 lg:p-8 items-center shadow-[5px_5px_20px_rgba(0,0,0,0.15)]">
                  <h3 className="text-xl text-center font-bold lg:text-xl">
                    {position.title}
                  </h3>

                  <img
                    src={position.image}
                    alt={`${position.name}'s icon`}
                    className="w-[50px] sm:w-[120px]"
                  />

                  <p className="text-[#333333] text-xs sm:text-sm text-center">
                    {position.description}
                  </p>

                  <button
                    className="flex w-full cursor-pointer items-center gap-3 mt-auto justify-center bg-[#002B5B] text-white text-xs sm:text-lg rounded-lg p-2 lg:p-3"
                    type="button"
                  >
                    Apply now <HiArrowUpRight />
                  </button>
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <article className="flex flex-col lg:flex-row items-center">
          <img
            width={300}
            className="left-9 lg:left-0 relative"
            src="/assets/careers-not-hiring.webp"
            alt="Careers - We are not Hiring banner"
          />

          <div>
            <h3 className="font-semibold text-center lg:text-start text-xl">
              We're not hiring right now — but we'd love to hear from you.
            </h3>

            <p className="text-[#666666] text-center lg:text-start mt-2">
              While we don't have any open roles at the moment, we're always on
              the lookout for passionate, talented people. If you're excited
              about what we do and think you'd be a great fit, feel free to
              reach out or check back soon. Our team is growing, and new
              opportunities are just around the corner.
            </p>
          </div>
        </article>
      )}
    </section>
  );
};

export default Positions;
