// Notifies Bing/Yandex (via the IndexNow protocol) about every URL in the
// site's sitemap, so they pick up changes quickly instead of waiting for
// their own crawl schedule. Run manually after a meaningful content update:
//
//   npm run build && npm run indexnow
//
// Google does not participate in IndexNow; indexing there still relies on
// the sitemap + Search Console's "Request indexing".
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const SITE_URL = "https://www.costadelaluzturismo.com";
const KEY = "4254c3aa7a42fe56cba3689d0b7ca839b873a1742542e7c39128c58815012086";
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;
const DIST_DIR = path.join(process.cwd(), "dist");

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
}

function collectSitemapUrls() {
  const files = readdirSync(DIST_DIR).filter((f) => /^sitemap-\d+\.xml$/.test(f));
  const urls = new Set();
  for (const file of files) {
    const xml = readFileSync(path.join(DIST_DIR, file), "utf8");
    for (const loc of extractLocs(xml)) urls.add(loc);
  }
  return [...urls];
}

const urlList = collectSitemapUrls();
if (urlList.length === 0) {
  console.error("No URLs found in dist/sitemap-*.xml — run `npm run build` first.");
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE_URL).host,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  }),
});

console.log(`IndexNow: submitted ${urlList.length} URLs — status ${res.status} ${res.statusText}`);
if (!res.ok) {
  const body = await res.text().catch(() => "");
  console.error(body);
  process.exit(1);
}
