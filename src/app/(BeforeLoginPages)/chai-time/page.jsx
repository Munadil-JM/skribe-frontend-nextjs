import ChaiTime from "@/components/BeforeLoginPages/ChaiTime/ChaiTime";

export const metadata = {
  title: "Daily PR & Media Updates Over Chai | Skribe Chai Time",
  description:
    "Start your day with curated journalist movements and media trends from top outlets like TOI and The Hindu. Skribe's Chai Time brings PR updates to your inbox.",
  alternates: {
    canonical: "https://app.goskribe.com/chai-time",
  },
  openGraph: {
    title: "Daily PR & Media Updates Over Chai | Skribe Chai Time",
    description:
      "Start your day with curated journalist movements and media trends from top outlets like TOI and The Hindu. Skribe's Chai Time brings PR updates to your inbox.",
    url: "https://app.goskribe.com/chai-time",
    siteName: "Skribe",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily PR & Media Updates Over Chai | Skribe Chai Time",
    description:
      "Start your day with curated journalist movements and media trends from top outlets like TOI and The Hindu. Skribe's Chai Time brings PR updates to your inbox.",
    creator: "@goskribe",
  },
};

export default function ChaiTimePage() {
  return <ChaiTime />;
}
