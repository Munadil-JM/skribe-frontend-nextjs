import Analytics from "@/components/BeforeLoginPages/Analytics/Analytics";

export const metadata = {
  title: "PR & Media Analytics Dashboard for Insights | Skribe",
  description:
    "Measure campaign impact with Skribe's PR analytics platform. Track brand mentions, sentiment, share of voice, and generate custom reports in real-time.",
  alternates: {
    canonical: "https://app.goskribe.com/analytics",
  },
  openGraph: {
    title: "PR & Media Analytics Dashboard for Insights | Skribe",
    description:
      "Measure campaign impact with Skribe's PR analytics platform. Track brand mentions, sentiment, share of voice, and generate custom reports in real-time.",
    url: "https://app.goskribe.com/analytics",
    siteName: "Skribe",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PR & Media Analytics Dashboard for Insights | Skribe",
    description:
      "Measure campaign impact with Skribe's PR analytics platform. Track brand mentions, sentiment, share of voice, and generate custom reports in real-time.",
    creator: "@goskribe",
  },
};

export default function AnalyticsPage() {
  return <Analytics />;
}
