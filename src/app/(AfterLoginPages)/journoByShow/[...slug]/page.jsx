import ByShowJournalists from "@/components/MediaTypes/OutletCategory/ByShowJournalists";

export default async function JournoByShowPage({ params }) {
  const { slug } = await params;
  const [showId, outletName, showName, outletId] = slug;

  return (
    <ByShowJournalists
      showId={showId}
      outletName={decodeURIComponent(outletName)}
      showName={decodeURIComponent(showName)}
      outletId={outletId}
    />
  );
}
