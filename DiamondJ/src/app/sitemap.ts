import { site } from "@/lib/site";

export default function sitemap() {
  const pages = ["", "/menu", "/catering", "/gallery", "/order", "/contact"];
  return pages.map((p) => ({
    url: `${site.url}${p}`,
    lastModified: new Date(),
  }));
}
