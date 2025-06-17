import BureauChief from "@/components/MediaTypes/OutletCategory/BureauChief";

export default async function BureauChiefPage({ params }) {
  const { slug } = await params;
  const [outletId, id, name] = slug;

  return (
    <BureauChief outletId={outletId} id={id} name={decodeURIComponent(name)} />
  );
}
