import Monitoring from "@/components/BeforeLoginPages/Monitoring/Monitoring";

export const metadata = {
  title: "Real-Time Media Monitoring for PR Teams | Skribe",
  description:
    "Track your brand's mentions across 10K+ digital, print, and broadcast outlets. Skribe's real-time media monitoring helps PR teams stay ahead of every headline.",
  alternates: {
    canonical: "https://app.goskribe.com/monitoring",
  },
  openGraph: {
    title: "Real-Time Media Monitoring for PR Teams | Skribe",
    description:
      "Track your brand's mentions across 10K+ digital, print, and broadcast outlets. Skribe's real-time media monitoring helps PR teams stay ahead of every headline.",
    url: "https://app.goskribe.com/monitoring",
    siteName: "Skribe",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Real-Time Media Monitoring for PR Teams | Skribe",
    description:
      "Track your brand's mentions across 10K+ digital, print, and broadcast outlets. Skribe's real-time media monitoring helps PR teams stay ahead of every headline.",
    creator: "@goskribe",
  },
};

export default function MonitoringPage() {
  return <Monitoring />;
}
