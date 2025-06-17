import Navbar from "../Navbar";
import Hero from "./Hero";
import Plans from "./Plans";
import ChooseSkribe from "../HomePage/ChooseSkribe";
import Testimonial from "../HomePage/Testimonial";
import FAQs from "../HomePage/FAQs";
import Footer from "../Footer";

const Pricing = () => {
  return (
    <main className="font-inter">
      <Navbar />
      <Hero />
      <Plans />
      <ChooseSkribe />
      <Testimonial />
      <FAQs />
      <Footer />
    </main>
  );
};

export default Pricing;
