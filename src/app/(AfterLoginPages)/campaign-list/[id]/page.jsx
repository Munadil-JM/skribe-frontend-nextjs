import CampaignList from "@/components/Campaign/CampaignList";

export default async function CampaignListPage({ params }) {
  const { id } = await params;

  return <CampaignList id={id} />;
}
