import JournalistByBeat from "@/components/MediaTypes/JournalistByBeat";

export default async function JournalistByBeatPage({ params }) {
  const { id } = await params;

  return <JournalistByBeat selected={decodeURIComponent(id)} />;
}
