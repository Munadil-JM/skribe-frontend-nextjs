import Login from "@/components/BeforeLoginPages/Auth/Login";

export const metadata = {
  title: "Login to Skribe - Access Your Media Intelligence Dashboard",
  description:
    "Securely log in to your Skribe account. Access journalist databases, media monitoring, analytics, and more.",
  alternates: {
    canonical: "https://app.goskribe.com/login",
  },
  openGraph: {
    title: "Login to Skribe - Access Your Media Intelligence Dashboard",
    description:
      "Securely log in to your Skribe account. Access journalist databases, media monitoring, analytics, and more.",
    url: "https://app.goskribe.com/login",
    siteName: "Skribe",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Login to Skribe - Access Your Media Intelligence Dashboard",
    description:
      "Securely log in to your Skribe account. Access journalist databases, media monitoring, analytics, and more.",
    creator: "@goskribe",
  },
};

export default async function LoginWithParamsPage({ params }) {
  const { slug } = await params;
  const [listName, id, regional] = slug;

  return <Login listName={listName} id={id} regional={regional} />;
}
