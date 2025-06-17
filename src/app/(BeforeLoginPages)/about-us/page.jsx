import AboutUs from "@/components/BeforeLoginPages/AboutUs/AboutUs";

export const metadata = {
  title: "About Skribe - India's Leading Media Intelligence Platform",
  description:
    "Learn about Skribe's journey, team, and vision. Discover how we empower PR professionals across India with real-time journalist insights.",
  alternates: {
    canonical: "https://app.goskribe.com/about-us",
  },
  openGraph: {
    title: "About Skribe - India's Leading Media Intelligence Platform",
    description:
      "Learn about Skribe's journey, team, and vision. Discover how we empower PR professionals across India with real-time journalist insights.",
    url: "https://app.goskribe.com/about-us",
    siteName: "Skribe",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Skribe - India's Leading Media Intelligence Platform",
    description:
      "Learn about Skribe's journey, team, and vision. Discover how we empower PR professionals across India with real-time journalist insights.",
    creator: "@goskribe",
  },
};

export default function AboutUsPage() {
  return <AboutUs />;
}
