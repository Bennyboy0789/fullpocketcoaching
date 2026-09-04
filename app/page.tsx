import { PAGES } from "@/content";
import { PageContent } from "./components/Blocks";

export default function Home() {
  const data = PAGES["home"];
  return <PageContent title={data.title} blocks={data.blocks} />;
}
