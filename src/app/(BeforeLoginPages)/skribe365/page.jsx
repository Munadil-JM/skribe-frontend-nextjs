import Skribe365 from "@/components/BeforeLoginPages/Skribe365/Skribe365";

export const metadata = {
  title: "Weekly Journalist Updates & Beat Tracking Tool | Skribe 365",
  description:
    "Stay updated with journalist moves and beat changes every Monday. Skribe 365 tracks over 50+ beats and delivers industry updates straight to your inbox.",
  alternates: {
    canonical: "https://app.goskribe.com/skribe365",
  },
  openGraph: {
    title: "Weekly Journalist Updates & Beat Tracking Tool | Skribe 365",
    description:
      "Stay updated with journalist moves and beat changes every Monday. Skribe 365 tracks over 50+ beats and delivers industry updates straight to your inbox.",
    url: "https://app.goskribe.com/skribe365",
    siteName: "Skribe",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weekly Journalist Updates & Beat Tracking Tool | Skribe 365",
    description:
      "Stay updated with journalist moves and beat changes every Monday. Skribe 365 tracks over 50+ beats and delivers industry updates straight to your inbox.",
    creator: "@goskribe",
  },
};

export default function Skribe365Page() {
  return <Skribe365 />;
}
