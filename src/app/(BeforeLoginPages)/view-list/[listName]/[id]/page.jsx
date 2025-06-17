import ViewList from "@/components/BeforeLoginPages/ViewList/ViewList";

export default async function ViewListPageBeforeLogin({ params }) {
  const { listName, id } = await params;

  return <ViewList listName={listName} id={id} />;
}
