import Signup from "@/components/BeforeLoginPages/Auth/SignUp";

export const metadata = {
  title: "Create Your Skribe Account - Start Your Free Trial Today",
  description:
    "Sign up for Skribe and discover a smarter way to connect with journalists, monitor media, and analyze PR success. Start with a free trial.",
  alternates: {
    canonical: "https://app.goskribe.com/signup",
  },
  openGraph: {
    title: "Create Your Skribe Account - Start Your Free Trial Today",
    description:
      "Sign up for Skribe and discover a smarter way to connect with journalists, monitor media, and analyze PR success. Start with a free trial.",
    url: "https://app.goskribe.com/signup",
    siteName: "Skribe",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Your Skribe Account - Start Your Free Trial Today",
    description:
      "Sign up for Skribe and discover a smarter way to connect with journalists, monitor media, and analyze PR success. Start with a free trial.",
    creator: "@goskribe",
  },
};

export default async function SignupWithParamsPage({ params }) {
  const { id } = await params;

  return <Signup id={id} />;
}
