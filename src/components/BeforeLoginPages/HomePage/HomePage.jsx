"use client";

import Navbar from "../Navbar";
import Hero from "./Hero";
import AugmentedIntelligence from "./AugmentedIntelligence";
import UnderstandSkribe from "./UnderstandSkribe";
import CommunicationLifecycle from "./CommunicationLifecycle";
import ChooseSkribe from "./ChooseSkribe";
import Testimonial from "./Testimonial";
import FAQs from "./FAQs";
import Footer from "../Footer";
import useMetadata from "../custom-hooks/useMetadata";

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Skribe",
    url: "https://www.goskribe.com",
    logo: "https://www.goskribe.com/logo.png",
    description:
      "Monitor your brand, automate PR workflows, and get real-time journalist insights with Skribe. India's #1 AI-powered media intelligence platform.",
    sameAs: [
      "https://twitter.com/goskribe",
      "https://www.linkedin.com/company/skribe/",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Skribe",
    url: "https://www.goskribe.com",
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

const HomePage = () => {
  useMetadata(schema);

  return (
    <main className="font-inter bg-[#f5f5f5]">
      <Navbar />
      <Hero />
      <AugmentedIntelligence />
      <UnderstandSkribe />
      <CommunicationLifecycle />
      <ChooseSkribe />
      <Testimonial />
      <FAQs />
      <Footer />
    </main>
  );
};

export default HomePage;
