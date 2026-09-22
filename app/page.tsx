import {
  Hero,
  IntroSplit,
  ServicesCards,
  ValuesMission,
  QuoteBand,
} from "./components/Sections";

/**
 * Home page.
 *
 * The hand-built sections below replace the raw WordPress block dump for
 * everything above the fold. The scrape (content.ts) still powers the other
 * ~37 routes via app/[slug] and app/blog — it is no longer rendered here,
 * which previously duplicated every section verbatim below the fold.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <IntroSplit />
      <ServicesCards />
      <QuoteBand />
      <ValuesMission />
    </>
  );
}
