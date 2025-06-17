"use client";

import Navbar from "../Navbar";
import Hero from "./Hero";
import TrustedBy from "../HomePage/TrustedBy";
import List from "./List";
import ChooseSkribe from "../HomePage/ChooseSkribe";
import Testimonial from "../HomePage/Testimonial";
import FAQs from "../HomePage/FAQs";
import Footer from "../Footer";
import useMetadata from "../custom-hooks/useMetadata";

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "PR Case Studies: Campaign Success Stories with Skribe",
    url: "https://app.goskribe.com/case-studies",
    description:
      "Explore real-world PR case studies showing how Skribe helped brands drive visibility, media engagement, and journalist outreach success.",
    inLanguage: "en",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Skribe?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Skribe is India's leading AI-powered media intelligence platform. Monitor your brand, automate PR workflows, and get real-time journalist insights with Skribe",
        },
      },
      {
        "@type": "Question",
        name: "Is Skribe suitable for agencies?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Skribe is built with agencies in mind. Whether you're a PR, communications, or media agency, Skribe helps you discover journalists, track media movements, send targeted press releases, and measure campaign impact—all in one platform. Our powerful filters and regional reach make it easy to find the right media contacts for every client and story.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer a free trial?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Skribe offers a 30-day free trial with full access to all core features. No credit card is required to get started—just sign up and explore how Skribe can simplify your media outreach.",
        },
      },
    ],
  },
];

const CaseStudies = () => {
  useMetadata(schema);

  return (
    <main className="font-inter">
      <Navbar />
      <Hero />
      <TrustedBy />
      <List />
      <ChooseSkribe />
      <Testimonial />
      <FAQs />
      <Footer />
    </main>
  );
};

export default CaseStudies;
