import { createServer } from "node:http";
import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";

const outputDirectory = path.resolve("out");
const canonicalOrigin = "https://www.nexolvetechnologies.com";
const sitemapUrl = `${canonicalOrigin}/sitemap.xml`;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function elementValue(block, element) {
  return block.match(new RegExp(`<${element}>([^<]+)</${element}>`))?.[1];
}

function attributeContent(html, attribute, value) {
  const tags = html.match(/<(?:meta|link)\b[^>]*>/gi) ?? [];
  const tag = tags.find((candidate) => {
    const match = candidate.match(new RegExp(`${attribute}=["']([^"']+)["']`, "i"));
    return match?.[1]?.toLowerCase() === value.toLowerCase();
  });
  return tag?.match(/(?:content|href)=["']([^"']+)["']/i)?.[1];
}

function htmlFileFor(pathname) {
  return pathname === "/"
    ? path.join(outputDirectory, "index.html")
    : path.join(outputDirectory, `${pathname.slice(1)}.html`);
}

async function fileExists(file) {
  try {
    await access(file, constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

const sitemapXml = await readFile(path.join(outputDirectory, "sitemap.xml"), "utf8");
const robotsTxt = await readFile(path.join(outputDirectory, "robots.txt"), "utf8");

assert(
  robotsTxt.split(/\r?\n/).includes(`Sitemap: ${sitemapUrl}`),
  "robots.txt does not contain the canonical sitemap reference",
);
assert(/User-Agent:\s*\*/i.test(robotsTxt), "robots.txt has no wildcard user-agent rule");
assert(/Allow:\s*\//i.test(robotsTxt), "robots.txt does not allow public crawling");

const blocks = [...sitemapXml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => match[1]);
assert(blocks.length > 0, "sitemap.xml has no URL entries");

const entries = blocks.map((block) => ({
  url: elementValue(block, "loc"),
  lastModified: elementValue(block, "lastmod"),
}));
const urls = entries.map((entry) => entry.url);
assert(new Set(urls).size === urls.length, "sitemap.xml contains duplicate URLs");

const titles = new Map();
const descriptions = new Map();

for (const entry of entries) {
  assert(entry.url, "A sitemap entry has no <loc>");
  assert(entry.lastModified, `${entry.url} has no <lastmod>`);
  assert(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(entry.lastModified),
    `${entry.url} has a non-ISO <lastmod>: ${entry.lastModified}`,
  );
  assert(new Date(entry.lastModified) <= new Date(), `${entry.url} has a future <lastmod>`);

  const url = new URL(entry.url);
  assert(url.origin === canonicalOrigin, `${entry.url} does not use the canonical www origin`);
  assert(!url.search && !url.hash, `${entry.url} contains a query string or fragment`);
  assert(
    url.pathname === "/" || !url.pathname.endsWith("/"),
    `${entry.url} has an unwanted trailing slash`,
  );

  const htmlFile = htmlFileFor(url.pathname);
  assert(await fileExists(htmlFile), `${entry.url} has no exported HTML file`);
  const html = await readFile(htmlFile, "utf8");
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1];
  const description = attributeContent(html, "name", "description");
  const canonical = attributeContent(html, "rel", "canonical");
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;

  assert(title, `${entry.url} has no title`);
  assert(description, `${entry.url} has no meta description`);
  assert(
    canonical === entry.url,
    `${entry.url} has incorrect canonical: ${canonical ?? "missing"}`,
  );
  assert(attributeContent(html, "property", "og:title"), `${entry.url} has no og:title`);
  assert(
    attributeContent(html, "property", "og:description"),
    `${entry.url} has no og:description`,
  );
  assert(attributeContent(html, "property", "og:image"), `${entry.url} has no og:image`);
  assert(
    attributeContent(html, "property", "og:url") === entry.url,
    `${entry.url} has incorrect og:url`,
  );
  assert(h1Count === 1, `${entry.url} has ${h1Count} H1 headings; expected exactly 1`);
  assert(
    !/<meta\b[^>]*content=["'][^"']*noindex/i.test(html),
    `${entry.url} has an accidental noindex`,
  );
  assert(!titles.has(title), `${entry.url} duplicates the title used by ${titles.get(title)}`);
  assert(
    !descriptions.has(description),
    `${entry.url} duplicates the description used by ${descriptions.get(description)}`,
  );
  titles.set(title, entry.url);
  descriptions.set(description, entry.url);
}

const server = createServer(async (request, response) => {
  const pathname = new URL(request.url ?? "/", "http://localhost").pathname;
  const file = htmlFileFor(pathname);
  if (!(await fileExists(file))) {
    response.writeHead(404).end("Not found");
    return;
  }
  response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  response.end(await readFile(file));
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const address = server.address();
assert(address && typeof address === "object", "Could not start the SEO validation server");

try {
  for (const entry of entries) {
    const pathname = new URL(entry.url).pathname;
    const response = await fetch(`http://127.0.0.1:${address.port}${pathname}`);
    assert(response.status === 200, `${entry.url} returned HTTP ${response.status}`);
  }
} finally {
  await new Promise((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve())),
  );
}

console.log(`SEO validation passed for ${entries.length} canonical sitemap URLs.`);
