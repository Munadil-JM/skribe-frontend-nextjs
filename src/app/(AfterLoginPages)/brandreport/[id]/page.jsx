import FullArticle from "@/components/BeatWatch/FullArticle";

export default async function BrandReportPage({ params }) {
  const { id } = await params;

  return <FullArticle id={id} />;
}
