import Discover from "@/components/BeforeLoginPages/DC/Discover";

export const metadata = {
  title: "India's Leading Media Database & PR Outreach Platform | Skribe",
  description:
    "Discover 40,000+ verified journalists, personalize your media pitches, and automate outreach — all with Skribe's all-in-one platform built for modern PR teams.",
  alternates: {
    canonical: "https://app.goskribe.com/discover",
  },
  openGraph: {
    title: "India's Leading Media Database & PR Outreach Platform | Skribe",
    description:
      "Discover 40,000+ verified journalists, personalize your media pitches, and automate outreach — all with Skribe's all-in-one platform built for modern PR teams.",
    url: "https://app.goskribe.com/discover",
    siteName: "Skribe",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "India's Leading Media Database & PR Outreach Platform | Skribe",
    description:
      "Discover 40,000+ verified journalists, personalize your media pitches, and automate outreach — all with Skribe's all-in-one platform built for modern PR teams.",
    creator: "@goskribe",
  },
};

export default function DiscoverPage() {
  return <Discover />;
}
