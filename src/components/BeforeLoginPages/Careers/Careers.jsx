"use client";

import Navbar from "../Navbar";
import Hero from "./Hero";
import TrustedBy from "../HomePage/TrustedBy";
import Positions from "./Positions";
import ChooseSkribe from "../HomePage/ChooseSkribe";
import Testimonial from "../HomePage/Testimonial";
import FAQs from "../HomePage/FAQs";
import Footer from "../Footer";

const Careers = () => {
  return (
    <main className="font-inter">
      <Navbar />
      <Hero />
      <TrustedBy />
      <Positions />
      <ChooseSkribe />
      <Testimonial />
      <FAQs />
      <Footer />
    </main>
  );
};

export default Careers;
