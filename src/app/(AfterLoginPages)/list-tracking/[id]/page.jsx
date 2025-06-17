import ListTracking from "@/components/Campaign/ListTracking";

export default async function ListTrackingPage({ params }) {
  const { id } = await params;

  return <ListTracking id={id} />;
}
