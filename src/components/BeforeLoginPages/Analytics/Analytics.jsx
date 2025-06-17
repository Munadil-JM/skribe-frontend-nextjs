"use client";

import Navbar from "../Navbar";
import Hero from "./Hero";
import TrustedBy from "../HomePage/TrustedBy";
import TrendingReports from "./TrendingReports";
import ShareOfVoice from "./ShareOfVoice";
import SentimentAnalysis from "./SentimentAnalysis";
import CustomerReports from "./CustomerReports";
import MetricsTracked from "./MetricsTracked";
import ChooseSkribe from "../HomePage/ChooseSkribe";
import Testimonial from "../HomePage/Testimonial";
import FAQs from "../HomePage/FAQs";
import Footer from "../Footer";
import useMetadata from "../custom-hooks/useMetadata";

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "PR & Media Analytics Dashboard for Insights | Skribe",
    url: "https://app.goskribe.com/analytics",
    description:
      "Measure campaign impact with Skribe's PR analytics platform. Track brand mentions, sentiment, share of voice, and generate custom reports in real-time.",
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

const Analytics = () => {
  useMetadata(schema);

  return (
    <main className="font-inter">
      <Navbar />
      <Hero />
      <TrustedBy />
      <TrendingReports />
      <ShareOfVoice />
      <SentimentAnalysis />
      <CustomerReports />
      <MetricsTracked />
      <ChooseSkribe />
      <Testimonial />
      <FAQs />
      <Footer />
    </main>
  );
};

export default Analytics;
