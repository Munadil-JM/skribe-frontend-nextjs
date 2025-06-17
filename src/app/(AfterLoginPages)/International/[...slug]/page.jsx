import International from "@/components/MediaTypes/OutletCategory/International";

export default async function InternationalPage({ params }) {
  const { slug } = await params;
  const [outletId, id, name] = slug;

  return (
    <International
      outletId={outletId}
      id={id}
      name={decodeURIComponent(name)}
    />
  );
}
