// Serves the static copy of the WordPress site produced by scripts/mirror/mirror.mjs.
// Pages, sitemaps and feeds come from mirror/; images, CSS and JS are plain files in public/
// (Next.js serves those before this route runs).
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import manifest from "../../mirror/routes.json";

type Route = { status: number; type?: string; file?: string; location?: string };

const routes = manifest.routes as Record<string, Route>;
const PAGES_DIR = join(process.cwd(), "mirror", "pages");
const ORIGIN = "https://fullpocketcoaching.com";

async function page(file: string, status: number, type: string) {
  return new Response(await readFile(join(PAGES_DIR, file)), {
    status,
    headers: { "content-type": type },
  });
}

// Keeps redirects on whatever domain is serving the copy (preview or live).
function redirect(location: string, status: number) {
  const url = new URL(location, ORIGIN);
  const target = url.hostname === "fullpocketcoaching.com" ? url.pathname + url.search : url.href;
  return new Response(null, { status, headers: { location: target } });
}

export async function GET(request: Request) {
  const { pathname } = new URL(request.url);
  const route = routes[pathname];

  if (route?.location) return redirect(route.location, route.status);
  if (route?.file) return page(route.file, route.status, route.type ?? "text/html; charset=UTF-8");

  // WordPress sends page URLs without the trailing slash to the slashed URL with a 301.
  if (!pathname.endsWith("/") && routes[`${pathname}/`]?.file) return redirect(`${pathname}/`, 301);

  return page(manifest.notFound.file, manifest.notFound.status, "text/html; charset=UTF-8");
}

export const HEAD = GET;
