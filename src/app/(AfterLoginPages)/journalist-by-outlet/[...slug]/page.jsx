import JournalistByOutlet from "@/components/MediaTypes/JournalistByOutlet";

export default async function JournalistByOutletPage({ params }) {
  const { slug } = await params;
  const [outletId, id, name] = slug;

  return (
    <JournalistByOutlet
      outletId={outletId}
      id={id}
      name={decodeURIComponent(name)}
    />
  );
}
