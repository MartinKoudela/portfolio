import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://martinkoudela.com",
            lastModified: new Date(),
        },
    ];
}
