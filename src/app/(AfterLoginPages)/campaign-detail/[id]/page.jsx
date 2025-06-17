import CampaignDetail from "@/components/CampaignManager/CampaignDetail/CampaignDetail";

export default async function CampaignDetailPage({ params }) {
  const { id } = await params;

  return <CampaignDetail campId={id} />;
}
