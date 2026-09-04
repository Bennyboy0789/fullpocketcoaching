import { notFound } from "next/navigation";
import { BLOG_POSTS, BLOG_LIST } from "@/content";
import { PageContent } from "../../components/Blocks";

export function generateStaticParams() {
  return BLOG_LIST.map((p) => ({ slug: p.slug }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = BLOG_POSTS[slug];
  if (!data) notFound();
  return <PageContent title={data.title} blocks={data.blocks} />;
}
