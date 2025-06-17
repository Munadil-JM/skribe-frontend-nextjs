import JournalistByShow from "@/components/MediaTypes/OutletCategory/JournalistByShow";

export default async function JournalistByShowsPage({ params }) {
  const { slug } = await params;
  const [outletId, id, name] = slug;

  return (
    <JournalistByShow
      outletId={outletId}
      id={id}
      name={decodeURIComponent(name)}
    />
  );
}
