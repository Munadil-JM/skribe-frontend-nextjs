import ResetPassword from "@/components/BeforeLoginPages/Auth/ResetPassword";
import { Suspense } from "react";
import Loader from "@/components/Loader/Loader";

export const metadata = {
  title: "Reset Your Skribe Password - Secure Account Recovery",
  description:
    "Forgot your Skribe password? Quickly reset it and regain access to your PR intelligence tools and journalist data dashboard.",
  alternates: {
    canonical: "https://app.goskribe.com/reset-password",
  },
  openGraph: {
    title: "Reset Your Skribe Password - Secure Account Recovery",
    description:
      "Forgot your Skribe password? Quickly reset it and regain access to your PR intelligence tools and journalist data dashboard.",
    url: "https://app.goskribe.com/reset-password",
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<Loader />}>
      <ResetPassword />
    </Suspense>
  );
}
