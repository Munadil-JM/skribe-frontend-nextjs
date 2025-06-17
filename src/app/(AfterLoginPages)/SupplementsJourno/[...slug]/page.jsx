import SupplementJournalist from "@/components/MediaTypes/OutletCategory/SupplementJournalist";

export default async function SupplementJournalistPage({ params }) {
  const { slug } = await params;
  const [suppId, id, name, supplementName] = slug;

  return (
    <SupplementJournalist
      suppId={suppId}
      id={id}
      name={decodeURIComponent(name)}
      supplementName={decodeURIComponent(supplementName)}
    />
  );
}
