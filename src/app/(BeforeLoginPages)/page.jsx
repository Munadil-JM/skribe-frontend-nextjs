import HomePage from "@/components/BeforeLoginPages/HomePage/HomePage";

export const metadata = {
  title: "Skribe | Real-Time Media Intelligence & PR Automation Platform",
  description:
    "Monitor your brand, automate PR workflows, and get real-time journalist insights with Skribe. India's #1 AI-powered media intelligence platform.",
  alternates: {
    canonical: "https://app.goskribe.com/",
  },
  openGraph: {
    title: "Skribe | Real-Time Media Intelligence & PR Automation Platform",
    description:
      "Monitor your brand, automate PR workflows, and get real-time journalist insights with Skribe. India's #1 AI-powered media intelligence platform.",
    url: "https://app.goskribe.com/",
    siteName: "Skribe",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skribe | Real-Time Media Intelligence & PR Automation Platform",
    description:
      "Monitor your brand, automate PR workflows, and get real-time journalist insights with Skribe. India's #1 AI-powered media intelligence platform.",
    creator: "@goskribe",
  },
};

export default function Home() {
  return <HomePage />;
}
