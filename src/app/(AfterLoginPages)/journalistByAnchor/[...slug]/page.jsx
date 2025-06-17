import JournalistByAnchor from "@/components/MediaTypes/OutletCategory/JournalistByAnchor";

export default async function JournalistByAnchorPage({ params }) {
  const { slug } = await params;
  const [outletId, id, name] = slug;

  return (
    <JournalistByAnchor
      outletId={outletId}
      id={id}
      name={decodeURIComponent(name)}
    />
  );
}
