import { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const BASE_URL = "https://martinkoudela.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();

    return [
        {
            url: BASE_URL,
            lastModified,
            changeFrequency: "monthly",
            priority: 1,
        },
        ...projects.map((project) => ({
            url: `${BASE_URL}/project/${project.slug}`,
            lastModified,
            changeFrequency: "monthly" as const,
            priority: 0.8,
        })),
    ];
}
