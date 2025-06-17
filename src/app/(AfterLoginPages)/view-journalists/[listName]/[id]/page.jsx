import ViewList from "@/components/BeforeLoginPages/ViewListAfterLogin/ViewList";

export default async function ViewListPageAfterLogin({ params }) {
  const { listName, id } = await params;

  return <ViewList listName={listName} id={id} />;
}
