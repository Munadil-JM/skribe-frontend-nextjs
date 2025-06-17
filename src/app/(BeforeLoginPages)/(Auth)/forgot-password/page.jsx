import ForgotPassword from "@/components/BeforeLoginPages/Auth/ForgotPassword";

export const metadata = {
  title: "Reset Your Skribe Password - Secure Account Recovery",
  description:
    "Forgot your Skribe password? Quickly reset it and regain access to your PR intelligence tools and journalist data dashboard.",
  alternates: {
    canonical: "https://app.goskribe.com/forgot-password",
  },
  openGraph: {
    title: "Reset Your Skribe Password - Secure Account Recovery",
    description:
      "Forgot your Skribe password? Quickly reset it and regain access to your PR intelligence tools and journalist data dashboard.",
    url: "https://app.goskribe.com/forgot-password",
    siteName: "Skribe",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reset Your Skribe Password - Secure Account Recovery",
    description:
      "Forgot your Skribe password? Quickly reset it and regain access to your PR intelligence tools and journalist data dashboard.",
    creator: "@goskribe",
  },
};

export default function ForgotPasswordPage() {
  return <ForgotPassword />;
}
