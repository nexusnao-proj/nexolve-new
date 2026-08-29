import { spawn } from "node:child_process";
import { createServer } from "node:net";
import path from "node:path";

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

async function availablePort() {
  const server = createServer();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  assert(address && typeof address === "object", "Could not reserve a validation port");
  const port = address.port;
  await new Promise((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve())),
  );
  return port;
}

async function waitForServer(baseUrl, child, output) {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (child.exitCode !== null) {
      throw new Error(`Next.js server exited before validation.\n${output.join("")}`);
    }
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      // The production server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Timed out waiting for the Next.js server.\n${output.join("")}`);
}

const port = await availablePort();
const baseUrl = `http://127.0.0.1:${port}`;
const nextCli = path.resolve("node_modules", "next", "dist", "bin", "next");
const output = [];
const child = spawn(
  process.execPath,
  [nextCli, "start", "--hostname", "127.0.0.1", "--port", String(port)],
  {
    cwd: process.cwd(),
    env: { ...process.env, NODE_ENV: "production" },
    stdio: ["ignore", "pipe", "pipe"],
  },
);
child.stdout.on("data", (chunk) => output.push(chunk.toString()));
child.stderr.on("data", (chunk) => output.push(chunk.toString()));

try {
  await waitForServer(baseUrl, child, output);

  const [sitemapResponse, robotsResponse] = await Promise.all([
    fetch(`${baseUrl}/sitemap.xml`),
    fetch(`${baseUrl}/robots.txt`),
  ]);
  assert(sitemapResponse.status === 200, `sitemap.xml returned HTTP ${sitemapResponse.status}`);
  assert(robotsResponse.status === 200, `robots.txt returned HTTP ${robotsResponse.status}`);

  const sitemapXml = await sitemapResponse.text();
  const robotsTxt = await robotsResponse.text();
  assert(
    robotsTxt.split(/\r?\n/).includes(`Sitemap: ${sitemapUrl}`),
    "robots.txt does not contain the canonical sitemap reference",
  );
  assert(/User-Agent:\s*\*/i.test(robotsTxt), "robots.txt has no wildcard user-agent rule");
  assert(/Allow:\s*\//i.test(robotsTxt), "robots.txt does not allow public crawling");
  assert(/Disallow:\s*\/api\//i.test(robotsTxt), "robots.txt does not block the contact API route");

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
      entry.url === canonicalOrigin || !entry.url.endsWith("/"),
      `${entry.url} has an unwanted trailing slash`,
    );

    const response = await fetch(`${baseUrl}${url.pathname}`);
    assert(response.status === 200, `${entry.url} returned HTTP ${response.status}`);
    const html = await response.text();
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

  console.log(`SEO validation passed for ${entries.length} canonical sitemap URLs.`);
} finally {
  child.kill();
}
