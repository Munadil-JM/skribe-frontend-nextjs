import MediaTypeOutlet from "@/components/MediaTypes/MediaTypeOutlet";

export default async function MediaTypeOutletPage({ params }) {
  const { slug } = await params;
  const [outletId, name] = slug;

  return (
    <MediaTypeOutlet outletId={outletId} name={decodeURIComponent(name)} />
  );
}
