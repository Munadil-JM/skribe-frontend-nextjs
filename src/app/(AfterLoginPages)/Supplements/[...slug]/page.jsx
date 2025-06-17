import Supplements from "@/components/MediaTypes/OutletCategory/Supplements";

export default async function SupplementsPage({ params }) {
  const { slug } = await params;
  const [outletId, id, name] = slug;

  return (
    <Supplements outletId={outletId} id={id} name={decodeURIComponent(name)} />
  );
}
