import ShowMediaLandscape from "@/components/GEO/Regional/ShowMediaLandscape";

export default async function ShowMediaLandscapePage({ params }) {
  const { cityId } = await params;
  return <ShowMediaLandscape cityId={cityId} />;
}
