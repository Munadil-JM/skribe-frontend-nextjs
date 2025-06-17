import Columnist from "@/components/MediaTypes/OutletCategory/Columnist";

export default async function ColumnistPage({ params }) {
  const { slug } = await params;
  const [outletId, id, name] = slug;

  return (
    <Columnist outletId={outletId} id={id} name={decodeURIComponent(name)} />
  );
}
