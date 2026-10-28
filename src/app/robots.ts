import type { MetadataRoute } from "next";
import { indexingEnabled, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!indexingEnabled) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin/", "/search"] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
