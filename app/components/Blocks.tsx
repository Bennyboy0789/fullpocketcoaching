import type { Block } from "@/content";

const tagClass: Record<string, string> = {
  h1: "text-3xl md:text-4xl font-bold text-navy font-heading leading-tight mb-6",
  h2: "text-2xl md:text-3xl font-bold text-navy font-heading mt-12 mb-4",
  h3: "text-xl md:text-2xl font-semibold text-navy font-heading mt-8 mb-3",
  h4: "text-lg font-semibold text-navy font-heading mt-6 mb-2",
  h5: "text-base font-semibold text-navy mt-4 mb-2",
  h6: "text-sm font-semibold text-navy mt-4 mb-1",
  p: "text-muted leading-relaxed mb-4",
  li: "text-muted leading-relaxed mb-2",
};

export function Block({ tag, text }: { tag: string; text: string }) {
  switch (tag) {
    case "h1":
      return <h1 className={tagClass.h1}>{text}</h1>;
    case "h2":
      return <h2 className={tagClass.h2}>{text}</h2>;
    case "h3":
      return <h3 className={tagClass.h3}>{text}</h3>;
    case "h4":
      return <h4 className={tagClass.h4}>{text}</h4>;
    case "h5":
      return <h5 className={tagClass.h5}>{text}</h5>;
    case "h6":
      return <h6 className={tagClass.h6}>{text}</h6>;
    case "li":
      return (
        <li className="flex gap-3">
          <span className="text-gold font-bold">•</span>
          <span>{text}</span>
        </li>
      );
    default:
      return <p className={tagClass.p}>{text}</p>;
  }
}

export function PageContent({
  title,
  blocks,
  heroImage,
}: {
  title: string;
  blocks: Block[];
  heroImage?: string;
}) {
  // skip a leading h1 that duplicates the hero title
  let start = 0;
  if (blocks[0] && blocks[0].t === "h1") start = 1;

  const body = blocks.slice(start);
  const rendered: React.ReactNode[] = [];
  let i = 0;
  while (i < body.length) {
    if (body[i].t === "li") {
      const lis: Block[] = [];
      while (i < body.length && body[i].t === "li") {
        lis.push(body[i]);
        i++;
      }
      rendered.push(
        <ul key={rendered.length} className="mb-6 space-y-2 pl-1">
          {lis.map((b, j) => (
            <Block key={j} tag={b.t} text={b.x} />
          ))}
        </ul>
      );
    } else {
      rendered.push(
        <Block key={rendered.length} tag={body[i].t} text={body[i].x} />
      );
      i++;
    }
  }

  return (
    <div>
      <section className="bg-navy text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-gold font-heading uppercase tracking-widest text-sm mb-4">
            Full Pocket Coaching
          </p>
          <h1 className="text-3xl md:text-5xl font-bold font-heading leading-tight max-w-3xl">
            {title}
          </h1>
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-6 py-16">{rendered}</div>
    </div>
  );
}
