import JP from "@/components/JP/JP";

export default async function JPPage({ params }) {
  const { journalistId } = await params;
  return <JP id={journalistId} />;
}
