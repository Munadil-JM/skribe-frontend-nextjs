import Geo from "@/components/GEO/GeoCity/Geo";

export default async function GeoPage({ params }) {
  const { cityId } = await params;

  return <Geo cityId={cityId} />;
}
