import SmartProfile from "@/components/SmartProfile/SmartProfile";

export default async function SmartProfilePage({ params }) {
  const { journalistId } = await params;
  return <SmartProfile id={journalistId} />;
}
