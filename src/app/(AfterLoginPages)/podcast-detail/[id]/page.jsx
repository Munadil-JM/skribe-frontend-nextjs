import PodcastDetail from "@/components/Social/Podcast/PodcastDetail";

export default async function PodcastDetailPage({ params }) {
  const { id } = await params;

  return <PodcastDetail id={id} />;
}
