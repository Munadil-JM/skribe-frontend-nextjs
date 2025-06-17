import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Link from "next/link";

import "swiper/css";
import "swiper/css/pagination";

const members = [
  {
    id: 1,
    role: "Sandeep Kalsi- CEO",
    description:
      "Accomplished entrepreneur and communicator with global expertise, leading start-ups to IPOs. Every top executive of every big PR agency in India knows Sandeep personally. Proven track record across Europe, India, South Africa, and Singapore over 35+ years.",
    linkedinUrl: "https://www.linkedin.com/in/sandeepsinghkalsi/",
    imageSrc: "/assets/about-us-sandeep.webp",
  },
  {
    id: 2,
    role: "Rahul Bir Singh- COO",
    description:
      "Extensive experience in the Indian start-up ecosystem with leadership stints at Dineout, Classplus, and Paytm, driving product development, growth, and innovation in tech businesses. Rahul is an alumni of the Indian School of Business",
    linkedinUrl: "https://www.linkedin.com/in/rahul-bir-singh/",
    imageSrc: "/assets/about-us-rahul.webp",
  },
  {
    id: 3,
    role: "Megha Khanna- Chief of Staff",
    description:
      "With 15+ years as an ops leader at global firms like S&P, Megha drives strategy, streamlines processes, and unites leadership. With deep insight into business and team dynamics, she advises the executive team to ensure priorities are met and opportunities maximized. IIM-K alum.",
    linkedinUrl: "https://www.linkedin.com/in/megha-khanna-b1b808217/",
    imageSrc: "/assets/about-us-megha.webp",
  },
  {
    id: 4,
    role: "Vimal- Head of Growth",
    description:
      "Vimal ensures the success and satisfaction of Skribe’s clients. A career Skriber, he’s led ops, sales, and customer success before heading growth. Known across India’s agency space as Skribe’s ever-smiling yet persistent face, he holds a business degree and an MBA.",
    linkedinUrl: "https://www.linkedin.com/in/vimal-kumar-477012b2/",
    imageSrc: "/assets/about-us-vimal.webp",
  },
];

const OurTeam = () => {
  return (
    <section className="container mx-auto flex flex-col gap-5 items-center justify-center px-5 sm:gap-10 lg:px-10 py-10 lg:py-14">
      <h2 className="text-2xl text-[#333333] font-bold sm:text-3xl xl:text-4xl">
        Our Team
      </h2>

      <Swiper
        className="w-full !pb-12 !pt-5 !px-5 custom-swiper-pagination"
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={40}
        breakpoints={{
          0: { slidesPerView: 1 },
          720: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {members?.length > 0 &&
          members?.map((member) => {
            return (
              <SwiperSlide key={member.id} className="!h-auto flex">
                <article
                  key={member.id}
                  className="bg-[#F1F1E6] flex flex-col h-full w-fit rounded-xl border border-[#0000004D]"
                >
                  <div className="p-4 flex flex-col gap-1 sm:gap-2 flex-grow">
                    <img
                      src={member.imageSrc}
                      alt={member.role}
                      className="w-[90px] h-[90px] self-center rounded-full"
                      // className="rounded-t-xl w-full h-[150px] sm:h-[180px] xl:w-[350px] lg:h-[230px]"
                    />
                    <p className="text-[#3E3E59] text-xs sm:text-lg font-semibold text-center">
                      {member.role}
                    </p>

                    <p className="text-[#5F6980] text-xs sm:text-sm xl:w-[310px] text-center">
                      {member.description}
                    </p>

                    <Link
                      className="mt-auto self-center"
                      href={member.linkedinUrl}
                      target="_blank"
                    >
                      <img
                        src="/assets/linkedin.png"
                        alt="Facebook icon"
                        className="w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]"
                      />
                    </Link>
                  </div>
                </article>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </section>
  );
};

export default OurTeam;
