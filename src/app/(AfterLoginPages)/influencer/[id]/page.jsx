import FullArticle from "@/components/BeatWatch/FullArticle";

export default async function InfluencerPage({ params }) {
  const { id } = await params;

  return <FullArticle id={id} />;
}
