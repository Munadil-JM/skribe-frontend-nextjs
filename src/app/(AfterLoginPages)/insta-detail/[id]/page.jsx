import InstagramDetail from "@/components/Social/Instagram/InstagramDetail";

export default async function InstagramDetailPage({ params }) {
  const { id } = await params;

  return <InstagramDetail id={id} />;
}
