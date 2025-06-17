import Projournalist from "@/components/BeforeLoginPages/ProJournalistList/ProJournalistList";

export const metadata = {
  title: "Top Journalist Lists by Beat & City in India | Skribe",
  description:
    "Browse verified journalist lists by topic and location. Find top reporters covering real estate, tech, finance, and more across India.",
  alternates: {
    canonical: "https://app.goskribe.com/projournalist-list",
  },
  openGraph: {
    title: "Top Journalist Lists by Beat & City in India | Skribe",
    description:
      "Browse verified journalist lists by topic and location. Find top reporters covering real estate, tech, finance, and more across India.",
    url: "https://app.goskribe.com/projournalist-list",
    siteName: "Skribe",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Journalist Lists by Beat & City in India | Skribe",
    description:
      "Browse verified journalist lists by topic and location. Find top reporters covering real estate, tech, finance, and more across India.",
    creator: "@goskribe",
  },
};

export default function ProJournalistPage() {
  return <Projournalist />;
}
