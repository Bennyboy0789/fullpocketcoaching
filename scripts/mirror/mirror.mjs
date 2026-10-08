// Builds an exact static copy of fullpocketcoaching.com for the Next.js app.
//
// 1. Renders every page on the server with render.sh (php-cgi, no HTTP, read-only).
// 2. Follows internal links and sitemap entries until nothing new turns up.
// 3. Copies every referenced file under /wp-content and /wp-includes straight from the
//    server's disk, including files that CSS refers to.
// 4. Writes pages to mirror/ (served by app/[[...path]]/route.ts) and files to public/.
//
// Usage: FPC_SSH_TARGET=user@host FPC_SSH_KEY=~/.ssh/key node scripts/mirror/mirror.mjs
// Needs wordpress/export.json from scripts/wp-export.php. SSH details stay out of this public repo.
import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync, readFileSync, existsSync, rmSync, readdirSync, statSync } from "node:fs";
import { dirname, join, posix } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const ORIGIN = "https://fullpocketcoaching.com";
const { FPC_SSH_TARGET: SSH_TARGET, FPC_SSH_KEY: SSH_KEY } = process.env;
if (!SSH_TARGET || !SSH_KEY) throw new Error("Set FPC_SSH_TARGET (user@host) and FPC_SSH_KEY (path to the private key).");
const SSH_OPTS = ["-i", SSH_KEY, "-o", "IdentitiesOnly=yes", "-o", "BatchMode=yes", "-o", "LogLevel=ERROR"];
const REMOTE_DIR = "mirror-tmp"; // under the account's home directory, removed at the end
const NOT_FOUND_PROBE = "/mirror-not-found-probe/";

// Paths that are WordPress internals or dynamic endpoints, not pages.
const SKIP = [/^\/wp-admin/, /^\/wp-login\.php/, /^\/wp-json/, /^\/xmlrpc\.php/, /^\/wp-cron\.php/, /^\/wp-content\//, /^\/wp-includes\//, /^\/cgi-bin\//];
// Whole folders copied as-is because Elementor loads files from them at runtime by name.
const WHOLE_DIRS = ["wp-content/plugins/elementor/assets/js", "wp-content/plugins/elementor-pro/assets/js", "wp-content/plugins/elementor/assets/lib"];

const ssh = (cmd, input) => {
  const r = spawnSync("ssh", [...SSH_OPTS, "-p", "22", SSH_TARGET, cmd], { input, maxBuffer: 4 * 1024 ** 3 });
  if (r.status !== 0) throw new Error(`ssh failed (${r.status}): ${cmd}\n${r.stderr}`);
  return r.stdout;
};
const scp = (local, remote) => {
  const r = spawnSync("scp", [...SSH_OPTS, "-P", "22", local, `${SSH_TARGET}:${remote}`]);
  if (r.status !== 0) throw new Error(`scp failed: ${local}\n${r.stderr}`);
};
// Extracts a .tar.gz buffer into a directory using the system tar.
const untar = (buf, dir) => {
  mkdirSync(dir, { recursive: true });
  // Relative name on purpose: GNU tar on Windows reads "C:..." as a remote host.
  const name = `.fpc-mirror-${process.pid}.tgz`;
  writeFileSync(join(dir, name), buf);
  const r = spawnSync("tar", ["xzf", name], { cwd: dir });
  rmSync(join(dir, name), { force: true });
  if (r.status !== 0) throw new Error(`tar failed: ${r.stderr}`);
};

// ---------- 1. Render pages ----------
const exportJson = JSON.parse(readFileSync(join(REPO, "wordpress", "export.json"), "utf8"));
const toPath = (u) => {
  const url = new URL(u, ORIGIN);
  return url.pathname;
};
// main-sitemap.xsl is Rank Math's stylesheet for the sitemaps (referenced from the XML, not linked).
const queue = new Set(["/", "/feed/", "/sitemap_index.xml", "/main-sitemap.xsl", NOT_FOUND_PROBE]);
for (const p of [...exportJson.pages, ...exportJson.posts]) queue.add(toPath(p.url));

const rendered = new Map(); // path -> { status, headers, body(Buffer) }
const renderBatch = (paths) => {
  const out = `${REMOTE_DIR}/out`;
  const buf = ssh(`rm -rf ~/${out} && bash ~/${REMOTE_DIR}/render.sh ~/${out} && tar czf - -C ~/${out} .`, paths.join("\n") + "\n");
  const dir = join(tmpdir(), `fpc-render-${process.pid}`);
  rmSync(dir, { recursive: true, force: true });
  untar(buf, dir);
  const stderr = existsSync(join(dir, "stderr.log")) ? readFileSync(join(dir, "stderr.log"), "utf8").trim() : "";
  if (stderr) console.warn("render stderr:\n" + stderr.slice(0, 2000));
  for (const line of readFileSync(join(dir, "index.tsv"), "utf8").trim().split("\n")) {
    const [n, path] = line.split("\t");
    const raw = readFileSync(join(dir, `${n}.raw`));
    const sep = raw.indexOf("\r\n\r\n");
    const head = raw.subarray(0, sep).toString("latin1");
    const body = raw.subarray(sep + 4);
    const headers = {};
    for (const h of head.split("\r\n")) {
      const i = h.indexOf(":");
      if (i > 0) headers[h.slice(0, i).trim().toLowerCase()] = h.slice(i + 1).trim();
    }
    const status = headers.status ? parseInt(headers.status, 10) : 200;
    rendered.set(path, { status, headers, body });
  }
  rmSync(dir, { recursive: true, force: true });
};

const linkPaths = (text) => {
  const found = [];
  for (const m of text.matchAll(/<a\b[^>]*?\bhref=(["'])(.*?)\1/gi)) found.push(m[2]);
  for (const m of text.matchAll(/<loc>\s*(.*?)\s*<\/loc>/gi)) found.push(m[1]);
  const paths = [];
  for (let href of found) {
    href = href.replace(/&amp;/g, "&").trim();
    if (!href || href.startsWith("#") || /^(mailto|tel|javascript):/i.test(href)) continue;
    let url;
    try { url = new URL(href, ORIGIN); } catch { continue; }
    if (url.hostname !== "fullpocketcoaching.com" && url.hostname !== "www.fullpocketcoaching.com") continue;
    const p = decodeURI(url.pathname);
    if (SKIP.some((re) => re.test(p))) continue;
    if (/\.[a-z0-9]{2,4}$/i.test(p) && !p.endsWith(".xml")) continue; // files, not pages
    paths.push(url.pathname);
  }
  return paths;
};

ssh(`mkdir -p ~/${REMOTE_DIR}`);
scp(join(REPO, "scripts", "mirror", "render.sh"), `${REMOTE_DIR}/render.sh`);
scp(join(REPO, "scripts", "mirror", "render-prepend.php"), `${REMOTE_DIR}/render-prepend.php`);
while (true) {
  const todo = [...queue].filter((p) => !rendered.has(p));
  if (!todo.length) break;
  console.log(`rendering ${todo.length} path(s)…`);
  renderBatch(todo);
  for (const p of todo) {
    const r = rendered.get(p);
    // The sitemap stylesheet (XSL) contains placeholder links like {$itemURL}; don't follow them.
    const crawlable = r.status === 200 && !p.endsWith(".xsl");
    if (crawlable) for (const l of linkPaths(r.body.toString("utf8"))) queue.add(l);
    if (r.status >= 300 && r.status < 400 && r.headers.location) {
      const loc = new URL(r.headers.location, ORIGIN);
      if (loc.hostname === "fullpocketcoaching.com") queue.add(loc.pathname);
    }
  }
}

// ---------- 2. Collect files ----------
const assetSet = new Set();
const addAsset = (p) => {
  p = p.split(/[?#]/)[0];
  try { p = decodeURIComponent(p); } catch {}
  p = posix.normalize(p).replace(/^\/+/, "");
  // Files only: a bare folder name (e.g. in a script config) would copy the whole folder.
  if (/^(wp-content|wp-includes)\/.+\.[a-z0-9]{2,5}$/i.test(p) && !p.includes("*")) assetSet.add(p);
};
const scanText = (text) => {
  // Decode slashes escaped in JSON and quotes escaped inside HTML attributes (data-settings).
  const t = text
    .replace(/\\\//g, "/")
    .replace(/&quot;|&#0?34;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&amp;/g, "&");
  for (const m of t.matchAll(/(?:https?:)?\/\/(?:www\.)?fullpocketcoaching\.com(\/(?:wp-content|wp-includes)\/[^"'\s()<>,\\&]+)/g)) addAsset(m[1]);
  for (const m of t.matchAll(/["'(\s,=](\/(?:wp-content|wp-includes)\/[^"'\s()<>,\\&]+)/g)) addAsset(m[1]);
};
for (const r of rendered.values()) scanText(r.body.toString("utf8"));

const fetched = new Set();
const fetchAssets = (paths) => {
  if (!paths.length) return;
  const buf = ssh(`cd ~/public_html && tar czf - --ignore-failed-read -T - 2>/dev/null; true`, paths.join("\n") + "\n");
  untar(buf, join(REPO, "public"));
  paths.forEach((p) => fetched.add(p));
};
console.log("copying whole Elementor asset folders…");
fetchAssets(WHOLE_DIRS);
while (true) {
  const todo = [...assetSet].filter((p) => !fetched.has(p));
  if (!todo.length) break;
  console.log(`copying ${todo.length} file(s)…`);
  fetchAssets(todo);
  // CSS can point at fonts and images; resolve those relative to the stylesheet.
  for (const p of todo.filter((x) => x.endsWith(".css"))) {
    const file = join(REPO, "public", p);
    if (!existsSync(file)) continue;
    const css = readFileSync(file, "utf8");
    scanText(css);
    for (const m of css.matchAll(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g)) {
      const ref = m[2].trim();
      if (/^(data:|https?:|\/\/|#)/.test(ref)) continue;
      addAsset(ref.startsWith("/") ? ref : posix.join(posix.dirname("/" + p), ref));
    }
  }
}
const missing = [...assetSet].filter((p) => !existsSync(join(REPO, "public", p)));

// Elementor's generated CSS points at images with absolute URLs. Make them root-relative,
// like the pages, so a preview domain loads them from the copy instead of the live site.
const cssFiles = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? cssFiles(join(dir, e.name)) : e.name.endsWith(".css") ? [join(dir, e.name)] : [],
  );
let cssRewritten = 0;
for (const file of cssFiles(join(REPO, "public", "wp-content"))) {
  const css = readFileSync(file, "utf8");
  const out = css.replace(/https?:\/\/(?:www\.)?fullpocketcoaching\.com(?=\/)/g, "");
  if (out !== css) {
    writeFileSync(file, out);
    cssRewritten++;
  }
}

// ---------- 3. Write pages ----------
// Root-relative URLs keep the copy self-contained on any preview domain. Canonical URLs,
// social tags, structured data, feeds and sitemaps keep the absolute domain, as on the live site.
const PROTECT = [
  /<link\b[^>]*\brel=["'](?:canonical|shortlink|alternate|https:\/\/api\.w\.org\/|EditURI)["'][^>]*>/gi,
  /<meta\b[^>]*\b(?:property|name)=["'](?:og:[^"']*|twitter:[^"']*)["'][^>]*>/gi,
  /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi,
];
const relativize = (html) => {
  const kept = [];
  for (const re of PROTECT) html = html.replace(re, (m) => `\u0000${kept.push(m) - 1}\u0000`);
  // A bare domain (href="https://fullpocketcoaching.com") becomes "/" so it still goes home.
  const rewrite = (s) =>
    s
      .replace(/https?:\/\/(?:www\.)?fullpocketcoaching\.com(?=\/)/g, "")
      .replace(/https?:\/\/(?:www\.)?fullpocketcoaching\.com(?=["'])/g, "/")
      .replace(/https?:\\\/\\\/(?:www\.)?fullpocketcoaching\.com(?=\\\/)/g, "")
      .replace(/https?:\\\/\\\/(?:www\.)?fullpocketcoaching\.com(?=["'])/g, "\\/");
  // Only inside tags, scripts and styles: URLs shown as page text must stay exactly as written.
  html = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>|<[^>]+>/gi, rewrite);
  return html.replace(/\u0000(\d+)\u0000/g, (_, i) => kept[+i]);
};

const outDir = join(REPO, "mirror");
rmSync(outDir, { recursive: true, force: true });
mkdirSync(join(outDir, "pages"), { recursive: true });
const routes = {};
let i = 0;
for (const [path, r] of [...rendered].sort()) {
  if (path === NOT_FOUND_PROBE) continue;
  if (r.status >= 300 && r.status < 400) {
    routes[path] = { status: r.status, location: r.headers.location };
    continue;
  }
  const type = r.headers["content-type"] || "text/html; charset=UTF-8";
  let body = r.body.toString("utf8");
  if (type.includes("text/html")) body = relativize(body);
  const file = `${String(++i).padStart(3, "0")}.${type.includes("xml") ? "xml" : type.includes("text/html") ? "html" : "txt"}`;
  writeFileSync(join(outDir, "pages", file), body);
  routes[path] = { status: r.status, type, file };
}
const nf = rendered.get(NOT_FOUND_PROBE);
writeFileSync(join(outDir, "pages", "404.html"), relativize(nf.body.toString("utf8")));
writeFileSync(join(outDir, "routes.json"), JSON.stringify({ generated: new Date().toISOString(), notFound: { status: nf.status, file: "404.html" }, routes }, null, 2));

// robots.txt and favicon.ico are real files in the WordPress root.
fetchAssets(["robots.txt", "favicon.ico"]);
ssh(`rm -rf ~/${REMOTE_DIR}`);

const sizeOf = (d) => readdirSync(d, { withFileTypes: true }).reduce((s, e) => s + (e.isDirectory() ? sizeOf(join(d, e.name)) : statSync(join(d, e.name)).size), 0);
const pages = Object.values(routes).filter((r) => !r.location);
console.log(`\npages: ${pages.length} (${pages.filter((r) => r.status === 200).length} ok, other: ${pages.filter((r) => r.status !== 200).map((r) => r.status).join(",") || "none"})`);
console.log(`redirects: ${Object.values(routes).length - pages.length} | 404 page status: ${nf.status}`);
console.log(`CSS files with live-domain URLs made root-relative: ${cssRewritten}`);
console.log(`files copied: ${fetched.size} referenced + whole folders | missing on server: ${missing.length}${missing.length ? "\n  " + missing.slice(0, 20).join("\n  ") : ""}`);
console.log(`public/wp-content: ${(sizeOf(join(REPO, "public", "wp-content")) / 1e6).toFixed(1)} MB, public/wp-includes: ${(sizeOf(join(REPO, "public", "wp-includes")) / 1e6).toFixed(1)} MB`);
