import PodcastListing from "@/components/Social/Podcast/PodcastListing";

export default async function PodcastListingPage({ params }) {
  const { id } = await params;

  return <PodcastListing id={id} />;
}
