import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import ProjectPageClient from "./ProjectPageClient";

type Params = { slug: string };

/** Collapses the multi-line descriptions in the data file into a meta-tag-friendly excerpt. */
function excerpt(text: string, max = 160): string {
    const clean = text.replace(/\s+/g, " ").trim();
    if (clean.length <= max) return clean;
    return clean.slice(0, clean.lastIndexOf(" ", max - 1)).trimEnd() + "…";
}

export function generateStaticParams(): Params[] {
    return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<Params>;
}): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) return { title: "Project not found" };

    const description = excerpt(project.description);
    const url = `/project/${project.slug}`;
    const image = project.image ?? "/og-image.png";

    return {
        title: project.title,
        description,
        alternates: { canonical: url },
        openGraph: {
            title: `${project.title} | Martin Koudela`,
            description,
            url,
            type: "article",
            images: [{ url: image, alt: project.title }],
        },
        twitter: {
            card: "summary_large_image",
            title: `${project.title} | Martin Koudela`,
            description,
            images: [image],
        },
    };
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<Params>;
}) {
    const { slug } = await params;
    const index = projects.findIndex((p) => p.slug === slug);

    if (index === -1) notFound();

    return (
        <ProjectPageClient
            project={projects[index]}
            next={projects[(index + 1) % projects.length]}
            index={index}
            total={projects.length}
        />
    );
}
