import Link from "next/link";
import { BLOG_LIST } from "@/content";

export default function BlogIndex() {
  return (
    <div>
      <section className="bg-navy text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-gold font-heading uppercase tracking-widest text-sm mb-4">
            Full Pocket Coaching
          </p>
          <h1 className="text-3xl md:text-5xl font-bold font-heading leading-tight">
            Blog
          </h1>
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-6">
          {BLOG_LIST.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="block border border-gray-200 rounded-xl p-6 hover:border-gold hover:shadow-md transition-all"
            >
              {p.date && (
                <p className="text-xs text-muted uppercase tracking-wider mb-2">
                  {p.date}
                </p>
              )}
              <h2 className="text-xl font-semibold text-navy font-heading hover:text-gold-dark transition-colors">
                {p.title}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
