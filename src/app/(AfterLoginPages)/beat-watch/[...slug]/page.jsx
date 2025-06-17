import FullArticle from "@/components/BeatWatch/FullArticle";

export default async function BeatWatchArticlePage({ params }) {
  const { slug } = await params;
  const [id, name] = slug;

  return <FullArticle id={id} name={name} />;
}
