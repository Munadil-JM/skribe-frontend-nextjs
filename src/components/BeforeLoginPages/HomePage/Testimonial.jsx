"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      image: "/assets/Hewlett_Packard_Enterprise-Logo.webp",
      name: "Diksha Verma",
      company: "HPE",
      rating: 4.5,
      testimonial:
        "Skribe was chosen as it serves as a one-stop destination for staying updated on media movements, making it a valuable resource. Skribe’s subscription has significantly benefited oue in-house team by allowing them to focus more effectively on their main KPIs and deliverables. We would absolutely recommend Skribe to others, particularly for its usefulness in accessing media lists and journalist contacts.",
    },
    {
      id: 2,
      image: "/assets/dummy-logo.jpg",
      name: "Anonymous",
      company: "Large Indian AMC",
      rating: 4.5,
      testimonial:
        "Skribe has been an indispensable tool in our communications strategy for the past five years. The ease of access to journalist contacts, especially, as it is updated regularly, in itself should be a reason enough for PR/ Comms professionals to subscribe to the Skribe platform. However, Skribe does much more, it helped me with seamless press release dissemination and the online news track tracking provided by its dedicated team is truly exceptional. Would surely recommend it to everyone working with journalists regularly - Skribe is a must-have tool!",
    },
    {
      id: 3,
      image: "/assets/Revolut1.webp",
      name: "Prema Dutta",
      company: "Revolut",
      rating: 4.5,
      testimonial:
        "The GoSkribe platform acts as a force multiplier for our news monitoring efforts, offering additional eyes on developments in the country. Their extensive media database is also an invaluable resource, ensuring we stay informed and equipped with timely, strategic insights.",
    },
  ];

  return (
    <section className="mx-auto container flex flex-col gap-4 items-center px-3 pb-10 lg:px-0 pt-5 sm:pb-10">
      <span className="text-[#FF7A00] font-medium text-sm sm:text-base">
        TESTIMONIAL
      </span>

      <h2 className="font-bold text-2xl sm:w-[377px] text-center sm:text-balance sm:text-2xl">
        See What Our Clients Say About Us
      </h2>

      <p className="text-[#666666] text-sm text-center sm:text-md">
        We take step wise for platform. We helping to client with our talented
        expert.
      </p>

      <Swiper
        className="!pb-16 w-full !px-4 !pt-4 custom-swiper-pagination"
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={40}
        breakpoints={{
          0: { slidesPerView: 1 },
          720: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((testimonial) => {
          return (
            <SwiperSlide key={testimonial.id} className="!h-auto flex">
              <article className="flex flex-col items-center bg-[#01438D] h-full text-center text-white rounded-lg p-10">
                <img
                  className="mb-1 rounded-full w-[60px] h-[60px] bg-white object-contain"
                  src={testimonial.image}
                  width="60"
                  height="60"
                  alt={`${testimonial.name}'s Profile Picture`}
                />

                <h3 className="font-semibold text-md">{testimonial.name}</h3>

                <p className="text-md mt-2">{testimonial.company}</p>

                <div className="flex items-center gap-1">
                  <img
                    src="/assets/star.png"
                    alt="Star icon"
                    width="20"
                    height="20"
                  />
                  <span className="font-bold">{testimonial.rating}</span>
                </div>

                {/* <img
                  className="my-3"
                  src="/assets/quote.png"
                  alt="Quote icon"
                /> */}

                <p className="mt-4 text-sm">{`"${testimonial.testimonial.substring(0, 300)}...."`}</p>
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Testimonial;
