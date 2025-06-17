import CreateCampaign from "@/components/CampaignManager/CreateCampaign/CreateCampaign";

export default async function CreateCampaignWithParamsPage({ params }) {
  const { slug } = await params;
  const [campaignId, mailerType, update, listId] = slug;

  return (
    <CreateCampaign
      campaignId={campaignId}
      mailerType={mailerType}
      update={update}
      listId={listId}
    />
  );
}
