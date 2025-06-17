import JournalistByProducers from "@/components/MediaTypes/OutletCategory/JournalistByProducers";

export default async function JournalistByProducersPage({ params }) {
  const { slug } = await params;
  const [outletId, id, name] = slug;

  return (
    <JournalistByProducers
      outletId={outletId}
      id={id}
      name={decodeURIComponent(name)}
    />
  );
}
