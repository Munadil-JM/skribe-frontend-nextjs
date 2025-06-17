import Careers from "@/components/BeforeLoginPages/Careers/Careers";

export const metadata = {
  title: "Careers at Skribe - Join India's Leading Media Intelligence Team",
  description:
    "Explore exciting career opportunities at Skribe. Join our team and help shape the future of PR and media intelligence in India.",
  alternates: {
    canonical: "https://app.goskribe.com/careers",
  },
  openGraph: {
    title: "Careers at Skribe - Join India's Leading Media Intelligence Team",
    description:
      "Explore exciting career opportunities at Skribe. Join our team and help shape the future of PR and media intelligence in India.",
    url: "https://app.goskribe.com/careers",
    siteName: "Skribe",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at Skribe - Join India's Leading Media Intelligence Team",
    description:
      "Explore exciting career opportunities at Skribe. Join our team and help shape the future of PR and media intelligence in India.",
    creator: "@goskribe",
  },
};

export default function CareersPage() {
  return <Careers />;
}
