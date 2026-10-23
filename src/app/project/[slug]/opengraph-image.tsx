import { notFound } from "next/navigation";
import { categorySection, projects, section } from "@/content/site";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "MK-01 application note";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
    return projects.map(({ slug }) => ({ slug }));
}

function titleSize(name: string): number {
    if (name.length <= 12) return 150;
    if (name.length <= 18) return 112;
    return 88;
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);
    if (!project) notFound();

    const s = section(categorySection[project.category]);

    return ogImage({
        kicker: `${project.preliminary ? "Preliminary application note" : "Application note"} · ${s.code} · ${s.title}`,
        title: project.name,
        titleSize: titleSize(project.name),
        subtitle: project.descriptor,
        line: project.summary,
        active: s.id,
    });
}
