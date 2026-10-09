import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/case-studies";
import { siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: siteUrl, lastModified, priority: 1 },
    ...["work", "experience", "about", "resume"].map((p) => ({ url: `${siteUrl}/${p}`, lastModified, priority: 0.8 })),
    ...caseStudies.map((c) => ({ url: `${siteUrl}/work/${c.slug}`, lastModified, priority: 0.7 })),
  ];
}
