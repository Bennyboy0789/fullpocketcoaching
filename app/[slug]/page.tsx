import { notFound } from "next/navigation";
import { PAGES } from "@/content";
import { PageContent } from "../components/Blocks";

export function generateStaticParams() {
  return Object.keys(PAGES)
    .filter((s) => s !== "home")
    .map((slug) => ({ slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = PAGES[slug];
  if (!data) notFound();
  return <PageContent title={data.title} blocks={data.blocks} />;
}
