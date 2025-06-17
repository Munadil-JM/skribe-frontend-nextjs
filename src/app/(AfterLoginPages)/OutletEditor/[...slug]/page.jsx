import OutletEditor from "@/components/MediaTypes/OutletCategory/OutletEditor";

export default async function OutletEditorPage({ params }) {
  const { slug } = await params;
  const [outletId, id, name] = slug;

  return (
    <OutletEditor outletId={outletId} id={id} name={decodeURIComponent(name)} />
  );
}
